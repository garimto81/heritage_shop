# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GGP Heritage Mall - VIP 전용 이커머스 플랫폼 (Next.js 16, React 19, Supabase)

## Commands

```powershell
cd D:\AI\claude01\ggp_heritage_mall
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버
npm run lint     # ESLint
```

## Architecture

- **App Router**: Server Components + Client Components 분리 패턴
- **Supabase 클라이언트**: 4개 (client/server/middleware/admin)
- **상세**: `docs/ARCHITECTURE.md` 참조

## Tech Stack

Next.js 16, React 19, Tailwind CSS 4, Supabase, TypeScript, CVA, Framer Motion

## References

| 문서 | 내용 |
|------|------|
| `docs/ARCHITECTURE.md` | 디렉토리 구조, 패턴 |
| `docs/DATABASE.md` | 테이블 스키마, enum |
| `docs/SUPABASE.md` | 클라이언트, 환경변수 |
| `src/types/database.ts` | TypeScript 타입 정의 |
