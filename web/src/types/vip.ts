/**
 * VIP 티어 타입
 * - silver: 기본 VIP (장바구니 3개 제한)
 * - gold: 프리미엄 VIP (장바구니 5개 제한)
 */
export type VipTier = "silver" | "gold";

/**
 * VIP 세션 정보
 * JWT 토큰에 저장되는 데이터
 */
export interface VipSession {
  /** VIP 고유 ID (UUID) */
  id: string;
  /** VIP 이름 */
  name: string;
  /** VIP 티어 */
  tier: VipTier;
  /** 만료 시간 (Unix timestamp) */
  exp: number;
}

/**
 * 티어별 장바구니 아이템 제한
 */
export const TIER_LIMITS: Record<VipTier, number> = {
  silver: 3,
  gold: 5,
};

/**
 * 티어 표시 이름
 */
export const TIER_NAMES: Record<VipTier, string> = {
  silver: "Silver",
  gold: "Gold",
};
