# Database Schema

## Enum Types

```typescript
type vip_tier = "silver" | "gold"
type registration_type = "email_invite" | "qr_code"
type order_status = "pending" | "processing" | "shipped" | "delivered" | "cancelled"
type verification_status = "pending" | "approved" | "rejected"
```

## Tables

### vips
VIP 회원 정보

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid | PK |
| email | text | 이메일 |
| name | text | 이름 |
| tier | vip_tier | silver / gold |
| reg_type | registration_type | 가입 방식 |
| invite_code | varchar(8) | 초대 코드 (예: VIP7K3M) |
| shipping_address | jsonb | 배송 주소 |
| is_active | boolean | 활성 상태 |

### verification_codes
이메일/QR 인증 코드

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid | PK |
| vip_id | uuid | FK → vips |
| code | text | 인증 코드 |
| status | verification_status | 상태 |
| expires_at | timestamptz | 만료 시간 |

### categories
상품 카테고리

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid | PK |
| name | text | 이름 |
| slug | text | URL slug |
| sort_order | integer | 정렬 순서 |
| is_active | boolean | 활성 상태 |

### products
상품

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid | PK |
| name | text | 상품명 |
| description | text | 설명 |
| category_id | uuid | FK → categories |
| tier_required | vip_tier | 접근 가능 티어 |
| images | text[] | 이미지 URL 배열 |
| is_active | boolean | 활성 상태 |

### inventory
재고

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid | PK |
| product_id | uuid | FK → products |
| size | text | 사이즈 |
| quantity | integer | 수량 |

### orders
주문

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid | PK |
| vip_id | uuid | FK → vips |
| status | order_status | 주문 상태 |
| shipping_address | jsonb | 배송 주소 |
| tracking_number | text | 운송장 번호 |
| carrier | text | 배송사 |
| notes | text | 메모 |

### order_items
주문 상품

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid | PK |
| order_id | uuid | FK → orders |
| product_id | uuid | FK → products |
| size | text | 사이즈 |
| quantity | integer | 수량 |

## TypeScript Types

`src/types/database.ts` 참조
