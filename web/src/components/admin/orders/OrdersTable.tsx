"use client";

import React from "react";
import { Eye, ShoppingBag } from "lucide-react";
import { TierBadge } from "@/components/admin/ui/TierBadge";
import { OrderStatusBadge } from "@/components/admin/ui/OrderStatusBadge";
import type { AdminOrder } from "@/types/admin";

interface OrdersTableProps {
  orders: AdminOrder[];
  onView: (id: string) => void;
}

export function OrdersTable({ orders, onView }: OrdersTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-[#2A2A2A] bg-[#0F0F0F] p-12 text-center">
        <ShoppingBag className="h-12 w-12 mx-auto text-neutral-600 mb-4" />
        <p className="text-neutral-400">No orders found</p>
      </div>
    );
  }

  return (
    <>
      {/* 모바일: 카드 레이아웃 */}
      <div className="lg:hidden space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-2xl border border-[#2A2A2A] bg-[#0F0F0F] p-4"
            onClick={() => onView(order.id)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-sm text-neutral-300">
                    #{order.id.substring(0, 8)}
                  </span>
                  <OrderStatusBadge status={order.status} />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm font-medium text-white">
                    {order.vip.name || "N/A"}
                  </span>
                  <TierBadge tier={order.vip.tier} />
                </div>
                <p className="text-xs text-neutral-500 mt-0.5">{order.vip.email}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onView(order.id);
                }}
                className="flex-shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-xl text-neutral-400 hover:bg-[#1A1A1A] hover:text-white transition-colors"
                aria-label="View order"
              >
                <Eye className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3 pt-3 border-t border-[#2A2A2A] flex items-center justify-between text-xs text-neutral-500">
              <span>{order.total_items} item{order.total_items !== 1 ? "s" : ""}</span>
              <span>{formatDate(order.created_at)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 데스크톱: 테이블 레이아웃 */}
      <div className="hidden lg:block overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#0F0F0F]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2A2A] bg-[#1A1A1A]">
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  VIP
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Items
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Created
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A2A]">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="transition-colors hover:bg-[#1A1A1A] cursor-pointer"
                  onClick={() => onView(order.id)}
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-mono text-neutral-300">
                    #{order.id.substring(0, 8)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">
                          {order.vip.name || "N/A"}
                        </span>
                        <TierBadge tier={order.vip.tier} />
                      </div>
                      <span className="text-xs text-neutral-500">
                        {order.vip.email}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                    {order.total_items} item{order.total_items !== 1 ? "s" : ""}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-400">
                    {formatDate(order.created_at)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onView(order.id);
                      }}
                      className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-400 rounded-xl hover:bg-[#2A2A2A] hover:text-white transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
