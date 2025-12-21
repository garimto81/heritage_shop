"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Package, User, MapPin, Truck } from "lucide-react";
import { TierBadge } from "@/components/admin/ui/TierBadge";
import { OrderStatusBadge } from "@/components/admin/ui/OrderStatusBadge";
import type { AdminOrderDetail, OrderStatus } from "@/types/admin";
import { cn } from "@/lib/utils";

// 유효한 이미지 URL인지 확인
function isValidImageUrl(url: string | undefined): boolean {
  if (!url) return false;
  // 절대 URL이거나 /로 시작하는 경로만 허용
  return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/");
}

interface OrderDetailProps {
  order: AdminOrderDetail;
  onStatusChange: (status: OrderStatus) => void;
}

export function OrderDetail({ order, onStatusChange }: OrderDetailProps) {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(
    order.status
  );

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as OrderStatus;
    setSelectedStatus(newStatus);
    onStatusChange(newStatus);
  };

  return (
    <div className="space-y-6">
      {/* Order Info Card */}
      <div className="rounded-xl border border-[#2A2A2A] bg-[var(--color-surface)] p-6">
        <div className="mb-4 flex items-center gap-2">
          <Package className="h-5 w-5 text-[var(--color-gold)]" />
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
            Order Information
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <p className="text-xs text-[var(--color-text-muted)]">Order ID</p>
            <p className="mt-1 font-mono text-sm text-[var(--color-text-primary)]">
              {order.id.substring(0, 8)}...
            </p>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-muted)]">Status</p>
            <div className="mt-1">
              <OrderStatusBadge status={order.status} />
            </div>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-muted)]">Created</p>
            <p className="mt-1 text-sm text-[var(--color-text-primary)]">
              {new Date(order.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* VIP Info Card */}
      <div className="rounded-xl border border-[#2A2A2A] bg-[var(--color-surface)] p-6">
        <div className="mb-4 flex items-center gap-2">
          <User className="h-5 w-5 text-[var(--color-gold)]" />
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
            VIP Information
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <p className="text-xs text-[var(--color-text-muted)]">Name</p>
            <p className="mt-1 text-sm text-[var(--color-text-primary)]">
              {order.vip.name || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-muted)]">Email</p>
            <p className="mt-1 text-sm text-[var(--color-text-primary)]">
              {order.vip.email}
            </p>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-muted)]">Tier</p>
            <div className="mt-1">
              <TierBadge tier={order.vip.tier} />
            </div>
          </div>
        </div>
      </div>

      {/* Order Items Table */}
      <div className="rounded-xl border border-[#2A2A2A] bg-[var(--color-surface)] p-6">
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-text-primary)]">
          Order Items
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2A2A]">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                  Size
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A2A]">
              {order.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {isValidImageUrl(item.image) && (
                        <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                          <Image
                            src={item.image!}
                            alt={item.product_name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <span className="text-sm text-[var(--color-text-primary)]">
                        {item.product_name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-[var(--color-text-primary)]">
                    {item.size}
                  </td>
                  <td className="px-4 py-4 text-sm text-[var(--color-text-primary)]">
                    {item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shipping Info Card */}
      <div className="rounded-xl border border-[#2A2A2A] bg-[var(--color-surface)] p-6">
        <div className="mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-[var(--color-gold)]" />
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
            Shipping Information
          </h2>
        </div>
        {order.shipping_address ? (
          <div className="space-y-2">
            <div>
              <p className="text-xs text-[var(--color-text-muted)]">
                Recipient
              </p>
              <p className="mt-1 text-sm text-[var(--color-text-primary)]">
                {order.shipping_address.name}
              </p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)]">Phone</p>
              <p className="mt-1 text-sm text-[var(--color-text-primary)]">
                {order.shipping_address.phone}
              </p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)]">Address</p>
              <p className="mt-1 text-sm text-[var(--color-text-primary)]">
                {order.shipping_address.address}
                {order.shipping_address.detail &&
                  `, ${order.shipping_address.detail}`}
              </p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {order.shipping_address.zipcode}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-[var(--color-text-secondary)]">
            No shipping information available
          </p>
        )}
      </div>

      {/* Tracking Info Card */}
      {(order.tracking_number || order.carrier) && (
        <div className="rounded-xl border border-[#2A2A2A] bg-[var(--color-surface)] p-6">
          <div className="mb-4 flex items-center gap-2">
            <Truck className="h-5 w-5 text-[var(--color-gold)]" />
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
              Tracking Information
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {order.carrier && (
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Carrier
                </p>
                <p className="mt-1 text-sm text-[var(--color-text-primary)]">
                  {order.carrier}
                </p>
              </div>
            )}
            {order.tracking_number && (
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Tracking Number
                </p>
                <p className="mt-1 font-mono text-sm text-[var(--color-text-primary)]">
                  {order.tracking_number}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Status Change */}
      <div className="rounded-xl border border-[#2A2A2A] bg-[var(--color-surface)] p-6">
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-text-primary)]">
          Change Order Status
        </h2>
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className={cn(
            "w-full rounded-lg border border-[#2A2A2A] bg-[var(--color-surface)] px-4 py-2 text-sm",
            "text-[var(--color-text-primary)]",
            "transition-colors",
            "focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]",
            "hover:border-[#3A3A3A]"
          )}
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Notes */}
      {order.notes && (
        <div className="rounded-xl border border-[#2A2A2A] bg-[var(--color-surface)] p-6">
          <h2 className="mb-4 text-lg font-semibold text-[var(--color-text-primary)]">
            Admin Notes
          </h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {order.notes}
          </p>
        </div>
      )}
    </div>
  );
}
