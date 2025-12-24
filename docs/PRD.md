# GGP Heritage Mall - Product Requirements Document

**Version**: 1.2.0
**Date**: 2025-12-24
**Status**: In Progress
**Author**: Product Team

---

## 1. 개요

### 1.1 프로젝트 설명

GGP Heritage Mall은 VIP 고객만을 위한 프리미엄 이커머스 플랫폼입니다. 초대 기반(invite-only) 모델로 운영되며, 각 VIP는 고유한 초대 링크를 통해 접속하여 티어별로 차등화된 쇼핑 경험을 제공받습니다.

> **비즈니스 모델: VIP Complimentary (무료 증정)**
>
> 이 플랫폼은 일반적인 판매 모델이 아닌 **VIP 무료 증정** 모델입니다.
> - 상품에 가격이 없으며, 결제 시스템이 없습니다
> - VIP 티어별로 선택 가능한 상품 수만 제한됩니다
>   - Silver VIP: 최대 3개 상품
>   - Gold VIP: 최대 5개 상품
> - 배송비 무료

### 1.2 비즈니스 목표

| 목표 | 내용 |
|------|------|
| **배타성(Exclusivity)** | 초대 기반 VIP 시스템으로 럭셔리 브랜드 이미지 구축 |
| **맞춤형 서비스** | 티어(Silver/Gold)별 차등 혜택 제공 |
| **운영 효율성** | 관리자 대시보드를 통한 VIP 라이프사이클 관리 |
| **확장성** | QR 기반 등록, 다단계 승인 프로세스 지원 가능한 구조 |

### 1.3 타겟 사용자

**1차 사용자: VIP 고객**
- 초대 링크를 받은 고객
- 프리미엄 제품에 대한 구매력과 관심이 있는 사용자

**2차 사용자: 관리자**
- VIP 초대 및 관리 담당자
- 주문 및 재고 관리 담당자

---

## 2. 기능 요구사항

### 2.1 VIP 인증 시스템 [완료 ✅]

**우선순위**: P0 (Core)

#### 2.1.1 초대 링크 접속

**사용자 스토리**
> VIP 고객으로서 초대 링크(`/invite/[code]`)를 통해 별도의 회원가입 없이 즉시 쇼핑을 시작할 수 있다.

**기능 설명**
- 초대 코드(7자리 영숫자, 예: `VIP7K3M`)로 VIP 조회
- JWT 쿠키 기반 세션 생성 (유효 기간: 7일)
- 자동으로 `/products` 페이지로 리다이렉트

**초대 코드 형식**
| 항목 | 값 |
|------|-----|
| 형식 | `VIP` + 4자리 영숫자 |
| 길이 | 7자 |
| 예시 | `VIP7K3M`, `VIPXA9B` |
| 문자셋 | A-Z (I, O 제외), 2-9 (0, 1 제외) |

**구현 상태**
- ✅ `web/src/app/invite/[token]/page.tsx`
- ✅ `web/src/lib/api/vip.ts` - `getVipByCode()` 함수
- ✅ `web/src/lib/auth/vip-session.ts` - JWT 세션 관리
- ✅ `web/src/lib/invite-code.ts` - 코드 생성 유틸리티

#### 2.1.2 VIP 티어 시스템

**티어 정의**

| 티어 | 장바구니 제한 | 접근 가능 제품 |
|------|--------------|---------------|
| Silver | 3개 | Silver 이상 |
| Gold | 5개 | Silver + Gold |

**구현**
- ✅ `cartStore.ts` - `maxItems`, `canAddMore()` 로직
- ✅ Database: `vips.tier` (ENUM: silver, gold)

#### 2.1.3 에러 처리

**Invalid Invite 화면**

| 에러 유형 | 메시지 | UI |
|----------|--------|-----|
| `not_found` | 초대 코드가 존재하지 않음 | `InvalidInvite` 컴포넌트 |
| `inactive` | 비활성화된 VIP | 동일 |
| `database_error` | 서버 오류 | 동일 |

---

### 2.2 관리자 기능 [핵심 - 미구현 🔴]

**우선순위**: P0 (Core)

#### 2.2.1 관리자 인증

**사용자 스토리**
> 관리자로서 별도의 관리자 페이지(`/admin`)에 로그인하여 VIP 및 주문을 관리할 수 있다.

**기능 설명**
- Supabase Auth를 사용한 관리자 계정 로그인
- `admins` 테이블에 등록된 사용자만 접근 가능
- 세션 유지 및 권한 검증

**API 명세**

```typescript
// POST /api/admin/auth/login
Request: { email: string; password: string }
Response: { success: true; admin: { id, email, name } }
         | { success: false; error: string }
```

**데이터베이스**
```sql
-- admins 테이블 (이미 존재)
CREATE TABLE admins (
    id UUID PRIMARY KEY,
    user_id UUID UNIQUE NOT NULL,  -- Supabase Auth 연동
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

#### 2.2.2 VIP 목록 화면

**경로**: `/admin/vips`

**사용자 스토리**
> 관리자로서 등록된 모든 VIP의 목록을 확인하고, 각 VIP의 상태를 한눈에 파악할 수 있다.

**UI 요구사항**

**테이블 컬럼**

| 컬럼 | 표시 내용 | 기능 |
|------|----------|------|
| Email | vip.email | 정렬 가능 |
| Name | vip.name | - |
| Tier | Silver/Gold | 배지 컴포넌트 |
| Status | Active/Inactive | 토글 가능 |
| Created | YYYY-MM-DD | 정렬 가능 |
| Actions | Edit, Delete | 아이콘 버튼 |

**필터/검색**
- 이메일로 검색
- 티어별 필터 (All / Silver / Gold)
- 상태별 필터 (Active / Inactive)

**페이지네이션**
- 페이지당 20개 항목
- 총 VIP 수 표시

**API 명세**

```typescript
// GET /api/admin/vips
Query: { page?: number; limit?: number; tier?: 'silver'|'gold'; search?: string }
Response: {
  vips: Array<{
    id: string;
    email: string;
    name: string;
    tier: 'silver' | 'gold';
    is_active: boolean;
    created_at: string;
    invite_code: string;
  }>;
  total: number;
  page: number;
  limit: number;
}
```

---

#### 2.2.3 VIP 생성 화면 (초대 링크 발행)

**경로**: `/admin/vips/new`

**우선순위**: P0

**사용자 스토리**
> 관리자로서 신규 VIP를 등록하고, 고유한 초대 링크를 생성하여 이메일로 전송할 수 있다.

**UI 요구사항**

**입력 폼**

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| Email | text | ✅ | VIP 이메일 (unique) |
| Name | text | ⚠️ | VIP 이름 (선택) |
| Tier | select | ✅ | Silver / Gold |
| Registration Type | select | ✅ | Email Invite / QR Code |

**생성 후 동작**
1. `invite_code` (UUID) 자동 생성
2. 초대 링크 표시: `https://ggp-mall.com/invite/{token}`
3. 클립보드 복사 버튼
4. 이메일 전송 버튼 (선택)

