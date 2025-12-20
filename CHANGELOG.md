# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2025-12-21

### Changed

- **Next.js 16 Proxy Migration**: `middleware.ts` → `proxy.ts`로 마이그레이션
  - 파일명: `src/middleware.ts` → `src/proxy.ts`
  - 함수명: `middleware()` → `proxy()`
  - 삭제된 파일:
    - `web/middleware.ts`
    - `web/src/middleware.ts`
    - `web/src/lib/supabase/middleware.ts` (미사용 헬퍼)
  - 참고: [Next.js 16 Proxy API](https://nextjs.org/docs/app/api-reference/file-conventions/proxy)

### Fixed

- Turbopack 캐시 오류 해결 (.next 디렉토리 재생성)

### Documentation

- `CLAUDE.md`: Proxy 설명 추가, 디렉토리 구조 업데이트
- `docs/ARCHITECTURE.md`: Proxy 섹션 추가, Supabase 클라이언트 목록 업데이트
- `docs/SUPABASE.md`: middleware.ts 제거 안내 추가

## [0.1.0] - 2025-12-20

### Added

- 초기 프로젝트 설정 (Next.js 16, React 19, Supabase)
- VIP 전용 이커머스 플랫폼 기본 구조
- 듀얼 인증 시스템 (VIP + Admin)
- 상품 목록/상세 페이지
- 장바구니 기능 (Zustand + localStorage)
- 체크아웃 플로우
- 관리자 대시보드
- 재고 차감 로직

[Unreleased]: https://github.com/garimto81/claude/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/garimto81/claude/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/garimto81/claude/releases/tag/v0.1.0
