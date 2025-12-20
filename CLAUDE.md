# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GGP Heritage Mall - VIP 전용 이커머스 플랫폼 (Next.js 16, React 19, Supabase)

## Commands

```powershell
cd D:\AI\claude01\ggp_heritage_mall\web
npm run dev      # 개발 서버 (localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint
```

### Supabase 로컬 개발

```powershell
cd D:\AI\claude01\ggp_heritage_mall
supabase start   # 로컬 Supabase (API:54321, DB:54322, Studio:54323)
supabase stop    # 로컬 Supabase 중지
```

## Architecture

### Directory Structure

```
ggp_heritage_mall/
├── web/src/                    # Next.js 애플리케이션
│   ├── app/
│   │   ├── admin/              # 관리자 (인증, VIP/주문 관리)
│   │   ├── products/           # 상품 목록/상세
│   │   ├── checkout/           # 체크아웃
│   │   ├── invite/[token]/     # VIP 초대 링크 처리
│   │   └── api/                # API Routes
│   ├── components/
│   │   ├── admin/              # 관리자 컴포넌트
│   │   ├── products/           # 상품 컴포넌트
│   │   └── ui/                 # 공통 UI (shadcn/ui 스타일)
│   ├── lib/
│   │   ├── supabase/           # Supabase 클라이언트 (4개)
│   │   ├── api/                # API 호출 함수
│   │   └── auth/               # VIP/Admin 세션 관리
│   ├── stores/                 # Zustand 상태 관리
│   └── types/                  # TypeScript 타입
├── supabase/migrations/        # DB 마이그레이션
└── docs/                       # 프로젝트 문서
```

### Key Patterns

**Server/Client Component 분리**
- `page.tsx`: Server Component (데이터 페칭)
- `*-client.tsx`: Client Component (인터랙션)

**Supabase 클라이언트**
| 파일 | 용도 |
|------|------|
| `client.ts` | 브라우저 (anon key) |
| `server.ts` | RSC, Server Actions |
| `middleware.ts` | Edge 세션 관리 |
| `admin.ts` | 관리자 작업 (service_role, RLS 우회) |

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

## References

| 문서 | 내용 |
|------|------|
| `docs/PRD.md` | 제품 요구사항 상세 |
| `docs/ARCHITECTURE.md` | 디렉토리 구조, 패턴 |
| `docs/DATABASE.md` | 테이블 스키마, enum |
| `docs/SUPABASE.md` | 클라이언트, 환경변수 |
| `web/src/types/database.ts` | TypeScript 타입 정의 |
