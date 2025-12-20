import { createAdminClient } from "@/lib/supabase/admin";
import type { DashboardStats } from "@/types/admin";

/**
 * 대시보드 통계 조회
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = createAdminClient();

  // 병렬 쿼리 실행
  const [vipsResult, ordersResult, recentOrdersResult] = await Promise.all([
    // 전체 VIP 조회 (tier, is_active만)
    supabase.from("vips").select("tier, is_active"),
    // 전체 주문 수
    supabase.from("orders").select("id", { count: "exact", head: true }),
    // 최근 30일 주문
    supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .gte(
        "created_at",
        new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      ),
  ]);

  const vips = vipsResult.data ?? [];

  return {
    totalVips: vips.length,
    activeVips: vips.filter((v) => v.is_active).length,
    tierDistribution: {
      silver: vips.filter((v) => v.tier === "silver").length,
      gold: vips.filter((v) => v.tier === "gold").length,
    },
    totalOrders: ordersResult.count ?? 0,
    recentOrders: recentOrdersResult.count ?? 0,
  };
}

/**
 * 최근 주문 목록 조회
 */
export async function getRecentOrders(limit: number = 5) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      status,
      created_at,
      vips!inner (
        name,
        email
      )
    `
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return (data ?? []).map((order: any) => ({
    id: order.id,
    status: order.status,
    created_at: order.created_at,
    vip_name: order.vips.name || order.vips.email,
  }));
}

/**
 * 최근 VIP 목록 조회
 */
export async function getRecentVips(limit: number = 5) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("vips")
    .select("id, email, name, tier, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data ?? [];
}
