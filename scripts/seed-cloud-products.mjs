// GGP Heritage Mall - Seed Products Data to Cloud Supabase
// Usage: node scripts/seed-cloud-products.mjs

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lhgjkbngqmysxnhqwcoc.supabase.co';
const serviceRoleKey = 'sb_secret_jRzktib6Bm0lRIp0gAQ6bg_Dp4jsoOF';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Categories
const categories = [
  { id: 'caaaaaaa-0000-0000-0000-000000000001', name: 'Apparel', slug: 'apparel', description: 'Premium clothing and accessories', sort_order: 1 },
  { id: 'caaaaaaa-0000-0000-0000-000000000002', name: 'Accessories', slug: 'accessories', description: 'Luxury watches, bags, and more', sort_order: 2 },
  { id: 'caaaaaaa-0000-0000-0000-000000000003', name: 'Electronics', slug: 'electronics', description: 'High-end gadgets and devices', sort_order: 3 },
  { id: 'caaaaaaa-0000-0000-0000-000000000004', name: 'Lifestyle', slug: 'lifestyle', description: 'Premium lifestyle products', sort_order: 4 },
];

// Products
const products = [
  {
    id: 'faaaaaaa-0000-0000-0000-000000000001',
    name: 'GGP Premium Hoodie',
    description: 'Exclusive limited edition hoodie with embroidered GGP logo. Made from premium cotton blend.',
    category_id: 'caaaaaaa-0000-0000-0000-000000000001',
    tier_required: 'silver',
    images: ['products/hoodie-black-1.jpg', 'products/hoodie-black-2.jpg'],
    is_active: true,
  },
  {
    id: 'faaaaaaa-0000-0000-0000-000000000002',
    name: 'Heritage Leather Jacket',
    description: 'Genuine Italian leather jacket with custom gold hardware. VIP Gold exclusive.',
    category_id: 'caaaaaaa-0000-0000-0000-000000000001',
    tier_required: 'gold',
    images: ['products/jacket-leather-1.jpg', 'products/jacket-leather-2.jpg'],
    is_active: true,
  },
  {
    id: 'faaaaaaa-0000-0000-0000-000000000003',
    name: 'Limited Edition Watch',
    description: 'Swiss-made automatic watch with sapphire crystal. Serial numbered.',
    category_id: 'caaaaaaa-0000-0000-0000-000000000002',
    tier_required: 'gold',
    images: ['products/watch-gold-1.jpg', 'products/watch-gold-2.jpg'],
    is_active: true,
  },
  {
    id: 'faaaaaaa-0000-0000-0000-000000000004',
    name: 'VIP Card Holder',
    description: 'Premium leather card holder with gold embossing.',
    category_id: 'caaaaaaa-0000-0000-0000-000000000002',
    tier_required: 'silver',
    images: ['products/cardholder-1.jpg'],
    is_active: true,
  },
  {
    id: 'faaaaaaa-0000-0000-0000-000000000005',
    name: 'Wireless Earbuds Pro',
    description: 'Noise-cancelling wireless earbuds with custom case.',
    category_id: 'caaaaaaa-0000-0000-0000-000000000003',
    tier_required: 'silver',
    images: ['products/earbuds-1.jpg', 'products/earbuds-2.jpg'],
    is_active: true,
  },
  {
    id: 'faaaaaaa-0000-0000-0000-000000000006',
    name: 'Heritage Tote Bag',
    description: 'Premium canvas tote with leather accents.',
    category_id: 'caaaaaaa-0000-0000-0000-000000000001',
    tier_required: 'silver',
    images: ['products/tote-1.jpg'],
    is_active: true,
  },
  {
    id: 'faaaaaaa-0000-0000-0000-000000000007',
    name: 'Gold Member Pen Set',
    description: 'Exclusive gold-plated fountain pen set.',
    category_id: 'caaaaaaa-0000-0000-0000-000000000004',
    tier_required: 'gold',
    images: ['products/pen-set-1.jpg'],
    is_active: true,
  },
];

// Inventory
const inventory = [
  // Hoodie sizes
  { product_id: 'faaaaaaa-0000-0000-0000-000000000001', size: 'S', quantity: 10 },
  { product_id: 'faaaaaaa-0000-0000-0000-000000000001', size: 'M', quantity: 15 },
  { product_id: 'faaaaaaa-0000-0000-0000-000000000001', size: 'L', quantity: 12 },
  { product_id: 'faaaaaaa-0000-0000-0000-000000000001', size: 'XL', quantity: 8 },
  // Leather Jacket sizes
  { product_id: 'faaaaaaa-0000-0000-0000-000000000002', size: 'S', quantity: 3 },
  { product_id: 'faaaaaaa-0000-0000-0000-000000000002', size: 'M', quantity: 5 },
  { product_id: 'faaaaaaa-0000-0000-0000-000000000002', size: 'L', quantity: 4 },
  { product_id: 'faaaaaaa-0000-0000-0000-000000000002', size: 'XL', quantity: 2 },
  // Watch (one size)
  { product_id: 'faaaaaaa-0000-0000-0000-000000000003', size: 'ONE SIZE', quantity: 10 },
  // Card Holder (one size)
  { product_id: 'faaaaaaa-0000-0000-0000-000000000004', size: 'ONE SIZE', quantity: 50 },
  // Earbuds (one size)
  { product_id: 'faaaaaaa-0000-0000-0000-000000000005', size: 'ONE SIZE', quantity: 30 },
  // Tote Bag
  { product_id: 'faaaaaaa-0000-0000-0000-000000000006', size: 'ONE SIZE', quantity: 25 },
  // Pen Set
  { product_id: 'faaaaaaa-0000-0000-0000-000000000007', size: 'ONE SIZE', quantity: 20 },
];

async function seedProducts() {
  console.log('');
  console.log('=== GGP Heritage Mall - Products Data Seeding ===');
  console.log('');
  console.log('Target: Cloud Supabase');
  console.log('URL:', supabaseUrl);
  console.log('');

  // 1. Insert Categories
  console.log('1. Inserting categories...');
  for (const cat of categories) {
    const { error } = await supabase.from('categories').upsert(cat, { onConflict: 'id' });
    if (error) {
      console.error(`  ERROR: ${cat.name} - ${error.message}`);
    } else {
      console.log(`  OK: ${cat.name}`);
    }
  }
  console.log('');

  // 2. Insert Products
  console.log('2. Inserting products...');
  for (const prod of products) {
    const { error } = await supabase.from('products').upsert(prod, { onConflict: 'id' });
    if (error) {
      console.error(`  ERROR: ${prod.name} - ${error.message}`);
    } else {
      console.log(`  OK: ${prod.name} (${prod.tier_required})`);
    }
  }
  console.log('');

  // 3. Insert Inventory
  console.log('3. Inserting inventory...');
  let invSuccess = 0;
  let invError = 0;
  for (const inv of inventory) {
    const { error } = await supabase.from('inventory').upsert(inv, { onConflict: 'product_id,size' });
    if (error) {
      console.error(`  ERROR: ${inv.product_id}/${inv.size} - ${error.message}`);
      invError++;
    } else {
      invSuccess++;
    }
  }
  console.log(`  Inserted: ${invSuccess}, Errors: ${invError}`);
  console.log('');

  // Verify
  const { data: allProducts } = await supabase.from('products').select('id, name, tier_required').order('created_at');
  console.log(`Total products in database: ${allProducts?.length || 0}`);
  if (allProducts) {
    allProducts.forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.name} (${p.tier_required})`);
    });
  }
  console.log('');
}

seedProducts();