**유효성 검사**
- 이메일 중복 체크
- 이메일 형식 검증 (정규식)

**API 명세**

```typescript
// POST /api/admin/vips
Request: {
  email: string;
  name?: string;
  tier: 'silver' | 'gold';
  reg_type: 'email_invite' | 'qr_code';
}
Response: {
  success: true;
  vip: {
    id: string;
    email: string;
    name: string;
    tier: string;
    invite_code: string;
    invite_url: string;  // 전체 URL
  }
} | { success: false; error: string; details?: string }
```

**데이터베이스**
```sql
-- invite_code는 애플리케이션에서 generateUniqueInviteCode()로 생성
INSERT INTO vips (email, name, tier, reg_type, invite_code, is_active)
VALUES ($1, $2, $3, $4, $5, true)  -- $5: 7자리 코드 (예: VIP7K3M)
RETURNING *;
```

---

#### 2.2.4 VIP 수정 화면

**경로**: `/admin/vips/[id]/edit`

**우선순위**: P1

**사용자 스토리**
> 관리자로서 기존 VIP의 정보를 수정하고, 필요시 초대 코드을 재발급할 수 있다.

**UI 요구사항**

**편집 가능 필드**

| 필드 | 수정 가능 | 설명 |
|------|----------|------|
| Email | ✅ | 이메일 변경 |
| Name | ✅ | 이름 변경 |
| Tier | ✅ | 티어 업그레이드/다운그레이드 |
| Status | ✅ | Active/Inactive 토글 |
| Invite Token | ❌ (재발급만 가능) | 재발급 버튼 제공 |

**특수 기능**
- **토큰 재발급**: 기존 토큰 무효화 → 새 UUID 생성
  - 사용 케이스: 보안상 토큰 유출 시
  - 확인 모달: "기존 초대 링크가 무효화됩니다. 계속하시겠습니까?"

**API 명세**

```typescript
// PUT /api/admin/vips/[id]
Request: {
  email?: string;
  name?: string;
  tier?: 'silver' | 'gold';
  is_active?: boolean;
}
Response: { success: true; vip: VipRecord } | { success: false; error: string }

// POST /api/admin/vips/[id]/regenerate-token
Response: { success: true; new_token: string; invite_url: string }
```

---

#### 2.2.5 VIP 삭제/비활성화

**우선순위**: P1

**사용자 스토리**
> 관리자로서 VIP를 삭제하거나 일시적으로 비활성화하여 접근을 차단할 수 있다.

**동작 방식**

| 작업 | 동작 | 복구 가능 여부 |
|------|------|---------------|
| **Soft Delete** (권장) | `is_active = false` | ✅ 가능 |
| **Hard Delete** | DB에서 완전 삭제 | ❌ 불가능 |

**UI 요구사항**
- VIP 목록에서 "Delete" 버튼 클릭
- 확인 모달:
  ```
  [VIP 이름 / 이메일]을 삭제하시겠습니까?

  [ ] 완전 삭제 (복구 불가능)
  [Cancel] [Deactivate]
  ```

**제약 조건**
- 주문이 있는 VIP는 Hard Delete 불가 (FK 제약)
  - 에러 메시지: "이 VIP는 주문 내역이 있어 완전 삭제할 수 없습니다."
  - 대안: Soft Delete만 허용

**API 명세**

```typescript
// DELETE /api/admin/vips/[id]
Query: { hard?: boolean }  // default: false (soft delete)
Response: { success: true } | { success: false; error: string; reason?: string }
```

**데이터베이스**
```sql
-- Soft Delete
UPDATE vips SET is_active = false WHERE id = $1;

-- Hard Delete (주문 없을 때만)
DELETE FROM vips WHERE id = $1;
-- FK 제약: orders.vip_id REFERENCES vips(id) ON DELETE RESTRICT
```

---

#### 2.2.6 VIP 상세 보기

**경로**: `/admin/vips/[id]`

**우선순위**: P2

**사용자 스토리**
> 관리자로서 VIP의 상세 정보와 주문 이력을 한 화면에서 확인할 수 있다.

**표시 정보**

**1) VIP 기본 정보**
- Email, Name, Tier (배지)
- 등록일, 최종 접속일 (세션 로그 필요 시)
- 초대 링크 (복사 버튼)

**2) 주문 이력**
- 주문 번호, 날짜, 상태, 주문 금액 (계산 필요)
- 클릭 시 주문 상세로 이동

**3) 활동 로그 (선택적)**
- 초대 링크 접속 시간
- 장바구니 추가/삭제
- 주문 생성

---

### 2.3 상품 관리 [완료 ✅]

**우선순위**: P0

#### 2.3.1 상품 목록

**경로**: `/products`

**기능**
- ✅ 카테고리별 필터링
- ✅ 티어별 접근 제어 (VIP 세션 기반)
- ✅ 상품 이미지, 이름, 카테고리 표시

**구현**
- `web/src/app/products/page.tsx` (Server Component)
- `web/src/app/products/products-client.tsx` (Client Component)
- `web/src/lib/api/products.ts` - `getProducts()`, `getCategories()`

#### 2.3.2 상품 상세

**경로**: `/products/[id]`

**기능**
- ✅ 상품 이미지 갤러리 (Framer Motion)
- ✅ 사이즈 선택
- ✅ 재고 확인 (`inventory` 테이블)
- ✅ 장바구니 추가 (VIP 티어 제한 적용)

**구현**
- `web/src/app/products/[id]/page.tsx`
- `web/src/components/products/ProductDetail.tsx`

#### 2.3.3 재고 관리

**데이터베이스**
```sql
-- inventory 테이블
CREATE TABLE inventory (
    id UUID PRIMARY KEY,
    product_id UUID REFERENCES products(id),
    size VARCHAR(20),
    quantity INTEGER CHECK (quantity >= 0),
    UNIQUE(product_id, size)
);
```

