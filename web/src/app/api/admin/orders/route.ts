import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/admin-session";
import { getOrderList } from "@/lib/api/admin-orders";
import type { OrderFilters } from "@/types/admin";

/**
 * 주문 목록 조회
 * GET /api/admin/orders?page=1&limit=20&status=pending&vip_id=xxx
 */
export async function GET(request: Request) {
  // 세션 검증
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { success: false, error: "unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);

    const filters: OrderFilters = {
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "20"),
    };

    const status = searchParams.get("status");
    if (
      status === "pending" ||
      status === "processing" ||
      status === "shipped" ||
      status === "delivered" ||
      status === "cancelled"
    ) {
      filters.status = status;
    }

    const vipId = searchParams.get("vip_id");
    if (vipId) filters.vip_id = vipId;

    const result = await getOrderList(filters);

    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error("Get order list error:", err);
    return NextResponse.json(
      { success: false, error: "server_error" },
      { status: 500 }
    );
  }
}
