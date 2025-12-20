import { createAdminClient } from "@/lib/supabase/admin";
import type {
  AdminVip,
  VipListResponse,
  VipFilters,
  CreateVipInput,
  CreateVipResult,
  UpdateVipInput,
  UpdateVipResult,
  DeleteVipResult,
  RegenerateTokenResult,
} from "@/types/admin";

/**
 * VIP 목록 조회
 */
export async function getVipList(filters: VipFilters): Promise<VipListResponse> {
  const supabase = createAdminClient();
  const { page = 1, limit = 20, tier, is_active, search } = filters;

  let query = supabase
    .from("vips")
    .select("*", { count: "exact" });

  // 필터 적용
  if (tier) query = query.eq("tier", tier);
  if (is_active !== undefined) query = query.eq("is_active", is_active);
  if (search) {
    query = query.or(`email.ilike.%${search}%,name.ilike.%${search}%`);
  }

  // 페이지네이션 및 정렬
  const { data, count, error } = await query
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) {
    throw new Error(error.message);
  }

  return {
    vips: data ?? [],
    total: count ?? 0,
    page,
    limit,
  };
}

/**
 * VIP 단일 조회
 */
export async function getVipById(id: string): Promise<AdminVip | null> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("vips")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(error.message);
  }

  return data;
}

/**
 * VIP 생성
 */
export async function createVip(input: CreateVipInput): Promise<CreateVipResult> {
  const supabase = createAdminClient();

  // UUID 기반 초대 토큰 생성
  const invite_token = crypto.randomUUID();

  const { data, error } = await supabase
    .from("vips")
    .insert({
      email: input.email,
      name: input.name || null,
      tier: input.tier,
      reg_type: input.reg_type,
      invite_token,
      is_active: true,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") { // unique violation
      return { success: false, error: "duplicate_email" };
    }
    return { success: false, error: "database_error" };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const invite_url = `${appUrl}/invite/${invite_token}`;

  return {
    success: true,
    vip: data,
    invite_url,
  };
}

/**
 * VIP 수정
 */
export async function updateVip(id: string, input: UpdateVipInput): Promise<UpdateVipResult> {
  const supabase = createAdminClient();

  const updateData: Record<string, unknown> = {};
  if (input.email !== undefined) updateData.email = input.email;
  if (input.name !== undefined) updateData.name = input.name;
  if (input.tier !== undefined) updateData.tier = input.tier;
  if (input.is_active !== undefined) updateData.is_active = input.is_active;
  updateData.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("vips")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return { success: false, error: "not_found" };
    }
    if (error.code === "23505") {
      return { success: false, error: "duplicate_email" };
    }
    return { success: false, error: "database_error" };
  }

  return { success: true, vip: data };
}

/**
 * VIP 삭제
 * @param hard - true면 완전 삭제, false면 soft delete (is_active = false)
 */
export async function deleteVip(id: string, hard: boolean = false): Promise<DeleteVipResult> {
  const supabase = createAdminClient();

  if (hard) {
    // Hard delete 전에 주문 확인
    const { count } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("vip_id", id);

    if (count && count > 0) {
      return { success: false, error: "has_orders" };
    }

    const { error } = await supabase
      .from("vips")
      .delete()
      .eq("id", id);

    if (error) {
      if (error.code === "PGRST116") {
        return { success: false, error: "not_found" };
      }
      return { success: false, error: "database_error" };
    }
  } else {
    // Soft delete
    const { error } = await supabase
      .from("vips")
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      if (error.code === "PGRST116") {
        return { success: false, error: "not_found" };
      }
      return { success: false, error: "database_error" };
    }
  }

  return { success: true };
}

/**
 * 초대 토큰 재발급
 */
export async function regenerateToken(id: string): Promise<RegenerateTokenResult> {
  const supabase = createAdminClient();

  const invite_token = crypto.randomUUID();

  const { error } = await supabase
    .from("vips")
    .update({ invite_token, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    if (error.code === "PGRST116") {
      return { success: false, error: "not_found" };
    }
    return { success: false, error: "database_error" };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const invite_url = `${appUrl}/invite/${invite_token}`;

  return { success: true, invite_token, invite_url };
}
