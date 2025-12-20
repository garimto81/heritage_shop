"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { OrdersTable } from "@/components/admin/orders/OrdersTable";
import { Pagination } from "@/components/admin/shared/Pagination";
import type {
  OrderListResponse,
  OrderFilters,
  OrderStatus,
} from "@/types/admin";

interface OrdersClientProps {
  initialData: OrderListResponse;
}

export function OrdersClient({ initialData }: OrdersClientProps) {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [filters, setFilters] = useState<OrderFilters>({
    page: 1,
    limit: 20,
  });
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrders = useCallback(async (newFilters: OrderFilters) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (newFilters.page) params.set("page", String(newFilters.page));
      if (newFilters.limit) params.set("limit", String(newFilters.limit));
      if (newFilters.status) params.set("status", newFilters.status);
      if (newFilters.vip_id) params.set("vip_id", newFilters.vip_id);

      const res = await fetch(`/api/admin/orders?${params.toString()}`);
      const result = await res.json();

      if (result.success) {
        setData({
          orders: result.orders,
          total: result.total,
          page: result.page,
          limit: result.limit,
        });
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleStatusChange = useCallback(
    (status: "all" | OrderStatus) => {
      setStatusFilter(status);
      const newFilters: OrderFilters = {
        ...filters,
        status: status === "all" ? undefined : status,
        page: 1,
      };
      setFilters(newFilters);
      fetchOrders(newFilters);
    },
    [filters, fetchOrders]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const newFilters: OrderFilters = {
        ...filters,
        page,
      };
      setFilters(newFilters);
      fetchOrders(newFilters);
    },
    [filters, fetchOrders]
  );

  const handleView = useCallback(
    (id: string) => {
      router.push(`/admin/orders/${id}`);
    },
    [router]
  );

  const totalPages = Math.ceil(data.total / data.limit);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Order Management
        </h1>
      </div>

      {/* Status Filter */}
      <div className="flex gap-2">
        {["all", "pending", "processing", "shipped", "delivered", "cancelled"].map(
          (status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status as "all" | OrderStatus)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                statusFilter === status
                  ? "bg-[var(--color-gold)] text-black"
                  : "border border-[#2A2A2A] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[#3A3A3A] hover:text-[var(--color-text-primary)]"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          )
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="rounded-xl border border-[#2A2A2A] bg-[var(--color-surface)] p-12 text-center">
          <p className="text-[var(--color-text-secondary)]">Loading...</p>
        </div>
      )}

      {/* Table */}
      {!isLoading && <OrdersTable orders={data.orders} onView={handleView} />}

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <Pagination
          currentPage={data.page}
          totalPages={totalPages}
          totalItems={data.total}
          itemsPerPage={data.limit}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