**재고 차감 로직** (미구현)
- 주문 생성 시 `inventory.quantity` 감소
- 동시성 제어 필요 (트랜잭션)

---

### 2.4 장바구니 [완료 ✅]

**우선순위**: P0

#### 2.4.1 상태 관리

**기술 스택**
- ✅ Zustand (클라이언트 상태)
- ✅ localStorage 영속성 (`persist` 미들웨어)

**기능**
- ✅ `addItem()` - 티어 제한 검증
- ✅ `removeItem()` - 개별 삭제
- ✅ `updateItemSize()` - 사이즈 변경
- ✅ `clearCart()` - 주문 완료 후

**데이터 구조**
```typescript
interface CartItem {
  productId: string;
  productName: string;
  category: string;
  size: string;
  image?: string;
}
```

#### 2.4.2 티어 제한

| 티어 | maxItems | 동작 |
|------|----------|------|
| Silver | 3 | `canAddMore()` false 시 추가 차단 |
| Gold | 5 | 동일 |

---

### 2.5 주문 시스템 [완료 ✅]

**우선순위**: P0

> **비즈니스 모델**: VIP Complimentary (무료 증정)
>
> 이 쇼핑몰은 VIP 고객에게 상품을 **무료 증정**하는 모델입니다.
> 결제 시스템이 없으며, 티어별 수량 제한만 적용됩니다.
> - Silver VIP: 최대 3개 상품
> - Gold VIP: 최대 5개 상품

#### 2.5.1 체크아웃 페이지 [완료 ✅]

**경로**: `/checkout`

**기능**
- ✅ 배송 주소 입력 폼
- ✅ 주문 요약 (OrderSummary 컴포넌트)
- ✅ VIP 세션에서 기본 배송지 불러오기 (Mock 데이터)
- ✅ "VIP Complimentary" 표시 (무료 증정)
- ✅ "Free Shipping" 표시 (무료 배송)

**구현**
- `web/src/app/checkout/page.tsx`
- `web/src/components/checkout/ShippingForm.tsx`
- `web/src/components/checkout/OrderSummary.tsx`

#### 2.5.2 주문 생성 [완료 ✅]

**Server Action**
- ✅ `web/src/app/checkout/actions.ts` - `createOrderAction()`
- ✅ `web/src/lib/api/orders.ts` - `createOrder()`

**데이터 구조**
```typescript
interface CreateOrderInput {
  items: Array<{ product_id: string; size: string; quantity: number }>;
  shipping_address: {
    recipient_name: string;
    phone: string;
    address_line1: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  notes?: string;
}
```

**데이터베이스**
```sql
-- orders 테이블
INSERT INTO orders (vip_id, status, shipping_address, notes)
VALUES ($1, 'pending', $2::jsonb, $3);

-- order_items 테이블
INSERT INTO order_items (order_id, product_id, size, quantity)
VALUES ...;
```

#### 2.5.3 재고 차감 [완료 ✅]

**구현**
- ✅ PostgreSQL 함수 `create_order_with_inventory` - 원자적 트랜잭션
- ✅ 재고 검증 `validateInventory()` - 주문 전 사전 체크
- ✅ 재고 복원 `restore_inventory_for_order` - 주문 취소 시

**주문 플로우**
```
상품 선택 → 장바구니 → 배송지 입력 → 주문 완료 (재고 차감)
                                        ↓
                              ❌ 결제 단계 없음 (무료 증정)
```

#### 2.5.4 결제 시스템 [해당 없음 ⬜]

> **Note**: VIP Complimentary 모델로 결제 시스템이 필요하지 않습니다.
> - 상품에 가격 필드 없음
> - 결제 게이트웨이 연동 불필요
> - 향후 유료 판매 모델로 전환 시 별도 구현 필요

---

## 3. 관리자 페이지 상세 설계

### 3.1 페이지 구조

```
/admin
├── /auth/login          # 관리자 로그인
├── /dashboard           # 대시보드 (통계)
├── /vips                # VIP 목록
│   ├── /new             # VIP 생성
│   ├── /[id]            # VIP 상세
│   └── /[id]/edit       # VIP 수정
├── /orders              # 주문 목록
│   └── /[id]            # 주문 상세
└── /products            # 상품 관리 (향후)
```

---

### 3.2 화면별 상세 명세

#### 3.2.1 VIP 목록 화면 (`/admin/vips`)

**레이아웃**

```
┌─────────────────────────────────────────────────────────────┐
│ GGP Heritage Mall - Admin                        [Logout]    │
├─────────────────────────────────────────────────────────────┤
│ VIP 관리                                     [+ New VIP]     │
├─────────────────────────────────────────────────────────────┤
│ Search: [___________]  Tier: [All▼]  Status: [All▼]         │
├─────────────────────────────────────────────────────────────┤
│ Email             │ Name    │ Tier   │ Status │ Created     │
├─────────────────────────────────────────────────────────────┤
│ john@example.com  │ John    │ Gold   │ Active │ 2025-12-01  │
│ jane@example.com  │ Jane    │ Silver │ Active │ 2025-12-05  │
│ ...                                                           │
├─────────────────────────────────────────────────────────────┤
│ Showing 1-20 of 150        [< Prev]  [1] [2] [3]  [Next >]  │
└─────────────────────────────────────────────────────────────┘
```

**컴포넌트 구조**
```tsx
<AdminLayout>
  <VipsPageHeader>
    <SearchBar />
    <FilterDropdowns />
    <NewVipButton />
  </VipsPageHeader>

  <VipsTable>
    <VipRow />  // 각 행에 Edit, Delete 버튼
  </VipsTable>

  <Pagination />
</AdminLayout>
```

---

#### 3.2.2 VIP 생성 화면 (`/admin/vips/new`)

**레이아웃**

```
┌─────────────────────────────────────────────────────────────┐
│ 새 VIP 추가                                                  │
├─────────────────────────────────────────────────────────────┤
│ Email *                                                      │
│ [_______________________]                                    │
│                                                              │
│ Name                                                         │
│ [_______________________]                                    │
│                                                              │
│ Tier *                                                       │
│ ( ) Silver  (•) Gold                                         │
│                                                              │
│ Registration Type *                                          │
│ (•) Email Invite  ( ) QR Code                               │
│                                                              │
│                          [Cancel]  [Create VIP]              │
└─────────────────────────────────────────────────────────────┘
```

