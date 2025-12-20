-- GGP Heritage Mall - Inventory Management Functions
-- Version: 1.0.0
-- Description: 재고 차감 및 복원 함수 (동시성 제어 포함)

-- =====================================================
-- 재고 차감 함수
-- 주문 생성 시 호출되어 재고를 차감
-- 동시성 제어: SELECT ... FOR UPDATE
-- =====================================================
CREATE OR REPLACE FUNCTION decrease_inventory_for_order(
  p_items JSONB  -- [{product_id, size, quantity}]
)
RETURNS BOOLEAN AS $$
DECLARE
  item JSONB;
  current_qty INTEGER;
  v_product_id UUID;
  v_size TEXT;
  v_quantity INTEGER;
BEGIN
  -- 각 아이템에 대해 재고 차감 처리
  FOR item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    v_product_id := (item->>'product_id')::UUID;
    v_size := item->>'size';
    v_quantity := (item->>'quantity')::INTEGER;

    -- 행 잠금으로 동시성 제어 (다른 트랜잭션이 대기)
    SELECT quantity INTO current_qty
    FROM inventory
    WHERE product_id = v_product_id
      AND size = v_size
    FOR UPDATE;

    -- 재고 부족 체크
    IF current_qty IS NULL THEN
      RAISE EXCEPTION 'Inventory not found for product % size %', v_product_id, v_size;
    END IF;

    IF current_qty < v_quantity THEN
      RAISE EXCEPTION 'Insufficient inventory for product % size %. Available: %, Requested: %',
        v_product_id, v_size, current_qty, v_quantity;
    END IF;

    -- 재고 차감
    UPDATE inventory
    SET quantity = quantity - v_quantity,
        updated_at = NOW()
    WHERE product_id = v_product_id
      AND size = v_size;
  END LOOP;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 재고 복원 함수
-- 주문 취소 시 호출되어 재고를 복원
-- =====================================================
CREATE OR REPLACE FUNCTION restore_inventory_for_order(p_order_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  -- 주문 아이템 기반으로 재고 복원
  UPDATE inventory i
  SET quantity = i.quantity + oi.quantity,
      updated_at = NOW()
  FROM order_items oi
  WHERE oi.order_id = p_order_id
    AND i.product_id = oi.product_id
    AND i.size = oi.size;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 재고 확인 함수 (선택적)
-- 주문 전 재고 가용성 확인
-- =====================================================
CREATE OR REPLACE FUNCTION check_inventory_availability(
  p_items JSONB  -- [{product_id, size, quantity}]
)
RETURNS TABLE (
  product_id UUID,
  size TEXT,
  requested INTEGER,
  available INTEGER,
  is_available BOOLEAN
) AS $$
DECLARE
  item JSONB;
BEGIN
  FOR item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    RETURN QUERY
    SELECT
      (item->>'product_id')::UUID AS product_id,
      item->>'size' AS size,
      (item->>'quantity')::INTEGER AS requested,
      COALESCE(inv.quantity, 0) AS available,
      COALESCE(inv.quantity, 0) >= (item->>'quantity')::INTEGER AS is_available
    FROM (SELECT 1) AS dummy
    LEFT JOIN inventory inv
      ON inv.product_id = (item->>'product_id')::UUID
      AND inv.size = item->>'size';
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 주문 생성 + 재고 차감 통합 함수
-- 원자적 트랜잭션으로 주문과 재고 차감을 동시 처리
-- =====================================================
CREATE OR REPLACE FUNCTION create_order_with_inventory(
  p_vip_id UUID,
  p_shipping_address JSONB,
  p_notes TEXT,
  p_items JSONB  -- [{product_id, size, quantity}]
)
RETURNS UUID AS $$
DECLARE
  v_order_id UUID;
  item JSONB;
BEGIN
  -- 1. 재고 차감 (실패 시 전체 롤백)
  PERFORM decrease_inventory_for_order(p_items);

  -- 2. 주문 생성
  INSERT INTO orders (vip_id, status, shipping_address, notes)
  VALUES (p_vip_id, 'processing', p_shipping_address, p_notes)
  RETURNING id INTO v_order_id;

  -- 3. 주문 아이템 생성
  FOR item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    INSERT INTO order_items (order_id, product_id, size, quantity)
    VALUES (
      v_order_id,
      (item->>'product_id')::UUID,
      item->>'size',
      (item->>'quantity')::INTEGER
    );
  END LOOP;

  RETURN v_order_id;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 권한 부여 (RLS 정책 적용 시)
-- =====================================================
-- Admin만 호출 가능하도록 설정
GRANT EXECUTE ON FUNCTION decrease_inventory_for_order(JSONB) TO service_role;
GRANT EXECUTE ON FUNCTION restore_inventory_for_order(UUID) TO service_role;
GRANT EXECUTE ON FUNCTION check_inventory_availability(JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION create_order_with_inventory(UUID, JSONB, TEXT, JSONB) TO authenticated;
