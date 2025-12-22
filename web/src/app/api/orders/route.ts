import { NextResponse } from "next/server";
import { getVipSession } from "@/lib/auth/vip-session";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const session = await getVipSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createAdminClient();

    // VIP의 주문 목록 조회
    const { data: orders, error } = await supabase
      .from("orders")
      .select(`
        id,
        order_number,
        status,
        shipping_address,
        notes,
        created_at,
        updated_at,
        order_items (
          id,
          product_id,
          size,
          quantity,
          products (
            id,
            name,
            images
          )
        )
      `)
      .eq("vip_id", session.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
      return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }

    // 데이터 변환
    const transformedOrders = orders?.map((order) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const orderItems = order.order_items as any[];
      return {
        ...order,
        items: orderItems?.map((item) => {
          const product = Array.isArray(item.products) ? item.products[0] : item.products;
          return {
            id: item.id,
            product_id: item.product_id,
            product_name: product?.name || "Unknown Product",
            size: item.size,
            quantity: item.quantity,
            image: product?.images?.[0] || null,
          };
        }) || [],
        order_items: undefined,
      };
    });

    return NextResponse.json(transformedOrders);
  } catch (error) {
    console.error("Error in orders API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
