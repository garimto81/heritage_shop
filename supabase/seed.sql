-- GGP Heritage Mall - Seed Data
-- Initial data for development and testing

-- Categories (UUID format: caaaaaaa-0000-0000-0000-000000000XXX)
INSERT INTO categories (id, name, slug, description, sort_order) VALUES
  ('caaaaaaa-0000-0000-0000-000000000001', 'Apparel', 'apparel', 'Premium clothing and accessories', 1),
  ('caaaaaaa-0000-0000-0000-000000000002', 'Accessories', 'accessories', 'Luxury watches, bags, and more', 2),
  ('caaaaaaa-0000-0000-0000-000000000003', 'Electronics', 'electronics', 'High-end gadgets and devices', 3),
  ('caaaaaaa-0000-0000-0000-000000000004', 'Lifestyle', 'lifestyle', 'Premium lifestyle products', 4);

-- Sample Products (UUID format: faaaaaaa-0000-0000-0000-000000000XXX)
INSERT INTO products (id, name, description, category_id, tier_required, images) VALUES
  (
    'faaaaaaa-0000-0000-0000-000000000001',
    'GGP Premium Hoodie',
    'Exclusive limited edition hoodie with embroidered GGP logo. Made from premium cotton blend.',
    'caaaaaaa-0000-0000-0000-000000000001',
    'silver',
    ARRAY['products/hoodie-black-1.jpg', 'products/hoodie-black-2.jpg']
  ),
  (
    'faaaaaaa-0000-0000-0000-000000000002',
    'Heritage Leather Jacket',
    'Genuine Italian leather jacket with custom gold hardware. VIP Gold exclusive.',
    'caaaaaaa-0000-0000-0000-000000000001',
    'gold',
    ARRAY['products/jacket-leather-1.jpg', 'products/jacket-leather-2.jpg']
  ),
  (
    'faaaaaaa-0000-0000-0000-000000000003',
    'Limited Edition Watch',
    'Swiss-made automatic watch with sapphire crystal. Serial numbered.',
    'caaaaaaa-0000-0000-0000-000000000002',
    'gold',
    ARRAY['products/watch-gold-1.jpg', 'products/watch-gold-2.jpg']
  ),
  (
    'faaaaaaa-0000-0000-0000-000000000004',
    'VIP Card Holder',
    'Premium leather card holder with gold embossing.',
    'caaaaaaa-0000-0000-0000-000000000002',
    'silver',
    ARRAY['products/cardholder-1.jpg']
  ),
  (
    'faaaaaaa-0000-0000-0000-000000000005',
    'Wireless Earbuds Pro',
    'Noise-cancelling wireless earbuds with custom case.',
    'caaaaaaa-0000-0000-0000-000000000003',
    'silver',
    ARRAY['products/earbuds-1.jpg', 'products/earbuds-2.jpg']
  );

-- Inventory for Products
INSERT INTO inventory (product_id, size, quantity) VALUES
  -- Hoodie sizes
  ('faaaaaaa-0000-0000-0000-000000000001', 'S', 10),
  ('faaaaaaa-0000-0000-0000-000000000001', 'M', 15),
  ('faaaaaaa-0000-0000-0000-000000000001', 'L', 12),
  ('faaaaaaa-0000-0000-0000-000000000001', 'XL', 8),
  -- Leather Jacket sizes
  ('faaaaaaa-0000-0000-0000-000000000002', 'S', 3),
  ('faaaaaaa-0000-0000-0000-000000000002', 'M', 5),
  ('faaaaaaa-0000-0000-0000-000000000002', 'L', 4),
  ('faaaaaaa-0000-0000-0000-000000000002', 'XL', 2),
  -- Watch (one size)
  ('faaaaaaa-0000-0000-0000-000000000003', 'ONE SIZE', 10),
  -- Card Holder (one size)
  ('faaaaaaa-0000-0000-0000-000000000004', 'ONE SIZE', 50),
  -- Earbuds (one size)
  ('faaaaaaa-0000-0000-0000-000000000005', 'ONE SIZE', 30);

