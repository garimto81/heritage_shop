import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/admin-session";
import { getVipList, createVip } from "@/lib/api/admin-vips";
import type { VipFilters, CreateVipInput } from "@/types/admin";

/**
 * VIP 목록 조회
 * GET /api/admin/vips?page=1&limit=20&tier=silver&is_active=true&search=email
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

    const filters: VipFilters = {
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "20"),
    };

    const tier = searchParams.get("tier");
    if (tier === "silver" || tier === "gold") {
      filters.tier = tier;
    }

    const isActive = searchParams.get("is_active");
    if (isActive === "true") filters.is_active = true;
    if (isActive === "false") filters.is_active = false;

    const search = searchParams.get("search");
    if (search) filters.search = search;

    const result = await getVipList(filters);

    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error("Get VIP list error:", err);
    return NextResponse.json(
      { success: false, error: "server_error" },
      { status: 500 }
    );
  }
}

/**
 * VIP 생성
 * POST /api/admin/vips
 */
export async function POST(request: Request) {
  // 세션 검증
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { success: false, error: "unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body: CreateVipInput = await request.json();

    // 입력 검증
    if (!body.email || !body.tier || !body.reg_type) {
      return NextResponse.json(
        { success: false, error: "missing_required_fields" },
        { status: 400 }
      );
    }

    const result = await createVip(body);

    if (!result.success) {
      const statusCode = result.error === "duplicate_email" ? 409 : 500;
      return NextResponse.json(result, { status: statusCode });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    console.error("Create VIP error:", err);
    return NextResponse.json(
      { success: false, error: "server_error" },
      { status: 500 }
    );
  }
}
