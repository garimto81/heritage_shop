import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/admin-session";
import { regenerateToken } from "@/lib/api/admin-vips";

/**
 * 초대 토큰 재발급
 * POST /api/admin/vips/[id]/regenerate-token
 */
export async function POST(
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
    const result = await regenerateToken(id);

    if (!result.success) {
      const statusCode = result.error === "not_found" ? 404 : 500;
      return NextResponse.json(result, { status: statusCode });
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("Regenerate token error:", err);
    return NextResponse.json(
      { success: false, error: "server_error" },
      { status: 500 }
    );
  }
}
