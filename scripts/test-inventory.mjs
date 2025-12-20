/**
 * 재고 차감 테스트 스크립트
 * 실행: node scripts/test-inventory.mjs
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "http://127.0.0.1:54321";
const supabaseKey = "sb_secret_N7UND0UgjKTVK-Uodkm0Hg_xSvEMPvz";

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log("=".repeat(60));
  console.log("재고 차감 테스트");
  console.log("=".repeat(60));

  // 1. 현재 재고 확인
  console.log("\n📦 [1] 현재 재고 상태:");
  const { data: inventory, error: invError } = await supabase
    .from("inventory")
    .select(`
      quantity,
      size,
      products(id, name)
    `)
    .limit(5);

  if (invError) {
    console.error("재고 조회 실패:", invError.message);
    return;
  }

  if (!inventory || inventory.length === 0) {
    console.log("⚠️  재고 데이터가 없습니다. 시드 데이터를 추가하세요.");
    console.log("\n테스트용 재고 데이터 추가 중...");

    // 상품 조회
    const { data: products } = await supabase
      .from("products")
      .select("id, name")
      .limit(1);

    if (!products || products.length === 0) {
      console.log("❌ 상품이 없습니다. 먼저 상품을 추가하세요.");
      return;
    }

    // 테스트용 재고 추가
    const testProduct = products[0];
    const { error: insertError } = await supabase
      .from("inventory")
      .upsert([
        { product_id: testProduct.id, size: "S", quantity: 10 },
        { product_id: testProduct.id, size: "M", quantity: 15 },
        { product_id: testProduct.id, size: "L", quantity: 8 },
      ], { onConflict: "product_id,size" });

    if (insertError) {
      console.error("재고 추가 실패:", insertError.message);
      return;
    }

    console.log(`✅ 테스트 재고 추가 완료: ${testProduct.name}`);

    // 다시 조회
    const { data: newInventory } = await supabase
      .from("inventory")
      .select(`quantity, size, products(id, name)`)
      .eq("product_id", testProduct.id);

    console.table(newInventory?.map(i => ({
      상품: i.products?.name,
      사이즈: i.size,
      재고: i.quantity
    })));
  } else {
    console.table(inventory.map(i => ({
      상품: i.products?.name,
      사이즈: i.size,
      재고: i.quantity
    })));
  }

  // 2. VIP 확인
  console.log("\n👤 [2] 테스트 VIP 확인:");
  let { data: vips } = await supabase
    .from("vips")
    .select("id, email, name, tier")
    .limit(1);

  if (!vips || vips.length === 0) {
    console.log("⚠️  VIP가 없습니다. 테스트 VIP 생성 중...");

    const { data: newVip, error: vipError } = await supabase
      .from("vips")
      .insert({
        email: "test@example.com",
        name: "Test VIP",
        tier: "gold"
      })
      .select()
      .single();

    if (vipError) {
      console.error("VIP 생성 실패:", vipError.message);
      return;
    }
    vips = [newVip];
  }

  const testVip = vips[0];
  console.log(`VIP: ${testVip.name} (${testVip.email}) - ${testVip.tier}`);

  // 3. 재고 조회 (테스트용)
  const { data: testInventory } = await supabase
    .from("inventory")
    .select(`product_id, size, quantity`)
    .gt("quantity", 0)
    .limit(1);

  if (!testInventory || testInventory.length === 0) {
    console.log("❌ 사용 가능한 재고가 없습니다.");
    return;
  }

  const testItem = testInventory[0];
  const originalQty = testItem.quantity;

  console.log(`\n🎯 테스트 대상: product_id=${testItem.product_id}, size=${testItem.size}, 현재수량=${originalQty}`);

  // 4. 주문 생성 + 재고 차감 테스트
  console.log("\n🛒 [3] 주문 생성 + 재고 차감 테스트:");

  const orderItems = [
    {
      product_id: testItem.product_id,
      size: testItem.size,
      quantity: 1
    }
  ];

  console.log("주문 아이템:", JSON.stringify(orderItems));

  const { data: orderId, error: orderError } = await supabase.rpc(
    "create_order_with_inventory",
    {
      p_vip_id: testVip.id,
      p_shipping_address: {
        recipient_name: "Test User",
        phone: "010-1234-5678",
        address_line1: "서울시 강남구 테스트로 123",
        address_line2: "테스트빌딩 101호",
        city: "서울",
        state: "서울특별시",
        postal_code: "06000",
        country: "KR"
      },
      p_notes: "재고 차감 테스트 주문",
      p_items: orderItems
    }
  );

  if (orderError) {
    console.error("❌ 주문 생성 실패:", orderError.message);
    return;
  }

  console.log(`✅ 주문 생성 성공! Order ID: ${orderId}`);

  // 5. 재고 차감 확인
  console.log("\n📊 [4] 재고 차감 확인:");

  const { data: updatedInventory } = await supabase
    .from("inventory")
    .select("quantity")
    .eq("product_id", testItem.product_id)
    .eq("size", testItem.size)
    .single();

  const newQty = updatedInventory?.quantity || 0;

  console.log(`변경 전: ${originalQty}`);
  console.log(`변경 후: ${newQty}`);
  console.log(`차감량: ${originalQty - newQty}`);

  if (originalQty - newQty === 1) {
    console.log("\n✅✅✅ 재고 차감 테스트 성공! ✅✅✅");
  } else {
    console.log("\n❌ 재고 차감이 예상대로 되지 않았습니다.");
  }

  // 6. 생성된 주문 확인
  console.log("\n📋 [5] 생성된 주문 확인:");
  const { data: order } = await supabase
    .from("orders")
    .select(`
      id,
      status,
      created_at,
      order_items(product_id, size, quantity)
    `)
    .eq("id", orderId)
    .single();

  console.log("주문 상태:", order?.status);
  console.log("주문 아이템:", order?.order_items);

  console.log("\n" + "=".repeat(60));
  console.log("테스트 완료");
  console.log("=".repeat(60));
}

main().catch(console.error);
