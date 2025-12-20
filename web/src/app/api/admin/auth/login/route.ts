import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { setAdminSession } from "@/lib/auth/admin-session";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 입력 검증
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "missing_credentials" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // 1. Supabase Auth로 로그인
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      return NextResponse.json(
        { success: false, error: "invalid_credentials" },
        { status: 401 }
      );
    }

    // 2. admins 테이블에서 user_id 확인
    const { data: adminData, error: adminError } = await supabase
      .from("admins")
      .select("id, email, name, is_active")
      .eq("user_id", authData.user.id)
      .single();

    if (adminError || !adminData) {
      return NextResponse.json(
        { success: false, error: "not_admin" },
        { status: 403 }
      );
    }

    if (!adminData.is_active) {
      return NextResponse.json(
        { success: false, error: "admin_inactive" },
        { status: 403 }
      );
    }

    // 3. Admin 세션 생성
    await setAdminSession(adminData.id, adminData.email, adminData.name);

    return NextResponse.json({
      success: true,
      admin: {
        id: adminData.id,
        email: adminData.email,
        name: adminData.name,
      },
    });
  } catch (err) {
    console.error("Admin login error:", err);
    return NextResponse.json(
      { success: false, error: "server_error" },
      { status: 500 }
    );
  }
}
