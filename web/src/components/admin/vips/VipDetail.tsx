"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { Copy, RefreshCw, Edit, Ban } from "lucide-react";
import type { AdminVip, AdminOrder } from "@/types/admin";

interface VipDetailProps {
  vip: AdminVip;
  orders: AdminOrder[];
  onRegenerateToken: () => void;
}

const tierLabels = {
  silver: "Silver",
  gold: "Gold",
};

const tierColors = {
  silver: "bg-neutral-500/10 text-neutral-400 border-neutral-700",
  gold: "bg-yellow-500/10 text-yellow-500 border-yellow-900",
};

const statusLabels: Record<string, string> = {
  pending: "대기",
  processing: "처리중",
  shipped: "배송중",
  delivered: "배송완료",
  cancelled: "취소",
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-500",
  processing: "bg-blue-500/10 text-blue-500",
  shipped: "bg-purple-500/10 text-purple-500",
  delivered: "bg-green-500/10 text-green-500",
  cancelled: "bg-red-500/10 text-red-500",
};

export function VipDetail({ vip, orders, onRegenerateToken }: VipDetailProps) {
  const [copied, setCopied] = useState(false);

  const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/invite/${vip.invite_code}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* VIP Information Card */}
      <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
        <h2 className="mb-4 text-xl font-semibold text-white">
          VIP Information
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm text-neutral-400">Email</label>
            <p className="mt-1 text-white">{vip.email}</p>
          </div>

          <div>
            <label className="text-sm text-neutral-400">Name</label>
            <p className="mt-1 text-white">{vip.name || "Not provided"}</p>
          </div>

          <div>
            <label className="text-sm text-neutral-400">Tier</label>
            <div className="mt-1">
              <span
                className={`inline-block rounded-full border px-3 py-1 text-sm font-medium ${
                  tierColors[vip.tier]
                }`}
              >
                {tierLabels[vip.tier]}
              </span>
            </div>
          </div>

          <div>
            <label className="text-sm text-neutral-400">Status</label>
            <div className="mt-1">
              <span
                className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                  vip.is_active
                    ? "bg-green-500/10 text-green-500"
                    : "bg-red-500/10 text-red-500"
                }`}
              >
                {vip.is_active ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          <div>
            <label className="text-sm text-neutral-400">Created At</label>
            <p className="mt-1 text-white">
              {formatDistanceToNow(new Date(vip.created_at), {
                addSuffix: true,
                locale: ko,
              })}
            </p>
          </div>

          <div>
            <label className="text-sm text-neutral-400">Registration Type</label>
            <p className="mt-1 text-white">
              {vip.reg_type === "email_invite" ? "Email Invite" : "QR Code"}
            </p>
          </div>
        </div>
      </div>

      {/* Invite Link Card */}
      <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Invite Link</h2>
          <button
            onClick={onRegenerateToken}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <RefreshCw className="h-4 w-4" />
            Regenerate
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            value={inviteUrl}
            readOnly
            className="flex-1 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm text-white"
          />
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm text-white transition-colors hover:bg-neutral-700"
          >
            <Copy className="h-4 w-4" />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Order History Card */}
      <div className="rounded-lg border border-neutral-800 bg-neutral-900">
        <div className="border-b border-neutral-800 p-6">
          <h2 className="text-xl font-semibold text-white">Order History</h2>
        </div>

        {orders.length === 0 ? (
          <div className="p-8 text-center text-neutral-500">
            No orders yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-neutral-800 text-left">
                <tr>
                  <th className="p-4 text-sm font-medium text-neutral-400">
                    Order ID
                  </th>
                  <th className="p-4 text-sm font-medium text-neutral-400">
                    Status
                  </th>
                  <th className="p-4 text-sm font-medium text-neutral-400">
                    Items
                  </th>
                  <th className="p-4 text-sm font-medium text-neutral-400">
                    Created
                  </th>
                  <th className="p-4 text-sm font-medium text-neutral-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-800/50">
                    <td className="p-4">
                      <span className="font-mono text-sm text-neutral-300">
                        #{order.id.slice(0, 8)}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          statusColors[order.status]
                        }`}
                      >
                        {statusLabels[order.status]}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-neutral-300">
                      {order.total_items} items
                    </td>
                    <td className="p-4 text-sm text-neutral-300">
                      {formatDistanceToNow(new Date(order.created_at), {
                        addSuffix: true,
                        locale: ko,
                      })}
                    </td>
                    <td className="p-4">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-sm text-blue-500 hover:text-blue-400"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Link
          href={`/admin/vips/${vip.id}/edit`}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
        >
          <Edit className="h-4 w-4" />
          Edit VIP
        </Link>
        <button
          className="flex items-center gap-2 rounded-lg border border-red-600 bg-transparent px-6 py-3 font-medium text-red-500 transition-colors hover:bg-red-600/10"
          onClick={() => {
            if (confirm("Are you sure you want to deactivate this VIP?")) {
              // TODO: Implement deactivate
            }
          }}
        >
          <Ban className="h-4 w-4" />
          Deactivate
        </button>
      </div>
    </div>
  );
}
