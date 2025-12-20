import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/admin-session";
import {
  getDashboardStats,
  getRecentOrders,
  getRecentVips,
} from "@/lib/api/admin-dashboard";

/**
 * 대시보드 데이터 조회
 * GET /api/admin/dashboard
 */
export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { success: false, error: "unauthorized" },
      { status: 401 }
    );
  }

  try {
    const [stats, recentOrders, recentVips] = await Promise.all([
      getDashboardStats(),
      getRecentOrders(5),
      getRecentVips(5),
    ]);

    return NextResponse.json({
      success: true,
      stats,
      recentOrders,
      recentVips,
    });
  } catch (err) {
    console.error("Dashboard API error:", err);
    return NextResponse.json(
      { success: false, error: "server_error" },
      { status: 500 }
    );
  }
}
