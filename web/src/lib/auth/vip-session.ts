import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { VipSession, VipTier } from "@/types/vip";

// 쿠키 및 JWT 설정
const COOKIE_NAME = "vip_session";
const SESSION_DURATION = 7 * 24 * 60 * 60; // 7일 (초)

/**
 * JWT 서명 키 가져오기
 */
function getSecretKey(): Uint8Array {
  const secret = process.env.VIP_SESSION_SECRET;
  if (!secret) {
    throw new Error("VIP_SESSION_SECRET 환경변수가 설정되지 않았습니다.");
  }
  return new TextEncoder().encode(secret);
}

/**
 * VIP 세션 생성 및 쿠키 설정
 * @param vipId - VIP 고유 ID
 * @param name - VIP 이름
 * @param tier - VIP 티어
 */
export async function setVipSession(
  vipId: string,
  name: string,
  tier: VipTier
): Promise<void> {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION;

  // JWT 토큰 생성
  const token = await new SignJWT({
    id: vipId,
    name,
    tier,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresAt)
    .setIssuedAt()
    .sign(getSecretKey());

  // 쿠키 설정
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION,
    path: "/",
  });
}

/**
 * 현재 VIP 세션 조회
 * @returns VIP 세션 정보 또는 null
 */
export async function getVipSession(): Promise<VipSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return null;
    }

    // JWT 검증 및 디코딩
    const { payload } = await jwtVerify(token, getSecretKey());

    return {
      id: payload.id as string,
      name: payload.name as string,
      tier: payload.tier as VipTier,
      exp: payload.exp as number,
    };
  } catch {
    // 토큰이 유효하지 않거나 만료됨
    return null;
  }
}

/**
 * VIP 세션 삭제
 */
export async function clearVipSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * VIP 세션 쿠키 이름 (미들웨어에서 사용)
 */
export const VIP_COOKIE_NAME = COOKIE_NAME;
