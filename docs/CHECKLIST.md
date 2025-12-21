# GGP Heritage Mall - 개발 체크리스트

PRD v1.1.0 기준 | 최종 업데이트: 2025-12-21 | 검증 완료

---

## 현황 요약

| 구분 | 항목 수 | 완료 | 진행률 |
|------|:------:|:----:|:------:|
| 현황 검증 (P0-P2) | 105개 | 105개 | **100%** |
| 향후 구현 (P3) | 46개 | 0 | 0% |
| **총합** | **151개** | **105개** | **70%** |

```
┌─────────────────────────────────────────────┐
│          현황 검증 진행률: 100%              │
│  ████████████████████████████████  105/105  │
└─────────────────────────────────────────────┘
```

---

## Part 1: 현황 검증 체크리스트 (P0-P2)

### 1. VIP 시스템 영역 (P0) - 10/10 ✅

#### 1.1 VIP 인증 시스템
| 상태 | 항목 | 파일 | 검증 방법 |
|:----:|------|------|----------|
| [x] | 초대 링크 접속 (`/invite/[token]`) | `web/src/app/invite/[token]/page.tsx` | 수동 테스트 |
| [x] | UUID 기반 토큰 검증 | `web/src/lib/api/vip.ts` | 코드 리뷰 |
| [x] | JWT 쿠키 세션 생성 (7일 유효) | `web/src/lib/auth/vip-session.ts` | 코드 리뷰 |
| [x] | 자동 `/products` 리다이렉트 | `web/src/app/api/auth/vip/login/route.ts` | 수동 테스트 |

#### 1.2 VIP 티어 시스템
| 상태 | 항목 | 파일 | 검증 방법 |
|:----:|------|------|----------|
| [x] | Silver: 3개 상품 제한 | `web/src/stores/cartStore.ts` | 코드 리뷰 |
| [x] | Gold: 5개 상품 제한 | `web/src/stores/cartStore.ts` | 코드 리뷰 |
| [x] | 티어별 상품 접근 제어 | `web/src/app/products/products-client.tsx` | 수동 테스트 |

#### 1.3 에러 처리
| 상태 | 항목 | 파일 | 검증 방법 |
|:----:|------|------|----------|
| [x] | Invalid token 화면 | `web/src/app/invite/[token]/invalid-invite.tsx` | 수동 테스트 |
| [x] | Inactive VIP 화면 | `web/src/lib/api/vip.ts:51-53` | 수동 테스트 |
| [x] | Database error 화면 | `web/src/lib/api/vip.ts:47` | 수동 테스트 |

---

### 2. 관리자 기능 영역 - 21/21 ✅

#### 2.1 관리자 인증 (P0)
| 상태 | 항목 | 파일 | 검증 방법 |
|:----:|------|------|----------|
| [x] | Supabase Auth 기반 로그인 | `web/src/app/admin/auth/login/page.tsx` | 수동 테스트 |
| [x] | `admins` 테이블 권한 검증 | `web/src/app/api/admin/auth/login/route.ts` | 코드 리뷰 |
| [x] | 세션 미들웨어 (proxy.ts) | `web/src/proxy.ts` | 코드 리뷰 |
| [x] | 로그아웃 기능 | `web/src/app/api/admin/auth/logout/route.ts` | 수동 테스트 |

#### 2.2 VIP 목록 화면 (P0)
| 상태 | 항목 | 파일 | 검증 방법 |
|:----:|------|------|----------|
| [x] | 테이블 표시 (Email, Name, Tier, Status, Created, Actions) | `web/src/app/admin/vips/vips-client.tsx` | 수동 테스트 |
| [x] | 이메일 검색 | `web/src/app/api/admin/vips/route.ts` | API 테스트 |
| [x] | 티어별 필터 (All/Silver/Gold) | `web/src/app/api/admin/vips/route.ts` | API 테스트 |
| [x] | 상태별 필터 (Active/Inactive) | `web/src/app/api/admin/vips/route.ts` | API 테스트 |
| [x] | 페이지네이션 (페이지당 20개) | `web/src/app/api/admin/vips/route.ts` | API 테스트 |
| [x] | 정렬 기능 | `web/src/app/admin/vips/vips-client.tsx` | 수동 테스트 |

