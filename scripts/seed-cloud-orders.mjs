// GGP Heritage Mall - Seed Orders Data to Cloud Supabase
// Usage: node scripts/seed-cloud-orders.mjs

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lhgjkbngqmysxnhqwcoc.supabase.co';
const serviceRoleKey = 'sb_secret_jRzktib6Bm0lRIp0gAQ6bg_Dp4jsoOF';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Test VIP IDs (from seed-cloud-vips.mjs)
const VIP_IDS = {
  gold: '11111111-1111-1111-1111-111111111111',
  silver: '22222222-2222-2222-2222-222222222222',
  goldDev1: 'd1000000-0000-0000-0000-000000000006',
  silverDev1: 'd1000000-0000-0000-0000-000000000001',
};

// Product IDs (from seed-cloud-products.mjs)
const PRODUCT_IDS = {
  hoodie: 'faaaaaaa-0000-0000-0000-000000000001',
  jacket: 'faaaaaaa-0000-0000-0000-000000000002',
  watch: 'faaaaaaa-0000-0000-0000-000000000003',
  cardHolder: 'faaaaaaa-0000-0000-0000-000000000004',
  earbuds: 'faaaaaaa-0000-0000-0000-000000000005',
  tote: 'faaaaaaa-0000-0000-0000-000000000006',
};

// Orders data
const orders = [
  // Order 1: Gold VIP - Processing
  {
    id: 'eeeeeeee-0000-0000-0000-000000000001',
    vip_id: VIP_IDS.gold,
    status: 'processing',
    shipping_address: {
      name: 'Gold VIP',
      address1: '123 Gold Street',
      address2: 'Suite 100',
      city: 'Seoul',
      state: 'Seoul',
      postal_code: '06000',
      country: 'KR',
      phone: '010-1234-5678',
    },
    tracking_number: null,
    carrier: null,
    notes: 'VIP priority shipping',
  },
  // Order 2: Silver VIP - Shipped
  {
    id: 'eeeeeeee-0000-0000-0000-000000000002',
    vip_id: VIP_IDS.silver,
    status: 'shipped',
    shipping_address: {
      name: 'Silver VIP',
      address1: '456 Silver Avenue',
      city: 'Busan',
      state: 'Busan',
      postal_code: '48000',
      country: 'KR',
      phone: '010-9876-5432',
    },
    tracking_number: 'KR1234567890',
    carrier: 'Korea Post',
    notes: null,
  },
  // Order 3: Gold Dev - Delivered
  {
    id: 'eeeeeeee-0000-0000-0000-000000000003',
    vip_id: VIP_IDS.goldDev1,
    status: 'delivered',
    shipping_address: {
      name: 'Kim Gold',
      address1: '789 Premium Road',
      city: 'Incheon',
      state: 'Incheon',
      postal_code: '21000',
      country: 'KR',
      phone: '010-5555-6666',
    },
    tracking_number: 'DHL9876543210',
    carrier: 'DHL Express',
    notes: 'Signature required',
  },
  // Order 4: Silver Dev - Pending
  {
    id: 'eeeeeeee-0000-0000-0000-000000000004',
    vip_id: VIP_IDS.silverDev1,
    status: 'pending',
    shipping_address: {
      name: 'Kim Silver',
      address1: '101 Standard Lane',
      city: 'Daegu',
      state: 'Daegu',
      postal_code: '41000',
      country: 'KR',
      phone: '010-7777-8888',
    },
    tracking_number: null,
    carrier: null,
    notes: null,
  },
  // Order 5: Gold VIP - Cancelled
  {
    id: 'eeeeeeee-0000-0000-0000-000000000005',
    vip_id: VIP_IDS.gold,
    status: 'cancelled',
    shipping_address: {
      name: 'Gold VIP',
      address1: '123 Gold Street',
      city: 'Seoul',
      state: 'Seoul',
      postal_code: '06000',
      country: 'KR',
      phone: '010-1234-5678',
    },
    tracking_number: null,
    carrier: null,
    notes: 'Customer requested cancellation',
  },
];

