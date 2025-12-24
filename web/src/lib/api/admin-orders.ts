import { createAdminClient } from "@/lib/supabase/admin";
import type {
  AdminOrder,
  AdminOrderDetail,
  OrderListResponse,
  OrderFilters,
  OrderStatus,
} from "@/types/admin";

/**
 * 주문 목록 조회
 */
export async function getOrderList(
  filters: OrderFilters
): Promise<OrderListResponse> {
  const supabase = createAdminClient();
  const { page = 1, limit = 20, status, vip_id } = filters;

  let query = supabase
    .from("orders")
    .select(
      `
      id,
      vip_id,
      status,
      created_at,
      vips!inner (
        name,
        email,
        tier
      ),
      order_items (
        id
      )
    `,
      { count: "exact" }
    );

  if (status) query = query.eq("status", status);
  if (vip_id) query = query.eq("vip_id", vip_id);

  const { data, count, error } = await query
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) throw new Error(error.message);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const orders: AdminOrder[] = (data ?? []).map((order: any) => ({
    id: order.id,
    vip_id: order.vip_id,
    vip: {
      name: order.vips.name,
      email: order.vips.email,
      tier: order.vips.tier,
    },
    status: order.status,
    total_items: order.order_items?.length || 0,
    created_at: order.created_at,
  }));

  return { orders, total: count ?? 0, page, limit };
}

/**
 * 주문 상세 조회
 */
export async function getOrderById(
  id: string
): Promise<AdminOrderDetail | null> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      vips!inner (
        name,
        email,
        tier
      ),
      order_items (
        product_id,
        size,
        quantity,
        products (
          name,
          images
        )
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(error.message);
  }

  return {
    id: data.id,
    vip_id: data.vip_id,
    vip: {
      name: data.vips.name,
      email: data.vips.email,
      tier: data.vips.tier,
    },
    status: data.status,
    total_items: data.order_items?.length || 0,
    created_at: data.created_at,
    shipping_address: data.shipping_address,
    tracking_number: data.tracking_number,
    carrier: data.carrier,
    notes: data.notes,
    updated_at: data.updated_at,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: (data.order_items ?? []).map((item: any) => {
      // products가 배열로 반환될 수 있음
      const product = Array.isArray(item.products) ? item.products[0] : item.products;
      return {
        product_id: item.product_id,
        product_name: product?.name || "Unknown Product",
        size: item.size,
        quantity: item.quantity,
        image: product?.images?.[0] || null,
      };
    }),
  };
}

/**
 * 주문 상태 업데이트
 */
export async function updateOrderStatus(
  id: string,
  status: OrderStatus,
  tracking?: { tracking_number: string; carrier: string }
): Promise<
  | { success: true }
  | { success: false; error: "not_found" | "database_error" }
> {
  const supabase = createAdminClient();

  const updateData: Record<string, unknown> = {
    status,
    updated_at: new Date().toISOString(),
  };

  if (tracking) {
    updateData.tracking_number = tracking.tracking_number;
    updateData.carrier = tracking.carrier;
  }

  const { error } = await supabase.from("orders").update(updateData).eq("id", id);

  if (error) {
    if (error.code === "PGRST116")
      return { success: false, error: "not_found" };
    return { success: false, error: "database_error" };
  }

  return { success: true };
}