#### 2.3 VIP 생성 화면 (P0)
| 상태 | 항목 | 파일 | 검증 방법 |
|:----:|------|------|----------|
| [x] | 입력 폼 (Email, Name, Tier, Registration Type) | `web/src/app/admin/vips/new/page.tsx` | 수동 테스트 |
| [x] | 자동 UUID 토큰 생성 | `web/src/app/api/admin/vips/route.ts` | 코드 리뷰 |
| [x] | 초대 링크 표시 및 복사 기능 | `web/src/app/admin/vips/new/page.tsx` | 수동 테스트 |
| [x] | 이메일 중복 검증 | `web/src/app/api/admin/vips/route.ts` | API 테스트 |
| [x] | 유효성 검사 | `web/src/app/admin/vips/new/page.tsx` | 수동 테스트 |

#### 2.4 VIP 수정 화면 (P1)
| 상태 | 항목 | 파일 | 검증 방법 |
|:----:|------|------|----------|
| [x] | 편집 가능 필드 (Email, Name, Tier, Status) | `web/src/app/admin/vips/[id]/edit/edit-client.tsx` | 수동 테스트 |
| [x] | 읽기 전용 필드 (Invite Token) | `web/src/app/admin/vips/[id]/edit/edit-client.tsx` | 수동 테스트 |
| [x] | 토큰 재발급 기능 (확인 모달 포함) | `web/src/app/api/admin/vips/[id]/regenerate-token/route.ts` | 수동 테스트 |

#### 2.5 VIP 삭제/비활성화 (P1)
| 상태 | 항목 | 파일 | 검증 방법 |
|:----:|------|------|----------|
| [x] | Soft Delete (is_active = false) | `web/src/app/api/admin/vips/[id]/route.ts` | API 테스트 |
| [x] | Hard Delete 조건부 지원 (주문 없을 때만) | `web/src/app/api/admin/vips/[id]/route.ts` | API 테스트 |
| [x] | FK 제약 검증 | `supabase/migrations/001_initial_schema.sql` | DB 검증 |
| [x] | 확인 모달 | `web/src/components/admin/shared/ConfirmModal.tsx` | 수동 테스트 |

#### 2.6 VIP 상세 보기 (P2)
| 상태 | 항목 | 파일 | 검증 방법 |
|:----:|------|------|----------|
| [x] | VIP 기본 정보 표시 | `web/src/app/admin/vips/[id]/page.tsx` | 수동 테스트 |
| [x] | 주문 이력 표시 | `web/src/app/admin/vips/[id]/page.tsx` | 수동 테스트 |
| [x] | 초대 링크 복사 버튼 | `web/src/components/admin/vips/InviteLinkModal.tsx` | 수동 테스트 |

---

### 3. 상품 관리 영역 (P0) - 11/11 ✅

#### 3.1 상품 목록
| 상태 | 항목 | 파일 | 검증 방법 |
|:----:|------|------|----------|
| [x] | 카테고리별 필터링 | `web/src/app/products/products-client.tsx` | 수동 테스트 |
| [x] | 티어별 접근 제어 | `web/src/app/products/products-client.tsx` | 수동 테스트 |
| [x] | 상품 이미지, 이름, 카테고리 표시 | `web/src/components/products/ProductCard.tsx` | 수동 테스트 |
| [x] | VIP 세션 기반 권한 검증 | `web/src/proxy.ts` | 코드 리뷰 |

#### 3.2 상품 상세
| 상태 | 항목 | 파일 | 검증 방법 |
|:----:|------|------|----------|
| [x] | 상품 이미지 갤러리 (Framer Motion) | `web/src/components/products/ImageGallery.tsx` | 수동 테스트 |
| [x] | 사이즈 선택 | `web/src/components/products/ProductDetail.tsx` | 수동 테스트 |
| [x] | 재고 확인 (`inventory` 테이블) | `web/src/app/products/[id]/page.tsx` | 수동 테스트 |
| [x] | 장바구니 추가 (VIP 티어 제한 적용) | `web/src/components/products/ProductDetail.tsx` | 수동 테스트 |

#### 3.3 재고 관리
| 상태 | 항목 | 파일 | 검증 방법 |
|:----:|------|------|----------|
| [x] | 재고 차감 로직 (트랜잭션) | `supabase/migrations/004_inventory_functions.sql` | DB 함수 테스트 |
| [x] | 재고 복원 로직 (주문 취소 시) | `supabase/migrations/004_inventory_functions.sql` | DB 함수 테스트 |
| [x] | 재고 가용성 확인 함수 | `supabase/migrations/004_inventory_functions.sql` | DB 함수 테스트 |

---

### 4. 장바구니 영역 (P0) - 7/7 ✅

