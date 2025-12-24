import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lhgjkbngqmysxnhqwcoc.supabase.co';
const serviceRoleKey = 'sb_secret_jRzktib6Bm0lRIp0gAQ6bg_Dp4jsoOF';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function setupAdmin() {
  const userId = 'd2b6080f-b96e-4a2c-a102-4fd8d96ad300';
  const email = 'admin@ggpheritage.com';
  const name = 'GGP Admin';

  console.log('Checking if admins table exists...');

  // Check if admins table exists by trying to query it
  const { data, error } = await supabase
    .from('admins')
    .select('id')
    .limit(1);

  if (error) {
    console.log('admins table does not exist or error:', error.message);
    console.log('\n=== Please run this SQL in Supabase Dashboard SQL Editor ===\n');
    console.log(`
-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert admin record
INSERT INTO admins (user_id, email, name, is_active)
VALUES ('${userId}', '${email}', '${name}', true);
    `);
    return;
  }

  // Table exists, insert admin
  console.log('admins table exists. Inserting admin record...');

  const { data: insertData, error: insertError } = await supabase
    .from('admins')
    .insert({
      user_id: userId,
      email: email,
      name: name,
      is_active: true,
    })
    .select()
    .single();

  if (insertError) {
    console.error('Insert error:', insertError.message);
  } else {
    console.log('Admin created successfully:', insertData);
  }
}

setupAdmin();
