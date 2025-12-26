
export enum TierLevel {
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM'
}

export interface VIPMember {
  id: string;
  name: string;
  email: string;
  tier: TierLevel;
  inductionDate: string;
  status: 'ACTIVE' | 'PENDING' | 'REVOKED';
  avatarUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  tierRequirement: TierLevel;
  imageUrl: string;
  description: string;
  isAvailable: boolean;
  refCode: string;
}