#### 4.1 상태 관리
| 상태 | 항목 | 파일 | 검증 방법 |
|:----:|------|------|----------|
| [x] | Zustand 클라이언트 상태 관리 | `web/src/stores/cartStore.ts` | 코드 리뷰 |
| [x] | localStorage 영속성 | `web/src/stores/cartStore.ts` (persist 미들웨어) | 수동 테스트 |
| [x] | addItem 액션 | `web/src/stores/cartStore.ts:37-55` | 코드 리뷰 |
| [x] | removeItem 액션 | `web/src/stores/cartStore.ts:57-61` | 코드 리뷰 |
| [x] | updateItemSize 액션 | `web/src/stores/cartStore.ts:63-69` | 코드 리뷰 |
| [x] | clearCart 액션 | `web/src/stores/cartStore.ts:71-73` | 코드 리뷰 |
| [x] | canAddMore 함수 (티어 제한 검증) | `web/src/stores/cartStore.ts:88-91` | 코드 리뷰 |

---

### 5. 주문 시스템 영역 - 11/11 ✅

#### 5.1 체크아웃 페이지 (P0)
| 상태 | 항목 | 파일 | 검증 방법 |
|:----:|------|------|----------|
| [x] | 배송 주소 입력 폼 | `web/src/components/checkout/ShippingForm.tsx` | 수동 테스트 |
| [x] | 주문 요약 컴포넌트 | `web/src/components/checkout/OrderSummary.tsx` | 수동 테스트 |
| [x] | VIP 세션에서 배송지 불러오기 | `web/src/app/checkout/page.tsx` | 수동 테스트 |
| [x] | "VIP Complimentary" 표시 | `web/src/app/checkout/page.tsx` | 수동 테스트 |
| [x] | "Free Shipping" 표시 | `web/src/app/checkout/page.tsx` | 수동 테스트 |

#### 5.2 주문 생성 (P0)
| 상태 | 항목 | 파일 | 검증 방법 |
|:----:|------|------|----------|
| [x] | Server Action: createOrderAction() | `web/src/app/checkout/actions.ts` | 코드 리뷰 |
| [x] | 재고 차감 (원자적 트랜잭션) | `web/src/lib/api/orders.ts` | E2E 테스트 |
| [x] | 주문 및 주문 상품 저장 | `web/src/lib/api/orders.ts` | E2E 테스트 |

#### 5.3 주문 관리 - 관리자 (P1)
| 상태 | 항목 | 파일 | 검증 방법 |
|:----:|------|------|----------|
| [x] | 주문 목록 페이지 | `web/src/app/admin/orders/page.tsx` | 수동 테스트 |
| [x] | 주문 상세 페이지 | `web/src/app/admin/orders/[id]/page.tsx` | 수동 테스트 |
| [x] | 상태 필터링 | `web/src/app/api/admin/orders/route.ts` | API 테스트 |
| [x] | 페이지네이션 | `web/src/app/api/admin/orders/route.ts` | API 테스트 |
| [x] | 주문 상태 업데이트 (PATCH) | `web/src/app/api/admin/orders/[id]/route.ts` | API 테스트 |
| [x] | 배송 정보 업데이트 (tracking_number, carrier) | `web/src/app/api/admin/orders/[id]/route.ts` | API 테스트 |

---

### 6. 대시보드 영역 (P2) - 5/5 ✅

#### 6.1 관리자 대시보드
| 상태 | 항목 | 파일 | 검증 방법 |
|:----:|------|------|----------|
| [x] | 총 VIP 수 표시 | `web/src/app/admin/dashboard/page.tsx` | 수동 테스트 |
| [x] | 활성 VIP 수 표시 | `web/src/app/admin/dashboard/page.tsx` | 수동 테스트 |
| [x] | 총 주문 수 표시 | `web/src/app/admin/dashboard/page.tsx` | 수동 테스트 |
| [x] | 최근 VIP 목록 | `web/src/components/admin/dashboard/RecentVips.tsx` | 수동 테스트 |
| [x] | 최근 주문 목록 | `web/src/components/admin/dashboard/RecentOrders.tsx` | 수동 테스트 |

---

### 7. API 엔드포인트 - 12/12 ✅

#### 7.1 관리자 인증 API
| 상태 | 메서드 | 경로 | 파일 |
|:----:|--------|------|------|
| [x] | POST | `/api/admin/auth/login` | `web/src/app/api/admin/auth/login/route.ts` |
| [x] | POST | `/api/admin/auth/logout` | `web/src/app/api/admin/auth/logout/route.ts` |

