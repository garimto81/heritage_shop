"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { OrderDetail } from "@/components/admin/orders/OrderDetail";
import type { AdminOrderDetail, OrderStatus } from "@/types/admin";

interface OrderDetailClientProps {
  order: AdminOrderDetail;
}

export function OrderDetailClient({ order }: OrderDetailClientProps) {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.push("/admin/orders");
  }, [router]);

  const handleStatusChange = useCallback(
    async (status: OrderStatus) => {
      try {
        const res = await fetch(`/api/admin/orders/${order.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        });

        const result = await res.json();

        if (result.success) {
          router.refresh();
        } else {
          alert("Failed to update order status. Please try again.");
        }
      } catch (error) {
        console.error("Failed to update order status:", error);
        alert("Failed to update order status. Please try again.");
      }
    },
    [order.id, router]
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleBack}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#2A2A2A] bg-[var(--color-surface)] text-[var(--color-text-secondary)] transition-colors hover:border-[#3A3A3A] hover:text-[var(--color-text-primary)]"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Order Details
        </h1>
      </div>

      {/* Order Detail Component */}
      <OrderDetail order={order} onStatusChange={handleStatusChange} />
    </div>
  );
}
