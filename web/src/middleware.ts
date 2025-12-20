import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/auth/admin-session";
import { VIP_COOKIE_NAME } from "@/lib/auth/vip-session";

export const config = {
  matcher: ["/admin/:path*", "/products/:path*", "/checkout/:path*"],
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. /admin/* 경로 - Admin 세션 필요
  if (pathname.startsWith("/admin")) {
    // /admin/auth/login은 예외 (세션 없이 접근 가능)
    if (pathname === "/admin/auth/login") {
      return NextResponse.next();
    }

    // Admin 세션 쿠키 확인
    const adminSession = request.cookies.get(ADMIN_COOKIE_NAME);
    if (!adminSession) {
      return NextResponse.redirect(new URL("/admin/auth/login", request.url));
    }
  }

  // 2. /products/*, /checkout/* - VIP 세션 필요
  if (pathname.startsWith("/products") || pathname.startsWith("/checkout")) {
    const vipSession = request.cookies.get(VIP_COOKIE_NAME);
    if (!vipSession) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}