**생성 성공 시 모달**

```
┌─────────────────────────────────────────────────────────────┐
│ VIP 생성 완료                                       [✕]      │
├─────────────────────────────────────────────────────────────┤
│ 초대 링크가 생성되었습니다:                                  │
│                                                              │
│ https://ggp-mall.com/invite/f47ac10b-58cc-4372-a567-...      │
│                                                              │
│                    [Copy Link]  [Send Email]                 │
└─────────────────────────────────────────────────────────────┘
```

**컴포넌트**
```tsx
<VipForm mode="create" onSubmit={handleCreate}>
  <Input name="email" required />
  <Input name="name" />
  <RadioGroup name="tier" options={['silver', 'gold']} />
  <RadioGroup name="reg_type" options={['email_invite', 'qr_code']} />
  <FormActions>
    <CancelButton />
    <SubmitButton />
  </FormActions>
</VipForm>

<InviteLinkModal isOpen={showModal} inviteUrl={generatedUrl}>
  <CopyButton />
  <SendEmailButton />
</InviteLinkModal>
```

---

#### 3.2.3 VIP 수정 화면 (`/admin/vips/[id]/edit`)

**레이아웃**

```
┌─────────────────────────────────────────────────────────────┐
│ VIP 정보 수정 - john@example.com                            │
├─────────────────────────────────────────────────────────────┤
│ Email *                                                      │
│ [john@example.com________]                                   │
│                                                              │
│ Name                                                         │
│ [John Smith____________]                                     │
│                                                              │
│ Tier *                                                       │
│ ( ) Silver  (•) Gold                                         │
│                                                              │
│ Status                                                       │
│ [✓] Active                                                   │
│                                                              │
│ Invite Token                                                 │
│ f47ac10b-58cc-4372-a567-...  [Regenerate Token]              │
│                                                              │
│                          [Cancel]  [Save Changes]            │
└─────────────────────────────────────────────────────────────┘
```

**토큰 재발급 확인 모달**

```
┌─────────────────────────────────────────────────────────────┐
│ 초대 코드 재발급                                    [✕]      │
├─────────────────────────────────────────────────────────────┤
│ 기존 초대 링크가 무효화됩니다.                               │
│ 새 링크를 VIP에게 다시 전송해야 합니다.                     │
│                                                              │
│                          [Cancel]  [Regenerate]              │
└─────────────────────────────────────────────────────────────┘
```

---

#### 3.2.4 VIP 삭제 확인 모달

```
┌─────────────────────────────────────────────────────────────┐
│ VIP 삭제                                            [✕]      │
├─────────────────────────────────────────────────────────────┤
│ John Smith (john@example.com)을(를) 삭제하시겠습니까?       │
│                                                              │
│ [✓] 완전 삭제 (복구 불가능)                                 │
│                                                              │
│ ⚠️ 이 VIP는 2건의 주문이 있어 완전 삭제할 수 없습니다.       │
│                                                              │
│                          [Cancel]  [Deactivate Only]         │
└─────────────────────────────────────────────────────────────┘
```

**에러 케이스**
- 주문 있을 때: Hard Delete 버튼 비활성화
- Soft Delete만 허용

---

### 3.3 UI 컴포넌트 라이브러리

**사용 기술**
- Tailwind CSS 4
- Radix UI (모달, 드롭다운)
- CVA (Component Variants)
- Lucide Icons

**재사용 컴포넌트**

| 컴포넌트 | 용도 | 파일 |
|---------|------|------|
| `Button` | 모든 버튼 | `components/ui/Button.tsx` |
| `Input` | 텍스트 입력 | `components/ui/Input.tsx` |
| `Badge` | 티어, 상태 표시 | `components/ui/Badge.tsx` |
| `Modal` | 확인 다이얼로그 | `components/ui/Modal.tsx` |
| `Table` | VIP/주문 목록 | `components/ui/Table.tsx` |

---

## 4. API 명세

### 4.1 Admin API

**Base URL**: `/api/admin`

**인증**: JWT (쿠키)
- 모든 요청에 `Authorization: Bearer {token}` 또는 쿠키 세션 필요
- 미인증 시 `401 Unauthorized`

---

#### 4.1.1 VIP 관리 API

**1) VIP 목록 조회**

```typescript
GET /api/admin/vips

Query Parameters:
  - page: number (default: 1)
  - limit: number (default: 20)
  - tier: 'silver' | 'gold' | undefined
  - is_active: boolean | undefined
  - search: string (이메일 검색)

Response 200:
{
  vips: Array<{
    id: string;
    email: string;
    name: string;
    tier: 'silver' | 'gold';
    is_active: boolean;
    created_at: string;
    invite_code: string;
  }>;
  total: number;
  page: number;
  limit: number;
}

Error 401:
{ error: 'Unauthorized' }
```

---

**2) VIP 단일 조회**

```typescript
GET /api/admin/vips/[id]

Response 200:
{
  vip: {
    id: string;
    email: string;
    name: string;
    tier: 'silver' | 'gold';
    reg_type: 'email_invite' | 'qr_code';
    invite_code: string;
    shipping_address: object | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  };
  orders: Array<{
    id: string;
    status: string;
    created_at: string;
    total_items: number;
  }>;
}

Error 404:
{ error: 'VIP not found' }
```

---

**3) VIP 생성**

```typescript
POST /api/admin/vips

Request Body:
{
  email: string;            // required, unique
  name?: string;
  tier: 'silver' | 'gold';  // required
  reg_type: 'email_invite' | 'qr_code';
}

Response 201:
{
  success: true;
  vip: {
    id: string;
    email: string;
    name: string;
    tier: string;
    invite_code: string;
    invite_url: string;  // https://ggp-mall.com/invite/{token}
  }
}

Error 400:
{
  success: false;
  error: 'validation_error';
  details: 'Email already exists';
}

Error 500:
{
  success: false;
  error: 'database_error';
  details: string;
}
```

---

**4) VIP 수정**

```typescript
PUT /api/admin/vips/[id]

Request Body:
{
  email?: string;
  name?: string;
  tier?: 'silver' | 'gold';
  is_active?: boolean;
}

Response 200:
{
  success: true;
  vip: VipRecord;
}

Error 404:
{ success: false; error: 'not_found' }

Error 400:
{ success: false; error: 'validation_error'; details: string }
```

---

**5) 초대 코드 재발급**

