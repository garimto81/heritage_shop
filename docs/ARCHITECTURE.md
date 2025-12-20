# Architecture

## Directory Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # 루트 레이아웃 (폰트: Playfair Display, Inter)
│   ├── page.tsx                  # 홈페이지
│   └── globals.css               # Tailwind CSS + 디자인 시스템 (골드/다크 테마)
├── lib/
│   ├── supabase/                 # Supabase 클라이언트 (4개)
│   │   ├── client.ts             # 브라우저용
│   │   ├── server.ts             # Server Components / Server Actions
│   │   ├── middleware.ts         # Edge 세션 관리
│   │   └── admin.ts              # 서버 전용 (service role)
│   └── utils.ts                  # cn() 유틸리티 (clsx + tailwind-merge)
├── types/
│   └── database.ts               # Supabase 스키마 TypeScript 타입
└── middleware.ts                 # Next.js 미들웨어 (루트)
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
| `createServerClient` (edge) | 미들웨어 세션 | `middleware.ts` |
| `createClient` (admin) | 서버 전용 관리자 | `admin.ts` |

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
