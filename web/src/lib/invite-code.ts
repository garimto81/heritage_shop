import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * VIP 초대 코드 생성 유틸리티
 *
 * 코드 형식: VIP + 4자리 영숫자 (예: VIP7K3M)
 * 혼동 방지 문자셋: 0, 1, I, O 제외
 */

// 혼동 방지 문자셋 (0, 1, I, O 제외)
const CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const PREFIX = "VIP";
const RANDOM_LENGTH = 4;
const MAX_ATTEMPTS = 10;

/**
 * 랜덤 초대 코드 생성
 * @returns 7자리 초대 코드 (예: VIP7K3M)
 */
export function generateInviteCode(): string {
  const randomPart = Array.from({ length: RANDOM_LENGTH }, () =>
    CHARSET[Math.floor(Math.random() * CHARSET.length)]
  ).join("");

  return `${PREFIX}${randomPart}`;
}

/**
 * 고유한 초대 코드 생성 (DB 중복 체크)
 * @param supabase Supabase 클라이언트
 * @returns 고유한 7자리 초대 코드
 * @throws 최대 시도 횟수 초과 시 에러
 */
export async function generateUniqueInviteCode(
  supabase: SupabaseClient
): Promise<string> {
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const code = generateInviteCode();

    const { data } = await supabase
      .from("vips")
      .select("id")
      .eq("invite_code", code)
      .single();

    // 중복 없으면 반환
    if (!data) {
      return code;
    }
  }

  throw new Error("고유한 초대 코드 생성 실패: 최대 시도 횟수 초과");
}

/**
 * 초대 코드 형식 검증
 * @param code 검증할 코드
 * @returns 유효 여부
 */
export function isValidInviteCode(code: string): boolean {
  // VIP + 4자리 영숫자 (혼동 문자 제외)
  const pattern = /^VIP[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{4}$/;
  return pattern.test(code);
}
