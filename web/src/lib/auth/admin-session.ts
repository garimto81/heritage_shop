import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { AdminSession } from "@/types/admin";

// 쿠키 및 JWT 설정
const COOKIE_NAME = "admin_session";
const SESSION_DURATION = 24 * 60 * 60; // 24시간 (초)

/**
 * JWT 서명 키 가져오기
 */
function getSecretKey(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET 환경변수가 설정되지 않았습니다.");
  }
  return new TextEncoder().encode(secret);
}

/**
 * Admin 세션 생성 및 쿠키 설정
 * @param adminId - Admin 고유 ID
 * @param email - Admin 이메일
 * @param name - Admin 이름
 */
export async function setAdminSession(
  adminId: string,
  email: string,
  name: string | null
): Promise<void> {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION;

  // JWT 토큰 생성
  const token = await new SignJWT({
    id: adminId,
    email,
    name,
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
 * 현재 Admin 세션 조회
 * @returns Admin 세션 정보 또는 null
 */
export async function getAdminSession(): Promise<AdminSession | null> {
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
      email: payload.email as string,
      name: payload.name as string | null,
      exp: payload.exp as number,
    };
  } catch {
    // 토큰이 유효하지 않거나 만료됨
    return null;
  }
}

/**
 * Admin 세션 삭제
 */
export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Admin 세션 쿠키 이름 (미들웨어에서 사용)
 */
export const ADMIN_COOKIE_NAME = COOKIE_NAME;
