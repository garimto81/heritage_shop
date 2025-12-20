import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/admin-session";
import { getVipById, updateVip, deleteVip } from "@/lib/api/admin-vips";
import type { UpdateVipInput } from "@/types/admin";

/**
 * VIP 단일 조회
 * GET /api/admin/vips/[id]
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
    const vip = await getVipById(id);

    if (!vip) {
      return NextResponse.json(
        { success: false, error: "not_found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, vip });
  } catch (err) {
    console.error("Get VIP error:", err);
    return NextResponse.json(
      { success: false, error: "server_error" },
      { status: 500 }
    );
  }
}

/**
 * VIP 수정
 * PUT /api/admin/vips/[id]
 */
export async function PUT(
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
    const body: UpdateVipInput = await request.json();

    const result = await updateVip(id, body);

    if (!result.success) {
      const statusCode =
        result.error === "not_found"
          ? 404
          : result.error === "duplicate_email"
            ? 409
            : 500;
      return NextResponse.json(result, { status: statusCode });
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("Update VIP error:", err);
    return NextResponse.json(
      { success: false, error: "server_error" },
      { status: 500 }
    );
  }
}

/**
 * VIP 삭제
 * DELETE /api/admin/vips/[id]?hard=false
 * @param hard - true면 완전 삭제, false면 soft delete (is_active = false)
 */
export async function DELETE(
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
    const { searchParams } = new URL(request.url);
    const hard = searchParams.get("hard") === "true";

    const result = await deleteVip(id, hard);

    if (!result.success) {
      const statusCode =
        result.error === "not_found"
          ? 404
          : result.error === "has_orders"
            ? 409
            : 500;
      return NextResponse.json(result, { status: statusCode });
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("Delete VIP error:", err);
    return NextResponse.json(
      { success: false, error: "server_error" },
      { status: 500 }
    );
  }
}
