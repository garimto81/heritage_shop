-- E2E Test VIP Users for Cloud Database
-- Run with: supabase db execute --file scripts/seed-cloud-test-vips.sql

-- Delete existing test VIPs (if any)
DELETE FROM vips WHERE email IN ('gold@test.ggp.com', 'silver@test.ggp.com', 'inactive@test.ggp.com');

-- Insert E2E Test VIP Users
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
  )
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  name = EXCLUDED.name,
  tier = EXCLUDED.tier,
  invite_code = EXCLUDED.invite_code,
  is_active = EXCLUDED.is_active;

-- Verify
SELECT id, email, name, tier, invite_code, is_active FROM vips WHERE email LIKE '%test.ggp.com';
