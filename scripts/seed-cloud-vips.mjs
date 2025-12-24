// GGP Heritage Mall - Seed VIP Data to Cloud Supabase
// Usage: node scripts/seed-cloud-vips.mjs

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lhgjkbngqmysxnhqwcoc.supabase.co';
const serviceRoleKey = 'sb_secret_jRzktib6Bm0lRIp0gAQ6bg_Dp4jsoOF';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const vipData = [
  // E2E Test VIPs (Playwright 테스트용)
  {
    id: '11111111-1111-1111-1111-111111111111',
    email: 'gold@test.ggp.com',
    name: 'Gold VIP',
    tier: 'gold',
    reg_type: 'email_invite',
    invite_code: 'VIPE2G1',
    is_active: true,
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    email: 'silver@test.ggp.com',
    name: 'Silver VIP',
    tier: 'silver',
    reg_type: 'email_invite',
    invite_code: 'VIPE2S1',
    is_active: true,
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    email: 'inactive@test.ggp.com',
    name: 'Inactive VIP',
    tier: 'silver',
    reg_type: 'email_invite',
    invite_code: 'VIPNACT',
    is_active: false,
  },
  // Silver VIPs (5개)
  {
    id: 'd1000000-0000-0000-0000-000000000001',
    email: 'dev.silver1@ggp.test',
    name: 'Kim Silver',
    tier: 'silver',
    reg_type: 'email_invite',
    invite_code: 'VIPDVS1',
  },
  {
    id: 'd1000000-0000-0000-0000-000000000002',
    email: 'dev.silver2@ggp.test',
    name: 'Lee Silver',
    tier: 'silver',
    reg_type: 'email_invite',
    invite_code: 'VIPDVS2',
  },
  {
    id: 'd1000000-0000-0000-0000-000000000003',
    email: 'dev.silver3@ggp.test',
    name: 'Park Silver',
    tier: 'silver',
    reg_type: 'email_invite',
    invite_code: 'VIPDVS3',
  },
  {
    id: 'd1000000-0000-0000-0000-000000000004',
    email: 'dev.silver4@ggp.test',
    name: 'Choi Silver',
    tier: 'silver',
    reg_type: 'email_invite',
    invite_code: 'VIPDVS4',
  },
  {
    id: 'd1000000-0000-0000-0000-000000000005',
    email: 'dev.silver5@ggp.test',
    name: 'Jung Silver',
    tier: 'silver',
    reg_type: 'email_invite',
    invite_code: 'VIPDVS5',
  },
  // Gold VIPs (5개)
  {
    id: 'd1000000-0000-0000-0000-000000000006',
    email: 'dev.gold1@ggp.test',
    name: 'Kim Gold',
    tier: 'gold',
    reg_type: 'email_invite',
    invite_code: 'VIPDVG1',
  },
  {
    id: 'd1000000-0000-0000-0000-000000000007',
    email: 'dev.gold2@ggp.test',
    name: 'Lee Gold',
    tier: 'gold',
    reg_type: 'email_invite',
    invite_code: 'VIPDVG2',
  },
  {
    id: 'd1000000-0000-0000-0000-000000000008',
    email: 'dev.gold3@ggp.test',
    name: 'Park Gold',
    tier: 'gold',
    reg_type: 'email_invite',
    invite_code: 'VIPDVG3',
  },
  {
    id: 'd1000000-0000-0000-0000-000000000009',
    email: 'dev.gold4@ggp.test',
    name: 'Choi Gold',
    tier: 'gold',
    reg_type: 'email_invite',
    invite_code: 'VIPDVG4',
  },
  {
    id: 'd1000000-0000-0000-0000-00000000000a',
    email: 'dev.gold5@ggp.test',
    name: 'Jung Gold',
    tier: 'gold',
    reg_type: 'email_invite',
    invite_code: 'VIPDVG5',
  },
];

async function seedVips() {
  console.log('');
  console.log('=== GGP Heritage Mall - VIP Data Seeding ===');
  console.log('');
  console.log('Target: Cloud Supabase');
  console.log('URL:', supabaseUrl);
  console.log('');

  // Check if vips table exists
  console.log('Checking vips table...');
  const { data: existingVips, error: checkError } = await supabase
    .from('vips')
    .select('id')
    .limit(1);

  if (checkError) {
    console.error('Error accessing vips table:', checkError.message);
    console.log('');
    console.log('Please run migrations first via Supabase Dashboard.');
    return;
  }

  console.log('vips table exists. Inserting VIP data...');
  console.log('');

  // Insert VIP data
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const vip of vipData) {
    const { error } = await supabase.from('vips').upsert(vip, {
      onConflict: 'id',
    });

    if (error) {
      if (error.code === '23505') {
        // Unique violation - already exists
        console.log(`  SKIP: ${vip.email} (already exists)`);
        skipCount++;
      } else {
        console.error(`  ERROR: ${vip.email} - ${error.message}`);
        errorCount++;
      }
    } else {
      console.log(`  OK: ${vip.email} (${vip.tier})`);
      successCount++;
    }
  }

  console.log('');
  console.log('=== Summary ===');
  console.log(`  Inserted: ${successCount}`);
  console.log(`  Skipped:  ${skipCount}`);
  console.log(`  Errors:   ${errorCount}`);
  console.log('');

  // Verify count
  const { data: allVips, error: countError } = await supabase
    .from('vips')
    .select('id, email, tier')
    .order('created_at', { ascending: true });

  if (!countError && allVips) {
    console.log(`Total VIPs in database: ${allVips.length}`);
    console.log('');
    console.log('VIP List:');
    allVips.forEach((vip, index) => {
      console.log(`  ${index + 1}. ${vip.email} (${vip.tier})`);
    });
  }

  console.log('');
}

seedVips();