```typescript
POST /api/admin/vips/[id]/regenerate-token

Response 200:
{
  success: true;
  new_token: string;
  invite_url: string;
}

Error 404:
{ success: false; error: 'not_found' }
```

---

**6) VIP 삭제**

```typescript
DELETE /api/admin/vips/[id]

Query Parameters:
  - hard: boolean (default: false)
    - true: 완전 삭제 (DB에서 제거)
    - false: Soft delete (is_active = false)

Response 200:
{ success: true }

Error 400 (주문 있을 때 Hard Delete 시도):
{
  success: false;
  error: 'cannot_delete';
  reason: 'VIP has existing orders';
}

Error 404:
{ success: false; error: 'not_found' }
```

---

### 4.2 주문 API (관리자용)

**1) 주문 목록 조회**

```typescript
GET /api/admin/orders

Query Parameters:
  - page: number
  - limit: number
  - status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  - vip_id: string (특정 VIP 주문만)

Response 200:
{
  orders: Array<{
    id: string;
    vip: { id: string; name: string; email: string };
    status: string;
    total_items: number;
    created_at: string;
  }>;
  total: number;
}
```

---

**2) 주문 상세 조회**

```typescript
GET /api/admin/orders/[id]

Response 200:
{
  order: {
    id: string;
    vip_id: string;
    status: string;
    shipping_address: object;
    tracking_number: string | null;
    carrier: string | null;
    notes: string | null;
    created_at: string;
    updated_at: string;
  };
  items: Array<{
    product_id: string;
    product_name: string;
    size: string;
    quantity: number;
  }>;
  vip: { name: string; email: string; tier: string };
}
```

---

**3) 주문 상태 업데이트**

```typescript
PATCH /api/admin/orders/[id]

Request Body:
{
  status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  tracking_number?: string;
  carrier?: string;
}

Response 200:
{ success: true; order: OrderRecord }
```

---

## 5. 데이터베이스 스키마

### 5.1 전체 ERD

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│   admins     │       │     vips     │       │  categories  │
├──────────────┤       ├──────────────┤       ├──────────────┤
│ id (PK)      │       │ id (PK)      │       │ id (PK)      │
│ user_id (UK) │       │ email (UK)   │       │ name         │
│ email        │       │ name         │       │ slug (UK)    │
│ is_active    │       │ tier         │       └──────────────┘
└──────────────┘       │ invite_code │              │
                       │ is_active    │              │
                       │ reg_type     │              │
                       └──────┬───────┘              │
                              │                      │
                              │ 1                    │ 1
                              │                      │
                              │ N                    │ N
                       ┌──────┴───────┐       ┌──────┴───────┐
                       │   orders     │       │  products    │
                       ├──────────────┤       ├──────────────┤
                       │ id (PK)      │       │ id (PK)      │
                       │ vip_id (FK)  │       │ name         │
                       │ status       │       │ category_id  │
                       │ shipping_*   │       │ tier_required│
                       └──────┬───────┘       │ images[]     │
                              │               └──────┬───────┘
                              │ 1                    │
                              │                      │ 1
                              │ N                    │ N
                       ┌──────┴───────┐       ┌──────┴───────┐
                       │ order_items  │       │  inventory   │
                       ├──────────────┤       ├──────────────┤
                       │ id (PK)      │       │ id (PK)      │
                       │ order_id (FK)│       │ product_id   │
                       │ product_id   │       │ size         │
                       │ size         │       │ quantity     │
                       │ quantity     │       └──────────────┘
                       └──────────────┘
```

---

### 5.2 테이블 상세

#### 5.2.1 `vips` 테이블

```sql
CREATE TABLE vips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    tier vip_tier NOT NULL DEFAULT 'silver',  -- ENUM: silver, gold
    reg_type registration_type NOT NULL DEFAULT 'email_invite',
    invite_code VARCHAR(8) UNIQUE NOT NULL,  -- 7자리 초대 코드 (예: VIP7K3M)
    shipping_address JSONB,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_vips_email ON vips(email);
CREATE INDEX idx_vips_invite_code ON vips(invite_code);
CREATE INDEX idx_vips_tier ON vips(tier);
```

**컬럼 설명**

| 컬럼 | 타입 | 설명 |
|------|------|------|
| `invite_code` | UUID | 초대 링크용 고유 토큰 |
| `tier` | ENUM | VIP 등급 (silver=3개, gold=5개) |
| `reg_type` | ENUM | 등록 방식 (email_invite, qr_code) |
| `is_active` | BOOLEAN | 활성 상태 (Soft Delete용) |

---

#### 5.2.2 `admins` 테이블

```sql
CREATE TABLE admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL,  -- Supabase Auth.users.id
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**인증 플로우**
1. Supabase Auth로 로그인 → `user_id` 획득
2. `admins` 테이블에서 `user_id` 조회
3. `is_active = true`인 경우에만 관리자 페이지 접근 허용

---

#### 5.2.3 `orders` 테이블

```sql
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vip_id UUID NOT NULL REFERENCES vips(id) ON DELETE RESTRICT,
    status order_status NOT NULL DEFAULT 'pending',
    shipping_address JSONB NOT NULL,
    tracking_number VARCHAR(100),
    carrier VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_orders_vip_id ON orders(vip_id);
CREATE INDEX idx_orders_status ON orders(status);
```

**FK 제약**
- `ON DELETE RESTRICT`: VIP 삭제 시 주문이 있으면 삭제 불가
- Hard Delete 방지 메커니즘

---

#### 5.2.4 `order_items` 테이블

```sql
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    size VARCHAR(20) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
```

---

#### 5.2.5 `products` 테이블

```sql
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    tier_required vip_tier NOT NULL DEFAULT 'silver',
    images TEXT[] NOT NULL DEFAULT '{}',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_tier_required ON products(tier_required);
```

**티어 접근 제어**
- `tier_required = 'gold'`: Gold VIP만 구매 가능
- `tier_required = 'silver'`: Silver, Gold 모두 가능

---

#### 5.2.6 `inventory` 테이블

```sql
CREATE TABLE inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    size VARCHAR(20) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(product_id, size)
);

CREATE INDEX idx_inventory_product_id ON inventory(product_id);
```

**재고 차감 로직** (미구현)
```sql
-- 주문 생성 시
BEGIN;
UPDATE inventory
SET quantity = quantity - 1
WHERE product_id = $1 AND size = $2 AND quantity > 0;

INSERT INTO order_items (...);
COMMIT;
```

