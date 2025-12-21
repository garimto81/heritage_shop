import { createAdminClient } from "@/lib/supabase/admin";

export interface OrderItem {
  product_id: string;
  size: string;
  quantity: number;
}

export interface ShippingAddress {
  recipient_name: string;
  phone: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface CreateOrderInput {
  vip_id: string;
  items: OrderItem[];
  shipping_address: ShippingAddress;
  notes?: string;
}

export interface Order {
  id: string;
  status: string;
  created_at: string;
  items: OrderItem[];
  shipping_address: ShippingAddress;
}

export interface InventoryCheckResult {
  valid: boolean;
  message?: string;
  details?: {
    product_id: string;
    size: string;
    requested: number;
    available: number;
  }[];
}

/**
 * 재고 가용성 검증
 * 주문 전 각 아이템의 재고 확인
 */
export async function validateInventory(
  items: OrderItem[]
): Promise<InventoryCheckResult> {
  const supabase = createAdminClient();

  const insufficientItems: InventoryCheckResult["details"] = [];

  for (const item of items) {
    const { data, error } = await supabase
      .from("inventory")
      .select("quantity")
      .eq("product_id", item.product_id)
      .eq("size", item.size)
      .single();

    if (error || !data) {
      insufficientItems.push({
        product_id: item.product_id,
        size: item.size,
        requested: item.quantity,
        available: 0,
      });
      continue;
    }

    if (data.quantity < item.quantity) {
      insufficientItems.push({
        product_id: item.product_id,
        size: item.size,
        requested: item.quantity,
        available: data.quantity,
      });
    }
  }

  if (insufficientItems.length > 0) {
    const firstItem = insufficientItems[0];
    return {
      valid: false,
      message: `재고 부족: ${firstItem.size} 사이즈 (요청: ${firstItem.requested}, 가용: ${firstItem.available})`,
      details: insufficientItems,
    };
  }

  return { valid: true };
}

/**
 * 주문 생성 (재고 차감 포함)
 * PostgreSQL 저장 프로시저를 사용하여 원자적 트랜잭션 처리
 */
export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const supabase = createAdminClient();

  // 1. 재고 검증 (사전 체크)
  const inventoryCheck = await validateInventory(input.items);
  if (!inventoryCheck.valid) {
    throw new Error(inventoryCheck.message || "재고가 부족합니다.");
  }

  // 2. PostgreSQL 함수로 원자적 주문 생성 + 재고 차감
  const { data: orderId, error: rpcError } = await supabase.rpc(
    "create_order_with_inventory",
    {
      p_vip_id: input.vip_id,
      p_shipping_address: input.shipping_address,
      p_notes: input.notes || null,
      p_items: input.items,
    }
  );

  if (rpcError) {
    console.error("Error creating order with inventory:", rpcError);

    // PostgreSQL 에러 메시지 파싱
    if (rpcError.message.includes("Insufficient inventory")) {
      throw new Error("재고가 부족합니다. 잠시 후 다시 시도해주세요.");
    }
    if (rpcError.message.includes("Inventory not found")) {
      throw new Error("상품 재고 정보를 찾을 수 없습니다.");
    }

    throw new Error("주문 생성에 실패했습니다: " + rpcError.message);
  }

  // 3. 생성된 주문 조회
  const { data: order, error: fetchError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (fetchError || !order) {
    throw new Error("주문이 생성되었으나 조회에 실패했습니다.");
  }

  return {
    ...order,
    items: input.items,
  };
}

/**
 * 주문 취소 (재고 복원)
 */
export async function cancelOrder(orderId: string): Promise<void> {
  const supabase = createAdminClient();

  // 1. 재고 복원
  const { error: restoreError } = await supabase.rpc(
    "restore_inventory_for_order",
    { p_order_id: orderId }
  );

  if (restoreError) {
    console.error("Error restoring inventory:", restoreError);
    throw new Error("재고 복원에 실패했습니다.");
  }

  // 2. 주문 상태 업데이트
  const { error: updateError } = await supabase
    .from("orders")
    .update({ status: "cancelled" })
    .eq("id", orderId);

  if (updateError) {
    throw new Error("주문 취소에 실패했습니다.");
  }
}

export async function getOrders(): Promise<Order[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }

  return data;
}