#### 7.2 VIP 관리 API
| 상태 | 메서드 | 경로 | 파일 |
|:----:|--------|------|------|
| [x] | GET | `/api/admin/vips` | `web/src/app/api/admin/vips/route.ts` |
| [x] | GET | `/api/admin/vips/[id]` | `web/src/app/api/admin/vips/[id]/route.ts` |
| [x] | POST | `/api/admin/vips` | `web/src/app/api/admin/vips/route.ts` |
| [x] | PUT | `/api/admin/vips/[id]` | `web/src/app/api/admin/vips/[id]/route.ts` |
| [x] | DELETE | `/api/admin/vips/[id]` | `web/src/app/api/admin/vips/[id]/route.ts` |
| [x] | POST | `/api/admin/vips/[id]/regenerate-token` | `web/src/app/api/admin/vips/[id]/regenerate-token/route.ts` |

#### 7.3 주문 관리 API
| 상태 | 메서드 | 경로 | 파일 |
|:----:|--------|------|------|
| [x] | GET | `/api/admin/orders` | `web/src/app/api/admin/orders/route.ts` |
| [x] | GET | `/api/admin/orders/[id]` | `web/src/app/api/admin/orders/[id]/route.ts` |
| [x] | PATCH | `/api/admin/orders/[id]` | `web/src/app/api/admin/orders/[id]/route.ts` |

#### 7.4 대시보드 API
| 상태 | 메서드 | 경로 | 파일 |
|:----:|--------|------|------|
| [x] | GET | `/api/admin/dashboard` | `web/src/app/api/admin/dashboard/route.ts` |

---

### 8. 데이터베이스 - 13/13 ✅

#### 8.1 테이블 존재 여부
| 상태 | 테이블 | 마이그레이션 |
|:----:|--------|-------------|
| [x] | admins | `001_initial_schema.sql` |
| [x] | vips | `001_initial_schema.sql` |
| [x] | categories | `001_initial_schema.sql` |
| [x] | products | `001_initial_schema.sql` |
| [x] | inventory | `001_initial_schema.sql` |
| [x] | orders | `001_initial_schema.sql` |
| [x] | order_items | `001_initial_schema.sql` |

#### 8.2 ENUM 타입
| 상태 | 타입 | 값 |
|:----:|------|-----|
| [x] | vip_tier | silver, gold |
| [x] | registration_type | email_invite, qr_code |
| [x] | order_status | pending, processing, shipped, delivered, cancelled |

#### 8.3 데이터베이스 함수
| 상태 | 함수 | 파일 |
|:----:|------|------|
| [x] | decrease_inventory_for_order() | `004_inventory_functions.sql` |
| [x] | restore_inventory_for_order() | `004_inventory_functions.sql` |
| [x] | check_inventory_availability() | `004_inventory_functions.sql` |

#### 8.4 RLS 정책
| 상태 | 정책 | 파일 |
|:----:|------|------|
| [x] | RLS 활성화 | `002_rls_policies.sql` |
| [x] | 테이블별 정책 정의 | `002_rls_policies.sql` |

---

### 9. 보안/인증 - 9/9 ✅

#### 9.1 VIP 인증
| 상태 | 항목 | 파일 |
|:----:|------|------|
| [x] | HttpOnly 쿠키 사용 | `web/src/lib/auth/vip-session.ts:47` |
| [x] | JWT 토큰 암호화 (HS256) | `web/src/lib/auth/vip-session.ts:39` |
| [x] | 7일 만료 설정 | `web/src/lib/auth/vip-session.ts:7` |

#### 9.2 관리자 인증
| 상태 | 항목 | 파일 |
|:----:|------|------|
| [x] | Supabase Auth 연동 | `web/src/lib/auth/admin-session.ts` |
| [x] | admins 테이블 권한 검증 | `web/src/lib/auth/admin-session.ts` |

