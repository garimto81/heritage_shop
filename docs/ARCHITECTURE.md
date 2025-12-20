# Architecture

## Directory Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # 루트 레이아웃 (폰트: Playfair Display, Inter)
│   ├── page.tsx                  # 홈페이지
│   └── globals.css               # Tailwind CSS + 디자인 시스템 (골드/다크 테마)
├── lib/
│   ├── supabase/                 # Supabase 클라이언트 (3개)
│   │   ├── client.ts             # 브라우저용
│   │   ├── server.ts             # Server Components / Server Actions
│   │   └── admin.ts              # 서버 전용 (service role)
│   ├── auth/                     # 인증 세션 관리
│   │   ├── vip-session.ts        # VIP 세션 (JWT 쿠키)
│   │   └── admin-session.ts      # Admin 세션
│   └── utils.ts                  # cn() 유틸리티 (clsx + tailwind-merge)
├── types/
│   └── database.ts               # Supabase 스키마 TypeScript 타입
└── proxy.ts                      # Next.js 16 Proxy (인증 처리)
```

## Key Patterns

### Server/Client Component Split

```typescript
// page.tsx (Server Component)
export default async function ProductsPage() {
  const products = await getProducts()  // 서버에서 데이터 페칭
  return <ProductList products={products} />
}

// product-list.tsx (Client Component)
'use client'
export function ProductList({ products }) {
  // 인터랙티브 UI
}
```

### Supabase Client Usage

| 클라이언트 | 용도 | 파일 |
|-----------|------|------|
| `createBrowserClient` | 브라우저 | `client.ts` |
| `createServerClient` | RSC, Server Actions | `server.ts` |
| `createClient` (admin) | 서버 전용 관리자 | `admin.ts` |

### Proxy (Next.js 16)

Next.js 16에서 `middleware.ts`가 `proxy.ts`로 변경되었습니다.

```typescript
// src/proxy.ts
export function proxy(request: NextRequest) {
  // 1. /invite/* - 항상 허용
  // 2. /admin/* - Admin 세션 필요 (없으면 → /admin/auth/login)
  // 3. /products, /checkout, /orders - VIP 세션 필요 (없으면 → /)
  // 4. / (홈) + VIP 세션 있음 → /products로 리다이렉트
}
```

참고: [Next.js 16 Proxy API](https://nextjs.org/docs/app/api-reference/file-conventions/proxy)

### Design System

- **색상**: 골드 (`#D4AF37`), 다크 배경 (`#0A0A0A`)
- **폰트**: Playfair Display (헤딩), Inter (본문)
- **컴포넌트**: CVA 기반 variants

## Configuration

| 파일 | 용도 |
|------|------|
| `next.config.ts` | 이미지 최적화 (Supabase storage) |
| `tsconfig.json` | `@/*` 경로 별칭 |
| `components.json` | shadcn/ui 설정 |
