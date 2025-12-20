import type { VipTier } from "./vip";

/**
 * Admin 등록 타입
 * - email_invite: 이메일 초대로 등록
 * - qr_code: QR 코드로 등록
 */
export type RegistrationType = "email_invite" | "qr_code";

/**
 * 주문 상태
 */
export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

/**
 * Admin JWT 세션 정보
 */
export interface AdminSession {
  /** Admin 고유 ID (UUID) */
  id: string;
  /** Admin 이메일 */
  email: string;
  /** Admin 이름 */
  name: string | null;
  /** 만료 시간 (Unix timestamp) */
  exp: number;
}

/**
 * VIP 배송지 정보
 */
export interface ShippingAddress {
  /** 수령인 이름 */
  name: string;
  /** 연락처 */
  phone: string;
  /** 주소 */
  address: string;
  /** 상세 주소 */
  detail?: string;
  /** 우편번호 */
  zipcode: string;
}

/**
 * Admin이 관리하는 VIP 정보
 */
export interface AdminVip {
  /** VIP 고유 ID */
  id: string;
  /** VIP 이메일 */
  email: string;
  /** VIP 이름 */
  name: string | null;
  /** VIP 티어 */
  tier: VipTier;
  /** 등록 타입 */
  reg_type: RegistrationType;
  /** 초대 토큰 */
  invite_token: string;
  /** 활성 상태 */
  is_active: boolean;
  /** 배송지 정보 */
  shipping_address: ShippingAddress | null;
  /** 생성 일시 */
  created_at: string;
  /** 수정 일시 */
  updated_at: string;
}

/**
 * VIP 목록 조회 응답
 */
export interface VipListResponse {
  /** VIP 목록 */
  vips: AdminVip[];
  /** 전체 VIP 수 */
  total: number;
  /** 현재 페이지 */
  page: number;
  /** 페이지당 개수 */
  limit: number;
}

/**
 * VIP 목록 필터
 */
export interface VipFilters {
  /** 페이지 번호 (1부터 시작) */
  page?: number;
  /** 페이지당 개수 */
  limit?: number;
  /** 티어 필터 */
  tier?: VipTier;
  /** 활성 상태 필터 */
  is_active?: boolean;
  /** 검색어 (이름, 이메일) */
  search?: string;
}

/**
 * VIP 생성 입력
 */
export interface CreateVipInput {
  /** 이메일 (필수) */
  email: string;
  /** 이름 (선택) */
  name?: string;
  /** 티어 */
  tier: VipTier;
  /** 등록 타입 */
  reg_type: RegistrationType;
}

/**
 * VIP 수정 입력
 */
export interface UpdateVipInput {
  /** 이메일 */
  email?: string;
  /** 이름 */
  name?: string;
  /** 티어 */
  tier?: VipTier;
  /** 활성 상태 */
  is_active?: boolean;
}

/**
 * VIP 생성 결과
 */
export type CreateVipResult =
  | {
      success: true;
      vip: AdminVip;
      invite_url: string;
    }
  | {
      success: false;
      error: "duplicate_email" | "database_error";
    };

/**
 * VIP 수정 결과
 */
export type UpdateVipResult =
  | {
      success: true;
      vip: AdminVip;
    }
  | {
      success: false;
      error: "not_found" | "duplicate_email" | "database_error";
    };

/**
 * VIP 삭제 결과
 */
export type DeleteVipResult =
  | {
      success: true;
    }
  | {
      success: false;
      error: "not_found" | "has_orders" | "database_error";
    };

/**
 * 초대 토큰 재발급 결과
 */
export type RegenerateTokenResult =
  | {
      success: true;
      invite_token: string;
      invite_url: string;
    }
  | {
      success: false;
      error: "not_found" | "database_error";
    };

/**
 * 주문 아이템 정보
 */
export interface OrderItem {
  /** 상품 ID */
  product_id: string;
  /** 상품명 */
  product_name: string;
  /** 사이즈 */
  size: string;
  /** 수량 */
  quantity: number;
  /** 상품 이미지 (선택) */
  image?: string;
}

/**
 * Admin이 관리하는 주문 목록 정보
 */
export interface AdminOrder {
  /** 주문 ID */
  id: string;
  /** VIP ID */
  vip_id: string;
  /** VIP 정보 (조인) */
  vip: {
    name: string | null;
    email: string;
    tier: VipTier;
  };
  /** 주문 상태 */
  status: OrderStatus;
  /** 전체 아이템 수 */
  total_items: number;
  /** 주문 생성 일시 */
  created_at: string;
}

/**
 * Admin 주문 상세 정보
 */
export interface AdminOrderDetail extends AdminOrder {
  /** 배송지 정보 */
  shipping_address: ShippingAddress | null;
  /** 운송장 번호 */
  tracking_number: string | null;
  /** 택배사 */
  carrier: string | null;
  /** 관리자 메모 */
  notes: string | null;
  /** 수정 일시 */
  updated_at: string;
  /** 주문 아이템 목록 */
  items: OrderItem[];
}

/**
 * 주문 목록 조회 응답
 */
export interface OrderListResponse {
  /** 주문 목록 */
  orders: AdminOrder[];
  /** 전체 주문 수 */
  total: number;
  /** 현재 페이지 */
  page: number;
  /** 페이지당 개수 */
  limit: number;
}

/**
 * 주문 목록 필터
 */
export interface OrderFilters {
  /** 페이지 번호 (1부터 시작) */
  page?: number;
  /** 페이지당 개수 */
  limit?: number;
  /** 주문 상태 필터 */
  status?: OrderStatus;
  /** VIP ID 필터 */
  vip_id?: string;
}

/**
 * 대시보드 통계 정보
 */
export interface DashboardStats {
  /** 전체 VIP 수 */
  totalVips: number;
  /** 활성 VIP 수 */
  activeVips: number;
  /** 티어별 분포 */
  tierDistribution: {
    silver: number;
    gold: number;
  };
  /** 전체 주문 수 */
  totalOrders: number;
  /** 최근 주문 수 (30일) */
  recentOrders: number;
}