#### 9.3 접근 제어
| 상태 | 항목 | 파일 |
|:----:|------|------|
| [x] | VIP 경로 보호 (/products, /checkout, /orders) | `web/src/proxy.ts:44-52` |
| [x] | Admin 경로 보호 (/admin/*) | `web/src/proxy.ts:27-38` |
| [x] | 홈에서 VIP 세션 있으면 /products 리다이렉트 | `web/src/proxy.ts:54-57` |
| [x] | 초대 페이지 예외 처리 | `web/src/proxy.ts:22-24` |

---

### 10. 테스트 - 6/6 ✅

#### 10.1 E2E 테스트 (Playwright)
| 상태 | 시나리오 | 파일 |
|:----:|----------|------|
| [x] | VIP 초대 플로우 | `web/tests/e2e/invite.spec.ts` (7 테스트) |
| [x] | 체크아웃 플로우 | `web/tests/e2e/checkout.spec.ts` (5 테스트) |
| [x] | 관리자 VIP 관리 | `web/tests/e2e/admin-vips.spec.ts` (10 테스트) |
| [x] | 관리자 주문 관리 | `web/tests/e2e/admin-orders.spec.ts` (10 테스트) |

#### 10.2 단위 테스트 (Vitest)
| 상태 | 대상 | 파일 |
|:----:|------|------|
| [x] | cartStore 테스트 | `web/tests/unit/cartStore.test.ts` (16 테스트) |
| [x] | API 유틸리티 테스트 | `web/tests/unit/api-utils.test.ts` (17 테스트) |

---

## Part 2: 향후 구현 체크리스트 (P3)

### 11. 상품 관리 - 관리자

| 상태 | 항목 | 설명 | 복잡도 |
|:----:|------|------|:------:|
| [ ] | 상품 목록 페이지 (`/admin/products`) | 관리자 상품 목록 조회, 검색, 필터링 | 중 |
| [ ] | 상품 생성 페이지 (`/admin/products/new`) | 새 상품 등록 (이미지 업로드 포함) | 상 |
| [ ] | 상품 수정 페이지 (`/admin/products/[id]/edit`) | 기존 상품 정보 편집 | 중 |
| [ ] | 상품 삭제 기능 | Soft/Hard Delete 지원 | 하 |
| [ ] | 상품 이미지 관리 | Supabase Storage 연동 | 중 |
| [ ] | 재고 수동 조정 | 관리자 재고 입력/수정 | 중 |
| [ ] | 카테고리 관리 CRUD | 카테고리 생성/수정/삭제 | 중 |

---

### 12. QR 코드 등록 시스템

| 상태 | 항목 | 설명 | 복잡도 |
|:----:|------|------|:------:|
| [ ] | QR 코드 생성 API | VIP별 QR 코드 생성 | 중 |
| [ ] | QR 코드 스캔 페이지 | 모바일 QR 스캔 UI | 중 |
| [ ] | QR 기반 VIP 인증 | 스캔 후 자동 세션 생성 | 중 |
| [ ] | QR 코드 다운로드/공유 | PDF, PNG 내보내기 | 하 |
| [ ] | QR 유효기간 관리 | 만료일 설정, 일회용 옵션 | 중 |

---

### 13. 활동 로그 시스템

| 상태 | 항목 | 설명 | 복잡도 |
|:----:|------|------|:------:|
| [ ] | VIP 접속 로그 | 로그인 시간, IP, 기기 정보 | 중 |
| [ ] | 장바구니 활동 로그 | 추가/삭제 이력 추적 | 중 |
| [ ] | 주문 상태 변경 로그 | 상태 변경 이력 타임라인 | 중 |
| [ ] | 관리자 활동 로그 | 관리자 작업 감사 로그 | 상 |
| [ ] | 로그 테이블 스키마 | `activity_logs` 테이블 마이그레이션 | 하 |
| [ ] | 로그 조회 API | 필터링, 페이지네이션 | 중 |
| [ ] | 로그 뷰어 UI | 관리자 로그 조회 화면 | 중 |

---

### 14. 분석 대시보드

| 상태 | 항목 | 설명 | 복잡도 |
|:----:|------|------|:------:|
| [ ] | VIP 가입 추이 차트 | 일별/월별 VIP 가입 그래프 | 중 |
| [ ] | 주문 통계 차트 | 일별/월별 주문 수 그래프 | 중 |
| [ ] | 인기 상품 순위 | 가장 많이 선택된 상품 TOP 10 | 중 |
| [ ] | 티어별 분포 차트 | Silver/Gold VIP 비율 파이 차트 | 하 |
| [ ] | 카테고리별 주문 분포 | 카테고리별 주문 통계 | 중 |
| [ ] | 차트 라이브러리 도입 | Recharts 또는 Chart.js 설정 | 하 |

---

### 15. 다국어 지원 (i18n)

| 상태 | 항목 | 설명 | 복잡도 |
|:----:|------|------|:------:|
| [ ] | i18n 라이브러리 설정 | next-intl 또는 i18next 도입 | 중 |
| [ ] | 한국어 번역 파일 | `locales/ko.json` | 하 |
| [ ] | 영어 번역 파일 | `locales/en.json` | 하 |
| [ ] | 일본어 번역 파일 | `locales/ja.json` | 하 |
| [ ] | 언어 선택 UI | 헤더/푸터 언어 스위처 | 하 |
| [ ] | URL 기반 라우팅 | `/en/products`, `/ko/products` | 중 |
| [ ] | 날짜/숫자 포맷팅 | 로케일별 포맷 적용 | 하 |

---

### 16. 알림 시스템

| 상태 | 항목 | 설명 | 복잡도 |
|:----:|------|------|:------:|
| [ ] | 이메일 알림 | VIP 초대, 주문 확인 이메일 | 상 |
| [ ] | 이메일 템플릿 | Resend/SendGrid 연동 | 중 |
| [ ] | 주문 상태 알림 | 배송 시작/완료 알림 | 중 |
| [ ] | 관리자 알림 | 신규 주문 알림 | 중 |

---

### 17. VIP 주문 이력 페이지

| 상태 | 항목 | 설명 | 복잡도 |
|:----:|------|------|:------:|
| [ ] | VIP 주문 목록 (`/orders`) | VIP 본인 주문 조회 | 중 |
| [ ] | VIP 주문 상세 (`/orders/[id]`) | 주문 상세 정보 및 배송 추적 | 중 |
| [ ] | 주문 취소 요청 | VIP 주문 취소 신청 기능 | 중 |

---

### 18. 기타 개선 사항

| 상태 | 항목 | 설명 | 복잡도 |
|:----:|------|------|:------:|
| [ ] | 검색 기능 개선 | 상품명/설명 전문 검색 | 중 |
| [ ] | 위시리스트 | VIP 관심 상품 저장 | 중 |
| [ ] | 최근 본 상품 | 최근 조회 상품 기록 | 하 |
| [ ] | 상품 공유 기능 | SNS 공유 버튼 | 하 |
| [ ] | 반응형 최적화 | 모바일 UX 개선 | 중 |
| [ ] | 다크 모드 | 시스템 테마 연동 | 중 |
| [ ] | PWA 지원 | 오프라인/홈 화면 추가 | 상 |

---

## 요약

### 현황 검증 항목 (P0-P2)

| 영역 | 완료/전체 | 상태 | 우선순위 |
|------|:---------:|:----:|:--------:|
| VIP 시스템 | 10/10 | ✅ | P0 |
| 관리자 기능 | 21/21 | ✅ | P0-P2 |
| 상품 관리 | 11/11 | ✅ | P0 |
| 장바구니 | 7/7 | ✅ | P0 |
| 주문 시스템 | 11/11 | ✅ | P0-P1 |
| 대시보드 | 5/5 | ✅ | P2 |
| API | 12/12 | ✅ | - |
| 데이터베이스 | 13/13 | ✅ | - |
| 보안/인증 | 9/9 | ✅ | - |
| 테스트 | 6/6 | ✅ | - |
| **소계** | **105/105** | **100%** | |

### 향후 구현 항목 (P3)

| 영역 | 항목 수 | 복잡도 |
|------|:-------:|:------:|
| 상품 관리 (관리자) | 7 | 중-상 |
| QR 코드 등록 | 5 | 중 |
| 활동 로그 | 7 | 중-상 |
| 분석 대시보드 | 6 | 중 |
| 다국어 지원 | 7 | 중 |
| 알림 시스템 | 4 | 중-상 |
| VIP 주문 이력 | 3 | 중 |
| 기타 개선 | 7 | 중-상 |
| **소계** | **46** | |

### 전체 합계

- **현황 검증**: 105/105개 완료 (100%)
- **향후 구현**: 0/46개 (0%)
- **총합**: **105/151개** (70%)

---

## 다음 단계 권장

### P3 구현 우선순위

1. **상품 관리 (관리자)** - 핵심 운영 기능
2. **VIP 주문 이력 페이지** - VIP UX 향상
3. **활동 로그 시스템** - 운영/감사 필수
4. **알림 시스템** - 사용자 참여 향상
5. **분석 대시보드** - 비즈니스 인사이트
6. **QR 코드 등록** - 오프라인 마케팅
7. **다국어 지원** - 글로벌 확장
8. **기타 개선** - UX 강화

---

## 검증 실행 방법

```powershell
# 1. 파일 존재 확인
ls web/src/app/invite/[token]/page.tsx

# 2. 빌드 테스트
cd web && npm run build

# 3. E2E 테스트
cd web && npx playwright test

# 4. 린트 검사
cd web && npm run lint
```
