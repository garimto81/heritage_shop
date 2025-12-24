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
  ),
  (
    'faaaaaaa-0000-0000-0000-000000000006',
    'Heritage Tote Bag',
    'Premium canvas tote bag with leather handles.',
    'caaaaaaa-0000-0000-0000-000000000002',
    'silver',
    ARRAY['products/tote-1.jpg', 'products/tote-2.jpg']
  ),
  (
    'faaaaaaa-0000-0000-0000-000000000007',
    'Signature Sunglasses',
    'Classic aviator sunglasses with gold-plated frames.',
    'caaaaaaa-0000-0000-0000-000000000002',
    'silver',
    ARRAY['products/sunglasses-1.jpg', 'products/sunglasses-2.jpg']
  ),
  (
    'faaaaaaa-0000-0000-0000-000000000008',
    'Luxury Silk Scarf',
    'Hand-printed Italian silk scarf with exclusive pattern.',
    'caaaaaaa-0000-0000-0000-000000000001',
    'silver',
    ARRAY['products/scarf-1.jpg', 'products/scarf-2.jpg']
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
  ('faaaaaaa-0000-0000-0000-000000000005', 'ONE SIZE', 30),
  -- Tote Bag (one size)
  ('faaaaaaa-0000-0000-0000-000000000006', 'ONE SIZE', 25),
  -- Sunglasses (one size)
  ('faaaaaaa-0000-0000-0000-000000000007', 'ONE SIZE', 20),
  -- Silk Scarf (one size)
  ('faaaaaaa-0000-0000-0000-000000000008', 'ONE SIZE', 15);

-- Sample VIP Users (for testing)
-- invite_code: 7자리 코드 (VIP + 4자리 영숫자)
INSERT INTO vips (id, email, name, tier, reg_type, invite_code) VALUES
  (
    'b1000000-0000-0000-0000-000000000001',
    'silver.vip@test.com',
    'Silver VIP Test',
    'silver',
    'email_invite',
    'VIPSLV1'
  ),
  (
    'b1000000-0000-0000-0000-000000000002',
    'gold.vip@test.com',
    'Gold VIP Test',
    'gold',
    'email_invite',
    'VIPGLD1'
  );

-- E2E Test VIP Users (Playwright 테스트용)
INSERT INTO vips (id, email, name, tier, reg_type, invite_code, is_active) VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'gold@test.ggp.com',
    'Gold VIP',
    'gold',
    'email_invite',
    'VIPE2G1',
    true
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'silver@test.ggp.com',
    'Silver VIP',
    'silver',
    'email_invite',
    'VIPE2S1',
    true
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'inactive@test.ggp.com',
    'Inactive VIP',
    'silver',
    'email_invite',
    'VIPNACT',
    false
  );

-- Development Test VIP Users (10개 추가)
-- 5 Silver + 5 Gold for development testing
INSERT INTO vips (id, email, name, tier, reg_type, invite_code) VALUES
  -- Silver VIPs (5개)
  (
    'd1000000-0000-0000-0000-000000000001',
    'dev.silver1@ggp.test',
    'Kim Silver',
    'silver',
    'email_invite',
    'VIPDVS1'
  ),
  (
    'd1000000-0000-0000-0000-000000000002',
    'dev.silver2@ggp.test',
    'Lee Silver',
    'silver',
    'email_invite',
    'VIPDVS2'
  ),
  (
    'd1000000-0000-0000-0000-000000000003',
    'dev.silver3@ggp.test',
    'Park Silver',
    'silver',
    'email_invite',
    'VIPDVS3'
  ),
  (
    'd1000000-0000-0000-0000-000000000004',
    'dev.silver4@ggp.test',
    'Choi Silver',
    'silver',
    'email_invite',
    'VIPDVS4'
  ),
  (
    'd1000000-0000-0000-0000-000000000005',
    'dev.silver5@ggp.test',
    'Jung Silver',
    'silver',
    'email_invite',
    'VIPDVS5'
  ),
  -- Gold VIPs (5개)
  (
    'd1000000-0000-0000-0000-000000000006',
    'dev.gold1@ggp.test',
    'Kim Gold',
    'gold',
    'email_invite',
    'VIPDVG1'
  ),
  (
    'd1000000-0000-0000-0000-000000000007',
    'dev.gold2@ggp.test',
    'Lee Gold',
    'gold',
    'email_invite',
    'VIPDVG2'
  ),
  (
    'd1000000-0000-0000-0000-000000000008',
    'dev.gold3@ggp.test',
    'Park Gold',
    'gold',
    'email_invite',
    'VIPDVG3'
  ),
  (
    'd1000000-0000-0000-0000-000000000009',
    'dev.gold4@ggp.test',
    'Choi Gold',
    'gold',
    'email_invite',
    'VIPDVG4'
  ),
  (
    'd1000000-0000-0000-0000-00000000000a',
    'dev.gold5@ggp.test',
    'Jung Gold',
    'gold',
    'email_invite',
    'VIPDVG5'
  );

-- Admin User for E2E Testing
-- Create auth user first (password: admin1234)
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  aud,
  role,
  created_at,
  updated_at
) VALUES (
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  '00000000-0000-0000-0000-000000000000',
  'admin@ggpheritage.com',
  crypt('admin1234', gen_salt('bf')),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{"name": "GGP Admin"}',
  'authenticated',
  'authenticated',
  NOW(),
  NOW()
);

-- Add to admins table
INSERT INTO admins (id, user_id, email, name, is_active) VALUES (
  'ad000000-0000-0000-0000-000000000001',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'admin@ggpheritage.com',
  'GGP Admin',
  true
);