---

### 5.3 Row Level Security (RLS)

**현재 상태**
- `supabase/migrations/002_rls_policies.sql`에 정의됨
- Admin 클라이언트는 RLS 우회 (`service_role` 키 사용)

**VIP용 RLS 정책** (예시)
```sql
-- VIPs는 본인 정보만 조회 가능 (향후 필요 시)
CREATE POLICY vips_select_own
ON vips FOR SELECT
USING (auth.uid()::text = user_id::text);

-- Admin은 모든 VIP 조회 가능
CREATE POLICY admin_select_all_vips
ON vips FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admins
    WHERE user_id = auth.uid() AND is_active = true
  )
);
```

---

## 6. 기술 스택

### 6.1 프론트엔드

| 기술 | 버전 | 용도 |
|------|------|------|
| Next.js | 16 | App Router, RSC, Server Actions |
| React | 19 | UI 라이브러리 |
| TypeScript | 5.x | 타입 안정성 |
| Tailwind CSS | 4 | 스타일링 |
| Framer Motion | - | 애니메이션 (상품 갤러리) |
| Zustand | - | 클라이언트 상태 관리 (장바구니) |
| Radix UI | - | Headless UI 컴포넌트 |
| CVA | - | 컴포넌트 Variant 관리 |
| Lucide Icons | - | 아이콘 |

---

### 6.2 디자인 시스템 (v1.2.0)

> **Note**: stitch 프로젝트 기반 디자인 개선 (2025-12-24)

#### 6.2.1 테마 모드

| 항목 | 값 |
|------|-----|
| 모드 | 라이트 모드 (Light Mode) |
| 배경색 | `#FAFAFA` |
| 표면색 | `#FFFFFF` |
| 텍스트 | `#0A0A0A` (주), `#333333` (부), `#666666` (뮤트) |

#### 6.2.2 골드 팔레트

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--color-gold` | `#C5A059` | 주요 악센트 |
| `--color-gold-light` | `#E0C895` | 호버, 하이라이트 |
| `--color-gold-dark` | `#947638` | 강조, 포커스 |

#### 6.2.3 Shadow 시스템

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--shadow-glow` | `0 0 100px -20px rgba(197, 160, 89, 0.15)` | 골드 글로우 |
| `--shadow-sharp` | `0 0 0 1px rgba(0,0,0,0.03), 0 30px 60px -15px rgba(0,0,0,0.08)` | 선명한 그림자 |
| `--shadow-elegant` | `0 2px 15px rgba(0,0,0,0.02)` | 부드러운 그림자 |
| `--shadow-pristine` | `0 20px 40px -10px rgba(0, 0, 0, 0.05)` | 카드 그림자 |

#### 6.2.4 Letter Spacing

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--tracking-widest-xl` | `0.25em` | 대문자 헤딩 |
| `--tracking-widest-2xl` | `0.35em` | 브랜드 로고 |
| `--tracking-widest-luxury` | `0.2em` | 럭셔리 라벨 |

#### 6.2.5 UI 패턴

**1) Floating Label Input**
- 라벨이 입력 시 위로 이동
- 하단 underline 애니메이션
- 포커스 시 골드 색상 전환

**2) Card Hover Effects**
- `-translate-y-1` 들어올림
- 상단 테두리 `scale-x-0 → scale-x-100` 애니메이션
- `shadow-pristine` 호버 시 적용

**3) Button Shine Effect**
- `::before` pseudo-element로 빛 이동 효과
- `luxury` variant: 검정 배경, 대문자, wide tracking

**4) Custom Scrollbar**
- 너비: 6px
- 기본: `#d4d4d4`
- 호버: `#C5A059` (골드)

#### 6.2.6 Typography

| 용도 | 폰트 | 웨이트 |
|------|------|--------|
| 헤딩 | Playfair Display | 400-700 |
| 본문 | Inter | 300-600 |

---

### 6.3 백엔드

| 기술 | 용도 |
|------|------|
| Supabase | PostgreSQL 호스팅, Auth, RLS |
| PostgreSQL | 관계형 데이터베이스 |
| Next.js API Routes | RESTful API 엔드포인트 |
| Server Actions | 서버 로직 (주문 생성 등) |

**Supabase 클라이언트 구성**

| 파일 | 용도 | 키 타입 |
|------|------|---------|
| `client.ts` | 브라우저 클라이언트 | `anon` key |
| `server.ts` | Server Components/Actions | `anon` key |
| `admin.ts` | 관리자 작업 (RLS 우회) | `service_role` key |

---

### 6.4 인증

**VIP 인증**
- JWT 기반 쿠키 세션
- 유효 기간: 7일
- `lib/auth/vip-session.ts`에서 관리

**관리자 인증**
- Supabase Auth (email/password)
- `admins` 테이블과 연동
- RLS 정책으로 권한 제어

---

### 6.5 개발 도구

| 도구 | 용도 |
|------|------|
| ESLint | 코드 린팅 |
| Prettier | 코드 포맷팅 |
| Vitest | 단위 테스트 |
| Testing Library | React 컴포넌트 테스트 |

---

## 7. 마일스톤

### Phase 1: 관리자 VIP 관리 기능 (P0) [완료 ✅]

**Week 1**
- [x] 관리자 인증 시스템
  - [x] `/admin/auth/login` 페이지
  - [x] `POST /api/admin/auth/login` API
  - [x] 세션 미들웨어 (권한 검증)
- [x] VIP 목록 화면
  - [x] `GET /api/admin/vips` API
  - [x] `/admin/vips` 페이지 (테이블, 필터, 검색)
  - [x] 페이지네이션

**Week 2**
- [x] VIP 생성 기능
  - [x] `POST /api/admin/vips` API
  - [x] `/admin/vips/new` 페이지
  - [x] 초대 링크 모달 (복사)
- [x] VIP 수정 기능
  - [x] `PUT /api/admin/vips/[id]` API
  - [x] `/admin/vips/[id]/edit` 페이지
  - [x] 토큰 재발급 API
- [x] VIP 삭제 기능
  - [x] `DELETE /api/admin/vips/[id]` API
  - [x] Soft/Hard Delete 로직
  - [x] 주문 존재 검증

---

### Phase 2: 주문 관리 (P1) [완료 ✅]

**Week 3**
- [x] 주문 목록 화면
  - [x] `GET /api/admin/orders` API
  - [x] `/admin/orders` 페이지
  - [x] 주문 상태 필터
