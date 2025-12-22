import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/auth/admin-session";
import { VIP_COOKIE_NAME } from "@/lib/auth/vip-session";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 초대 페이지는 항상 허용
  if (pathname.startsWith("/invite/")) {
    return NextResponse.next();
  }

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

  // VIP 세션 확인
  const vipSession = request.cookies.get(VIP_COOKIE_NAME);
  const hasValidSession = !!vipSession;

  // 2. /products/*, /checkout/*, /orders/* - VIP 세션 필요
  const protectedRoutes = ["/products", "/checkout", "/orders"];
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtectedRoute && !hasValidSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 3. 홈페이지에서 VIP 세션이 있으면 /products로 리다이렉트
  if (pathname === "/" && hasValidSession) {
    return NextResponse.redirect(new URL("/products", request.url));
  }

  return NextResponse.next();
}

// Next.js 미들웨어로 등록
export { proxy as middleware };