-- Sample VIP Users (for testing)
-- UUID format: bXXXXXXX for VIP id, eXXXXXXX for invite_token
INSERT INTO vips (id, email, name, tier, reg_type, invite_token) VALUES
  (
    'b1000000-0000-0000-0000-000000000001',
    'silver.vip@test.com',
    'Silver VIP Test',
    'silver',
    'email_invite',
    'e1000000-0000-0000-0000-000000000001'
  ),
  (
    'b1000000-0000-0000-0000-000000000002',
    'gold.vip@test.com',
    'Gold VIP Test',
    'gold',
    'email_invite',
    'e1000000-0000-0000-0000-000000000002'
  );

-- E2E Test VIP Users (Playwright 테스트용)
INSERT INTO vips (id, email, name, tier, reg_type, invite_token, is_active) VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'gold@test.ggp.com',
    'Gold VIP',
    'gold',
    'email_invite',
    'aaaaaaaa-1111-1111-1111-111111111111',
    true
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'silver@test.ggp.com',
    'Silver VIP',
    'silver',
    'email_invite',
    'bbbbbbbb-2222-2222-2222-222222222222',
    true
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'inactive@test.ggp.com',
    'Inactive VIP',
    'silver',
    'email_invite',
    'cccccccc-3333-3333-3333-333333333333',
    false
  );

-- Development Test VIP Users (10개 추가)
-- 5 Silver + 5 Gold for development testing
INSERT INTO vips (id, email, name, tier, reg_type, invite_token) VALUES
  -- Silver VIPs (5개)
  (
    'd1000000-0000-0000-0000-000000000001',
    'dev.silver1@ggp.test',
    'Kim Silver',
    'silver',
    'email_invite',
    'a1000000-0000-0000-0000-000000000001'
  ),
  (
    'd1000000-0000-0000-0000-000000000002',
    'dev.silver2@ggp.test',
    'Lee Silver',
    'silver',
    'email_invite',
    'a1000000-0000-0000-0000-000000000002'
  ),
  (
    'd1000000-0000-0000-0000-000000000003',
    'dev.silver3@ggp.test',
    'Park Silver',
    'silver',
    'email_invite',
    'a1000000-0000-0000-0000-000000000003'
  ),
  (
    'd1000000-0000-0000-0000-000000000004',
    'dev.silver4@ggp.test',
    'Choi Silver',
    'silver',
    'email_invite',
    'a1000000-0000-0000-0000-000000000004'
  ),
  (
    'd1000000-0000-0000-0000-000000000005',
    'dev.silver5@ggp.test',
    'Jung Silver',
    'silver',
    'email_invite',
    'a1000000-0000-0000-0000-000000000005'
  ),
  -- Gold VIPs (5개)
  (
    'd1000000-0000-0000-0000-000000000006',
    'dev.gold1@ggp.test',
    'Kim Gold',
    'gold',
    'email_invite',
    'a1000000-0000-0000-0000-000000000006'
  ),
  (
    'd1000000-0000-0000-0000-000000000007',
    'dev.gold2@ggp.test',
    'Lee Gold',
    'gold',
    'email_invite',
    'a1000000-0000-0000-0000-000000000007'
  ),
  (
    'd1000000-0000-0000-0000-000000000008',
    'dev.gold3@ggp.test',
    'Park Gold',
    'gold',
    'email_invite',
    'a1000000-0000-0000-0000-000000000008'
  ),
  (
    'd1000000-0000-0000-0000-000000000009',
    'dev.gold4@ggp.test',
    'Choi Gold',
    'gold',
    'email_invite',
    'a1000000-0000-0000-0000-000000000009'
  ),
  (
    'd1000000-0000-0000-0000-00000000000a',
    'dev.gold5@ggp.test',
    'Jung Gold',
    'gold',
    'email_invite',
    'a1000000-0000-0000-0000-00000000000a'
  );

-- Note: Admin users should be created via Supabase Auth
-- and then added to the admins table manually or via migration
