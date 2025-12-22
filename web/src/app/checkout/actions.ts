"use server";

import { redirect } from "next/navigation";
import { createOrder, validateInventory } from "@/lib/api/orders";
import { getVipSession } from "@/lib/auth/vip-session";
import type { OrderItem, ShippingAddress } from "@/lib/api/orders";

export interface CreateOrderActionInput {
  items: OrderItem[];
  shipping_address: ShippingAddress;
  notes?: string;
}

export interface CreateOrderActionResult {
  success: boolean;
  error?: string;
  errorType?: "session" | "inventory" | "order" | "unknown";
  details?: string;
}

/**
 * 재고 확인 액션
 * 주문 전 재고 가용성 검증
 */
export async function checkInventoryAction(
  items: OrderItem[]
): Promise<CreateOrderActionResult> {
  try {
    const session = await getVipSession();
    if (!session) {
      return {
        success: false,
        error: "VIP 세션이 만료되었습니다.",
        errorType: "session",
      };
    }

    const result = await validateInventory(items);
    if (!result.valid) {
      return {
        success: false,
        error: result.message || "재고가 부족합니다.",
        errorType: "inventory",
        details: result.details
          ? result.details
              .map((d) => `${d.size}: 요청 ${d.requested}, 가용 ${d.available}`)
              .join(", ")
          : undefined,
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Inventory check failed:", error);
    return {
      success: false,
      error: "재고 확인에 실패했습니다.",
      errorType: "unknown",
    };
  }
}

/**
 * 주문 생성 액션
 * 재고 검증 + 주문 생성 + 재고 차감을 원자적으로 처리
 */
export async function createOrderAction(
  input: CreateOrderActionInput
): Promise<CreateOrderActionResult> {
  try {
    // VIP 세션에서 vip_id 가져오기
    const session = await getVipSession();
    if (!session) {
      return {
        success: false,
        error: "VIP 세션이 만료되었습니다. 다시 로그인하세요.",
        errorType: "session",
      };
    }

    // 주문 생성 (내부에서 재고 검증 및 차감 처리)
    const order = await createOrder({
      vip_id: session.id,
      items: input.items,
      shipping_address: input.shipping_address,
      notes: input.notes,
    });

    redirect(`/checkout/complete?orderId=${order.id}`);
  } catch (error) {
    // Next.js의 redirect()는 특별한 에러를 throw함 - 다시 throw해야 함
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof (error as { digest: string }).digest === "string" &&
      (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    console.error("Order creation failed:", error);

    // 에러 메시지 파싱하여 적절한 응답 반환
    const errorMessage =
      error instanceof Error ? error.message : "알 수 없는 오류";

    // 재고 부족 에러 감지
    if (
      errorMessage.includes("재고") ||
      errorMessage.includes("Insufficient") ||
      errorMessage.includes("inventory")
    ) {
      return {
        success: false,
        error: "재고가 부족합니다. 장바구니를 확인해주세요.",
        errorType: "inventory",
        details: errorMessage,
      };
    }

    return {
      success: false,
      error: "주문 생성에 실패했습니다.",
      errorType: "order",
      details: errorMessage,
    };
  }
}
