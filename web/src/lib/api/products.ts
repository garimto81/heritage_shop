import { createClient } from "@/lib/supabase/server";

export interface ProductInventory {
  size: string;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface ProductWithInventory {
  id: string;
  name: string;
  description: string | null;
  images: string[];
  tier_required: string;
  category: Category | null;
  inventory: ProductInventory[];
}

export async function getProducts(): Promise<ProductWithInventory[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      description,
      images,
      tier_required,
      category:categories(id, name, slug),
      inventory(size, quantity)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  // Transform data: Supabase returns category as array for foreign key relations
  return (data ?? []).map((item) => ({
    ...item,
    category: Array.isArray(item.category) ? item.category[0] ?? null : item.category,
  })) as ProductWithInventory[];
}

/**
 * UUID v4 형식 검증
 */
function isValidUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

export async function getProductById(id: string): Promise<ProductWithInventory | null> {
  // UUID 형식이 아니면 조기 반환 (이미지 경로 등 잘못된 요청 방지)
  if (!isValidUUID(id)) {
    return null;
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      description,
      images,
      tier_required,
      category:categories(id, name, slug),
      inventory(size, quantity)
    `)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  // Transform data: Supabase returns category as array for foreign key relations
  return {
    ...data,
    category: Array.isArray(data.category) ? data.category[0] ?? null : data.category,
  } as ProductWithInventory;
}

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("name");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data;
}