- [x] 주문 상세 화면
  - [x] `GET /api/admin/orders/[id]` API
  - [x] `/admin/orders/[id]` 페이지
  - [x] 배송 정보 표시

**Week 4**
- [x] 재고 차감 로직
  - [x] 주문 생성 시 트랜잭션 (`create_order_with_inventory`)
  - [x] 재고 부족 시 에러 처리
  - [x] 주문 취소 시 재고 복원 (`restore_inventory_for_order`)

> **Note**: 결제 게이트웨이는 VIP Complimentary 모델로 해당 없음

---

### Phase 3: 대시보드 및 분석 (P2) [완료 ✅]

**Week 5**
- [x] 관리자 대시보드
  - [x] 총 VIP 수, 활성 VIP
  - [x] 총 주문 수
  - [x] 최근 VIP / 최근 주문 표시
- [x] VIP 상세 페이지
  - [x] `/admin/vips/[id]` (기본 정보 + 주문 이력)

> **Note**: 매출 통계는 VIP Complimentary 모델로 해당 없음

---

### Phase 4: 상품 관리 (P2) - 추후

- [ ] 상품 CRUD
  - [ ] `POST /api/admin/products`
  - [ ] `PUT /api/admin/products/[id]`
  - [ ] `DELETE /api/admin/products/[id]`
- [ ] 재고 관리 UI
  - [ ] 사이즈별 재고 조정
  - [ ] 재고 알림

---

### Phase 5: 디자인 시스템 개선 (P1) [진행 중 🟡]

> **참조**: stitch 프로젝트 (`D:\AI\claude01\ggp_heritage_mall\stitch`)

**목표**: 다크 모드 → 라이트 모드 전환, 럭셔리 UI 패턴 적용

**Week N**
- [ ] 디자인 토큰 업데이트
  - [ ] `globals.css` 색상 팔레트 변경 (#FAFAFA 배경, #C5A059 골드)
  - [ ] Shadow 시스템 추가 (pristine, elegant, sharp, glow)
  - [ ] Letter spacing 토큰 추가
  - [ ] Custom scrollbar 적용
- [ ] 새 컴포넌트 생성
  - [ ] `FloatingInput` - underline 애니메이션 포함
  - [ ] `LuxuryCard` - 상단 테두리 애니메이션
- [ ] 기존 컴포넌트 업데이트
  - [ ] `Button` - luxury variant 추가
  - [ ] `ProductCard` - 이미지 zoom 속도, shadow 적용
- [ ] 레이아웃 색상 전환
  - [ ] Header, Footer, AdminSidebar
  - [ ] 모든 페이지 배경/텍스트 색상 조정

**참조 파일**
| 파일 | 용도 |
|------|------|
| `stitch/index.html` | Tailwind 설정, 색상, shadow |
| `stitch/pages/LoginPage.tsx` | Floating input 패턴 |
| `stitch/pages/VIPManagementPage.tsx` | Card hover, 테이블 패턴 |

---

## 8. 우선순위 정의

| 우선순위 | 설명 | 기능 |
|---------|------|------|
| **P0** | 핵심 기능 (MVP) | VIP 관리, 인증, 주문 생성 |
| **P1** | 주요 기능 | 결제 연동, 재고 차감, 주문 관리 |
| **P2** | 부가 기능 | 대시보드, VIP 상세, 상품 관리 |
| **P3** | 향후 확장 | QR 등록, 활동 로그, 분석 |

---

## 9. 비기능 요구사항

### 9.1 성능

| 메트릭 | 목표 |
|--------|------|
| 페이지 로딩 시간 | < 2초 (초기 로드) |
| API 응답 시간 | < 500ms (95 percentile) |
| 이미지 최적화 | Next.js Image 컴포넌트 사용 |

---

### 9.2 보안

**1) VIP 세션**
- HttpOnly 쿠키
- HTTPS 전송만 허용 (프로덕션)
- XSS 방지: 입력값 sanitize

**2) 관리자 인증**
- Supabase Auth 2FA 지원 (선택)
- 비밀번호 정책: 최소 8자, 영문+숫자 조합

**3) 데이터베이스**
- RLS 정책 활성화
- Admin 작업은 `service_role` 키 사용 (서버 측만)

---

### 9.3 확장성

**1) 데이터베이스**
- 인덱스 최적화 (email, invite_code, tier)
- 페이지네이션으로 대량 데이터 처리

**2) 캐싱**
- 상품 목록/카테고리: Next.js 캐싱 (Revalidation)
- VIP 세션: 메모리 캐시 (향후)

---

### 9.4 접근성 (Accessibility)

- ARIA 레이블 (버튼, 입력 필드)
- 키보드 내비게이션 지원
- 포커스 관리 (모달 열림/닫힘)

---

### 9.5 국제화 (i18n)

**현재**: 한글 전용

**향후**: 다국어 지원
- 영어 (en)
- 일본어 (ja)
- Next.js i18n 라우팅

---

## 10. 테스트 계획

### 10.1 단위 테스트 (Vitest)

**대상**
- `lib/api/vip.ts` - `getVipByToken()`, `createVip()` 등
- `stores/cartStore.ts` - 장바구니 로직
- `lib/auth/vip-session.ts` - JWT 검증

**목표 커버리지**: 80%

---

### 10.2 통합 테스트

**시나리오**
1. VIP 생성 → 초대 링크 접속 → 세션 검증
2. 상품 장바구니 추가 → 주문 생성 → DB 확인
3. 관리자 로그인 → VIP 수정 → DB 업데이트 확인

---

### 10.3 E2E 테스트 (Playwright)

**크리티컬 플로우**
1. **VIP 초대 플로우**
   - 관리자가 VIP 생성
   - 초대 링크 복사
   - 새 브라우저에서 링크 접속
   - 상품 페이지 접근 확인

2. **체크아웃 플로우**
   - VIP 로그인
   - 상품 3개 장바구니 추가
   - 배송 주소 입력
   - 주문 생성 확인

3. **관리자 VIP 관리**
   - 로그인
   - VIP 목록 필터링
   - VIP 정보 수정
   - 토큰 재발급

---

## 11. 용어 사전

