import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { getVipByToken } from "@/lib/api/vip";

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
 * VIP 로그인 API
 * GET /api/auth/vip/login?token=xxx
 * 토큰 검증 후 세션 쿠키 설정 및 /products로 리다이렉트
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");

  // 토큰 파라미터 확인
  if (!token) {
    return NextResponse.redirect(new URL("/invite/invalid", request.url));
  }

  // 토큰으로 VIP 조회
  const result = await getVipByToken(token);

  // 에러 처리
  if (!result.success) {
    return NextResponse.redirect(
      new URL(`/invite/invalid?reason=${result.error}`, request.url)
    );
  }

  // JWT 토큰 생성
  const { id, name, tier } = result.data;
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION;

  const jwtToken = await new SignJWT({
    id,
    name,
    tier,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresAt)
    .setIssuedAt()
    .sign(getSecretKey());

  // 리다이렉트 응답 생성
  const response = NextResponse.redirect(new URL("/products", request.url));

  // 쿠키 설정
  response.cookies.set(COOKIE_NAME, jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION,
    path: "/",
  });

  return response;
}
