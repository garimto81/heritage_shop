import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/admin-session";
import { getOrderById, updateOrderStatus } from "@/lib/api/admin-orders";
import type { OrderStatus } from "@/types/admin";

/**
 * 주문 상세 조회
 * GET /api/admin/orders/[id]
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { success: false, error: "unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const order = await getOrderById(id);

    if (!order) {
      return NextResponse.json(
        { success: false, error: "not_found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order });
  } catch (err) {
    console.error("Get order error:", err);
    return NextResponse.json(
      { success: false, error: "server_error" },
      { status: 500 }
    );
  }
}

/**
 * 주문 상태 업데이트
 * PATCH /api/admin/orders/[id]
 * Body: { status: OrderStatus, tracking_number?: string, carrier?: string }
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { success: false, error: "unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const body = await request.json();

    const { status, tracking_number, carrier } = body;

    // 상태 검증
    const validStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: "invalid_status" },
        { status: 400 }
      );
    }

    const tracking =
      tracking_number && carrier
        ? { tracking_number, carrier }
        : undefined;

    const result = await updateOrderStatus(
      id,
      status as OrderStatus,
      tracking
    );

    if (!result.success) {
      const statusCode = result.error === "not_found" ? 404 : 500;
      return NextResponse.json(result, { status: statusCode });
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("Update order status error:", err);
    return NextResponse.json(
      { success: false, error: "server_error" },
      { status: 500 }
    );
  }
}