// Order Items data
const orderItems = [
  // Order 1 items
  { order_id: 'eeeeeeee-0000-0000-0000-000000000001', product_id: PRODUCT_IDS.watch, size: 'ONE SIZE', quantity: 1 },
  { order_id: 'eeeeeeee-0000-0000-0000-000000000001', product_id: PRODUCT_IDS.jacket, size: 'M', quantity: 1 },

  // Order 2 items
  { order_id: 'eeeeeeee-0000-0000-0000-000000000002', product_id: PRODUCT_IDS.hoodie, size: 'L', quantity: 1 },
  { order_id: 'eeeeeeee-0000-0000-0000-000000000002', product_id: PRODUCT_IDS.cardHolder, size: 'ONE SIZE', quantity: 2 },

  // Order 3 items
  { order_id: 'eeeeeeee-0000-0000-0000-000000000003', product_id: PRODUCT_IDS.earbuds, size: 'ONE SIZE', quantity: 1 },

  // Order 4 items
  { order_id: 'eeeeeeee-0000-0000-0000-000000000004', product_id: PRODUCT_IDS.tote, size: 'ONE SIZE', quantity: 1 },
  { order_id: 'eeeeeeee-0000-0000-0000-000000000004', product_id: PRODUCT_IDS.hoodie, size: 'M', quantity: 1 },

  // Order 5 items (cancelled order)
  { order_id: 'eeeeeeee-0000-0000-0000-000000000005', product_id: PRODUCT_IDS.jacket, size: 'L', quantity: 1 },
];

async function seedOrders() {
  console.log('');
  console.log('=== GGP Heritage Mall - Orders Data Seeding ===');
  console.log('');
  console.log('Target: Cloud Supabase');
  console.log('URL:', supabaseUrl);
  console.log('');

  // 1. Insert Orders
  console.log('1. Inserting orders...');
  let orderSuccess = 0;
  let orderError = 0;

  for (const order of orders) {
    const { error } = await supabase.from('orders').upsert(order, { onConflict: 'id' });
    if (error) {
      console.error(`  ERROR: Order ${order.id.slice(-4)} - ${error.message}`);
      orderError++;
    } else {
      console.log(`  OK: Order ...${order.id.slice(-4)} (${order.status}) - VIP: ${order.shipping_address.name}`);
      orderSuccess++;
    }
  }
  console.log(`  Inserted: ${orderSuccess}, Errors: ${orderError}`);
  console.log('');

  // 2. Insert Order Items
  console.log('2. Inserting order items...');
  let itemSuccess = 0;
  let itemError = 0;

  for (const item of orderItems) {
    const { error } = await supabase.from('order_items').upsert(item, {
      onConflict: 'order_id,product_id,size',
      ignoreDuplicates: true
    });
    if (error) {
      // Try insert if upsert fails
      const { error: insertError } = await supabase.from('order_items').insert(item);
      if (insertError && !insertError.message.includes('duplicate')) {
        console.error(`  ERROR: Item - ${insertError.message}`);
        itemError++;
      } else {
        itemSuccess++;
      }
    } else {
      itemSuccess++;
    }
  }
  console.log(`  Inserted: ${itemSuccess}, Errors: ${itemError}`);
  console.log('');

  // Verify
  const { data: allOrders, error: verifyError } = await supabase
    .from('orders')
    .select(`
      id,
      status,
      vip_id,
      vips (name, email),
      order_items (
        product_id,
        size,
        quantity,
        products (name)
      )
    `)
    .order('created_at', { ascending: false });

  if (verifyError) {
    console.error('Verification error:', verifyError.message);
    return;
  }

  console.log(`Total orders in database: ${allOrders?.length || 0}`);
  console.log('');

  if (allOrders) {
    allOrders.forEach((order, i) => {
      const vipName = order.vips?.name || order.vips?.email || 'Unknown';
      const itemCount = order.order_items?.length || 0;
      console.log(`  ${i + 1}. [${order.status.toUpperCase()}] Order ...${order.id.slice(-4)} - ${vipName} (${itemCount} items)`);
    });
  }
  console.log('');
}

seedOrders();