| 용어 | 설명 |
|------|------|
| **VIP** | 초대를 통해 플랫폼에 접근할 수 있는 고객 |
| **Invite Token** | VIP 고유 초대 링크용 UUID |
| **Tier** | VIP 등급 (Silver/Gold), 장바구니 제한 및 상품 접근 권한 결정 |
| **Soft Delete** | 데이터를 DB에서 삭제하지 않고 `is_active = false`로 표시 |
| **Hard Delete** | 데이터를 DB에서 완전히 제거 |
| **RLS** | Row Level Security, Supabase의 테이블 수준 접근 제어 |
| **Server Action** | Next.js 서버 측 함수 (form submit 등) |
| **Admin Client** | Supabase `service_role` 키를 사용한 RLS 우회 클라이언트 |

---

## 12. 참조 문서

| 문서 | 경로 |
|------|------|
| 프로젝트 README | `D:\AI\claude01\ggp_heritage_mall\README.md` |
| CLAUDE.md | `D:\AI\claude01\ggp_heritage_mall\CLAUDE.md` |
| 데이터베이스 스키마 | `supabase/migrations/001_initial_schema.sql` |
| VIP API 구현 | `web/src/lib/api/vip.ts` |
| 장바구니 Store | `web/src/stores/cartStore.ts` |

---

## 13. 변경 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|----------|
| 1.0.0 | 2025-12-20 | 초기 PRD 작성 (관리자 VIP 관리 중심) |
| 1.1.0 | 2025-12-21 | 비즈니스 모델 명확화 (VIP Complimentary), 결제 시스템 해당 없음 반영, 마일스톤 완료 상태 업데이트 |
| 1.2.0 | 2025-12-24 | 디자인 시스템 섹션 추가 (6.2), stitch 프로젝트 기반 라이트 모드 전환 및 럭셔리 UI 패턴, Phase 5 마일스톤 추가 |

---

## 부록 A: Mock 데이터

### A.1 VIP 샘플

```json
[
  {
    "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "email": "john@example.com",
    "name": "John Smith",
    "tier": "gold",
    "invite_code": "VIP7K3M",
    "is_active": true,
    "created_at": "2025-12-01T10:00:00Z"
  },
  {
    "id": "c9bf9e57-1685-4c89-bafb-ff5af830be8a",
    "email": "jane@example.com",
    "name": "Jane Doe",
    "tier": "silver",
    "invite_code": "VIPXA9B",
    "is_active": true,
    "created_at": "2025-12-05T14:30:00Z"
  }
]
```

---

### A.2 주문 샘플

```json
{
  "id": "order_12345",
  "vip_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "status": "pending",
  "shipping_address": {
    "recipient_name": "John Smith",
    "phone": "+1 555-123-4567",
    "address_line1": "123 Heritage Blvd",
    "city": "Las Vegas",
    "state": "NV",
    "postal_code": "89101",
    "country": "US"
  },
  "items": [
    {
      "product_id": "prod_001",
      "size": "M",
      "quantity": 1
    }
  ],
  "created_at": "2025-12-10T16:45:00Z"
}
```

---

## 부록 B: UI 컴포넌트 예시 코드

### B.1 VIP Badge 컴포넌트

```tsx
// components/ui/Badge.tsx
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
  {
    variants: {
      variant: {
        silver: "bg-gray-200 text-gray-800",
        gold: "bg-yellow-200 text-yellow-900",
        active: "bg-green-100 text-green-800",
        inactive: "bg-red-100 text-red-800",
      },
    },
    defaultVariants: {
      variant: "silver",
    },
  }
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

export function Badge({ variant, children }: BadgeProps) {
  return <span className={badgeVariants({ variant })}>{children}</span>;
}

// 사용 예시
<Badge variant="gold">Gold</Badge>
<Badge variant="active">Active</Badge>
```

---

### B.2 VIP 테이블 Row 컴포넌트

```tsx
// components/admin/VipRow.tsx
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Edit, Trash2 } from "lucide-react";

interface VipRowProps {
  vip: {
    id: string;
    email: string;
    name: string;
    tier: "silver" | "gold";
    is_active: boolean;
    created_at: string;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function VipRow({ vip, onEdit, onDelete }: VipRowProps) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-6 py-4">{vip.email}</td>
      <td className="px-6 py-4">{vip.name}</td>
      <td className="px-6 py-4">
        <Badge variant={vip.tier}>{vip.tier.toUpperCase()}</Badge>
      </td>
      <td className="px-6 py-4">
        <Badge variant={vip.is_active ? "active" : "inactive"}>
          {vip.is_active ? "Active" : "Inactive"}
        </Badge>
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">
        {new Date(vip.created_at).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(vip.id)}
          aria-label="Edit VIP"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(vip.id)}
          aria-label="Delete VIP"
        >
          <Trash2 className="h-4 w-4 text-red-600" />
        </Button>
      </td>
    </tr>
  );
}
```

---

## 부록 C: SQL 쿼리 예시

### C.1 VIP 목록 조회 (페이지네이션 + 필터)

```sql
SELECT
  id,
  email,
  name,
  tier,
  is_active,
  created_at,
  invite_code
FROM vips
WHERE
  ($1::vip_tier IS NULL OR tier = $1)           -- 티어 필터
  AND ($2::boolean IS NULL OR is_active = $2)   -- 활성 상태 필터
  AND ($3::text IS NULL OR email ILIKE '%' || $3 || '%')  -- 이메일 검색
ORDER BY created_at DESC
LIMIT $4 OFFSET $5;

-- 파라미터:
-- $1: tier ('silver' | 'gold' | null)
-- $2: is_active (true | false | null)
-- $3: search (string | null)
-- $4: limit (20)
-- $5: offset ((page - 1) * limit)
```

---

### C.2 VIP 삭제 전 주문 확인

```sql
-- 주문 존재 여부 확인
SELECT EXISTS (
  SELECT 1 FROM orders WHERE vip_id = $1
) AS has_orders;

-- has_orders = true면 Hard Delete 불가
```

---

### C.3 주문과 함께 VIP 정보 조회 (JOIN)

```sql
SELECT
  o.id AS order_id,
  o.status,
  o.created_at,
  v.name AS vip_name,
  v.email AS vip_email,
  v.tier AS vip_tier,
  COUNT(oi.id) AS total_items
FROM orders o
JOIN vips v ON o.vip_id = v.id
LEFT JOIN order_items oi ON o.id = oi.order_id
WHERE o.vip_id = $1
GROUP BY o.id, v.name, v.email, v.tier
ORDER BY o.created_at DESC;
```

---

**END OF DOCUMENT**
