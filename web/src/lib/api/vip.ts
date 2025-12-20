import { createAdminClient } from "@/lib/supabase/admin";
import type { VipTier } from "@/types/vip";

/**
 * VIP 데이터베이스 레코드 타입
 */
export interface VipRecord {
  id: string;
  name: string;
  tier: VipTier;
  invite_token: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * VIP 조회 결과 타입
 */
export type GetVipResult =
  | { success: true; data: VipRecord }
  | { success: false; error: "not_found" | "inactive" | "database_error" };

/**
 * 초대 토큰으로 VIP 조회
 * Admin 클라이언트를 사용하여 RLS를 우회합니다.
 *
 * @param token - 초대 토큰 (UUID)
 * @returns VIP 정보 또는 에러
 */
export async function getVipByToken(token: string): Promise<GetVipResult> {
  try {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("vips")
      .select("*")
      .eq("invite_token", token)
      .single();

    if (error) {
      // PGRST116: Row not found
      if (error.code === "PGRST116") {
        return { success: false, error: "not_found" };
      }
      console.error("VIP 조회 에러:", error);
      return { success: false, error: "database_error" };
    }

    // 활성 상태 확인
    if (!data.is_active) {
      return { success: false, error: "inactive" };
    }

    return {
      success: true,
      data: data as VipRecord,
    };
  } catch (err) {
    console.error("VIP 조회 중 예외 발생:", err);
    return { success: false, error: "database_error" };
  }
}
