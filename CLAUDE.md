# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GGP Heritage Mall - VIP 전용 이커머스 플랫폼 (Next.js 16, React 19, Supabase)

- 비즈니스 모델: VIP Complimentary (무료 증정) - 결제 시스템 없음
- 티어별 상품 제한: Silver 3개, Gold 5개

## Commands

```powershell
cd D:\AI\claude01\ggp_heritage_mall\web

# 개발
npm run dev      # 개발 서버 (localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint

# 단위 테스트 (Vitest)
npm run test                              # 단위 테스트 실행
npm run test:watch                        # Watch 모드
npm run test -- src/lib/utils.test.ts     # 개별 파일 실행

# E2E 테스트 (Playwright - 포트 3002 사용)
npm run test:e2e                          # 전체 E2E
npm run test:e2e -- tests/e2e/cart.spec.ts   # 개별 테스트
npm run test:e2e:headed                   # 브라우저 표시
npm run test:e2e:ui                       # Playwright UI
```

### Supabase 로컬 개발

```powershell
cd D:\AI\claude01\ggp_heritage_mall
supabase start   # 로컬 Supabase (API:54321, DB:54322, Studio:54323)
supabase stop    # 로컬 Supabase 중지
```

### 환경 변수 (web/.env.local)

| 변수 | 용도 |
|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 브라우저용 anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | 서버용 service role key (RLS 우회) |
| `VIP_SESSION_SECRET` | VIP JWT 서명 |
| `ADMIN_SESSION_SECRET` | Admin JWT 서명 |

## Architecture

### Directory Structure

```
ggp_heritage_mall/
├── web/src/                    # Next.js 애플리케이션
│   ├── app/
│   │   ├── admin/              # 관리자 (인증, VIP/주문 관리)
│   │   ├── products/           # 상품 목록/상세
│   │   ├── checkout/           # 체크아웃
│   │   ├── invite/[token]/     # VIP 초대 코드 처리 (예: /invite/VIP7K3M)
│   │   └── api/                # API Routes
│   ├── components/
│   │   ├── admin/              # 관리자 컴포넌트
│   │   ├── products/           # 상품 컴포넌트
│   │   └── ui/                 # 공통 UI (shadcn/ui 스타일)
│   ├── lib/
│   │   ├── supabase/           # Supabase 클라이언트 (3개)
│   │   ├── api/                # API 호출 함수
│   │   ├── auth/               # VIP/Admin 세션 관리
│   │   └── invite-code.ts      # VIP 초대 코드 생성 유틸리티
│   ├── stores/                 # Zustand 상태 관리
│   ├── types/                  # TypeScript 타입
│   └── proxy.ts                # Next.js 16 Proxy (인증 라우팅)
├── supabase/migrations/        # DB 마이그레이션
└── docs/                       # 프로젝트 문서
```

### Key Patterns

**Server/Client Component 분리**
- `page.tsx`: Server Component (데이터 페칭)
- `*-client.tsx`: Client Component (인터랙션)

**Supabase 클라이언트** (`lib/supabase/`)
| 파일 | 용도 |
|------|------|
| `client.ts` | 브라우저 (anon key) |
| `server.ts` | RSC, Server Actions |
| `admin.ts` | 관리자 작업 (service_role, RLS 우회) |

**Proxy** (`src/proxy.ts`)
- Admin 경로: `/admin/*` → Admin 세션 필요 (단, `/admin/auth/login`은 예외)
- VIP 경로: `/products/*`, `/checkout/*`, `/orders/*` → VIP 세션 필요
- 홈에서 VIP 세션 있으면 `/products`로 리다이렉트
- `/invite/*` 경로는 항상 허용

**듀얼 인증 시스템**
- VIP: JWT 쿠키 (`lib/auth/vip-session.ts`)
- Admin: Supabase Auth + admins 테이블 (`lib/auth/admin-session.ts`)

**장바구니**
- Zustand + localStorage (`stores/cartStore.ts`)
- 티어별 제한: Silver 3개, Gold 5개

### Design System

- 색상: 골드 (`#D4AF37`), 다크 (`#0A0A0A`)
- 폰트: Playfair Display (헤딩), Inter (본문)
- 컴포넌트: CVA variants

## Tech Stack

Next.js 16, React 19, Tailwind CSS 4, Supabase, TypeScript, Zustand, CVA, Framer Motion, Lucide Icons

## Database Enums

```typescript
type vip_tier = "silver" | "gold"
type order_status = "pending" | "processing" | "shipped" | "delivered" | "cancelled"
type verification_status = "pending" | "approved" | "rejected"
```

핵심 테이블: `vips`, `products`, `orders`, `categories`, `inventory`, `verification_codes`

## 문서 작성 규칙

### 화면 목업 (PRD, 설계 문서)

| 규칙 | 값 |
|------|-----|
| ASCII 목업 사용 | 금지 |
| HTML 목업 위치 | `docs/mockups/*.html` |
| 이미지 캡처 위치 | `docs/images/mockups/*.png` |
| 가로 너비 | 540px |
| 캡처 대상 | `#capture-target` |

**워크플로우**:
1. HTML 목업 작성 (`docs/mockups/[feature].html`)
2. Playwright로 캡처 (`--selector="#capture-target"`)
3. 문서에 이미지 삽입 + HTML 링크 추가

```powershell
npx playwright screenshot docs/mockups/feature.html docs/images/mockups/feature.png --selector="#capture-target"
```

**참조**: `D:\AI\claude01\docs\HTML_MOCKUP_GUIDE.md`

## References

| 문서 | 내용 |
|------|------|
| `docs/PRD.md` | 제품 요구사항 상세 |
| `docs/ARCHITECTURE.md` | 디렉토리 구조, 패턴 |
| `docs/DATABASE.md` | 테이블 스키마, enum |
| `docs/SUPABASE.md` | 클라이언트, 환경변수 |
| `web/src/types/database.ts` | TypeScript 타입 정의 |
