import { NextResponse, type NextRequest } from "next/server";

// VIP 세션 쿠키 이름
const VIP_COOKIE_NAME = "vip_session";

// 보호된 경로 (VIP 세션 필요)
const PROTECTED_ROUTES = ["/products", "/checkout", "/orders"];

// 공개 경로 (세션 없이 접근 가능)
const PUBLIC_ROUTES = ["/", "/invite"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // VIP 세션 쿠키 확인
  const vipSession = request.cookies.get(VIP_COOKIE_NAME)?.value;
  const hasValidSession = !!vipSession;

  // 초대 페이지는 항상 허용
  if (pathname.startsWith("/invite/")) {
    return NextResponse.next();
  }

  // 보호된 경로 체크
  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtectedRoute && !hasValidSession) {
    // VIP 세션이 없으면 홈으로 리다이렉트
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // 홈페이지에서 세션이 있으면 /products로 리다이렉트
  if (pathname === "/" && hasValidSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/products";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

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
