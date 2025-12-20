/**
 * E2E 테스트용 데이터 Fixture
 * Supabase seed 스크립트와 동기화 필요
 */

export const TEST_VIPS = {
  gold: {
    id: "11111111-1111-1111-1111-111111111111",
    email: "gold@test.ggp.com",
    name: "Gold VIP",
    invite_token: "aaaaaaaa-1111-1111-1111-111111111111",
    tier: "gold" as const,
    maxItems: 5,
  },
  silver: {
    id: "22222222-2222-2222-2222-222222222222",
    email: "silver@test.ggp.com",
    name: "Silver VIP",
    invite_token: "bbbbbbbb-2222-2222-2222-222222222222",
    tier: "silver" as const,
    maxItems: 3,
  },
  invalid: {
    invite_token: "00000000-0000-0000-0000-000000000000",
  },
  inactive: {
    invite_token: "cccccccc-3333-3333-3333-333333333333",
  },
};

export const TEST_SHIPPING = {
  valid: {
    fullName: "John Smith",
    phone: "+1 (555) 123-4567",
    zipCode: "89101",
    streetAddress: "123 Heritage Boulevard",
    cityState: "Las Vegas, NV",
    notes: "Please ring doorbell twice",
  },
  incomplete: {
    fullName: "Jane Doe",
    // 나머지 필드 누락
  },
};

export const TEST_PRODUCTS = {
  available: {
    id: "test-product-1",
    name: "Heritage Jacket",
    category: "Outerwear",
    sizes: ["S", "M", "L"],
  },
  outOfStock: {
    id: "test-product-oos",
    name: "Limited Edition Watch",
  },
};
