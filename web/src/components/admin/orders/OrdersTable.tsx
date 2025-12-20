"use client";

import React from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TierBadge } from "@/components/admin/ui/TierBadge";
import { OrderStatusBadge } from "@/components/admin/ui/OrderStatusBadge";
import type { AdminOrder } from "@/types/admin";

interface OrdersTableProps {
  orders: AdminOrder[];
  onView: (id: string) => void;
}

export function OrdersTable({ orders, onView }: OrdersTableProps) {
  if (orders.length === 0) {
    return (
      <div className="rounded-xl border border-[#2A2A2A] bg-[var(--color-surface)] p-12 text-center">
        <p className="text-[var(--color-text-secondary)]">No orders found</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#2A2A2A] bg-[var(--color-surface)]">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2A2A2A]">
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                Order ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                VIP
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                Items
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                Created
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2A2A]">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="transition-colors hover:bg-[#1A1A1A]"
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm font-mono text-[var(--color-text-primary)]">
                  {order.id.substring(0, 8)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[var(--color-text-primary)]">
                        {order.vip.name || "N/A"}
                      </span>
                      <TierBadge tier={order.vip.tier} />
                    </div>
                    <span className="text-xs text-[var(--color-text-secondary)]">
                      {order.vip.email}
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <OrderStatusBadge status={order.status} />
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-[var(--color-text-primary)]">
                  {order.total_items} item{order.total_items !== 1 ? "s" : ""}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-[var(--color-text-secondary)]">
                  {new Date(order.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onView(order.id)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
