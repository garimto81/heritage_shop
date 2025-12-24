"use client";

import React from "react";
import { Edit, Trash2, Link as LinkIcon, Users } from "lucide-react";
import { TierBadge } from "@/components/admin/ui/TierBadge";
import { StatusToggle } from "@/components/admin/ui/StatusToggle";
import type { AdminVip } from "@/types/admin";
import { cn } from "@/lib/utils";

interface VipsTableProps {
  vips: AdminVip[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, isActive: boolean) => void;
  onCopyLink: (code: string) => void;
}

export function VipsTable({
  vips,
  onEdit,
  onDelete,
  onStatusChange,
  onCopyLink,
}: VipsTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  if (vips.length === 0) {
    return (
      <div className="rounded-2xl border border-[#2A2A2A] bg-[#0F0F0F] p-12 text-center">
        <Users className="h-12 w-12 mx-auto text-neutral-600 mb-4" />
        <p className="text-neutral-400">No VIPs found</p>
      </div>
    );
  }

  return (
    <>
      {/* 모바일: 카드 레이아웃 */}
      <div className="lg:hidden space-y-3">
        {vips.map((vip) => (
          <div
            key={vip.id}
            className="rounded-2xl border border-[#2A2A2A] bg-[#0F0F0F] p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800 text-sm font-medium text-white">
                  {(vip.name || vip.email).charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-white truncate">
                      {vip.name || "Unnamed"}
                    </span>
                    <TierBadge tier={vip.tier} />
                  </div>
                  <p className="text-sm text-neutral-500 truncate">{vip.email}</p>
                </div>
              </div>
              <StatusToggle
                isActive={vip.is_active}
                onChange={(isActive) => onStatusChange(vip.id, isActive)}
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-neutral-500">
                Created {formatDate(vip.created_at)}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEdit(vip.id)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-neutral-400 hover:bg-[#1A1A1A] hover:text-white transition-colors"
                  aria-label="Edit VIP"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onCopyLink(vip.invite_code)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-neutral-400 hover:bg-[#1A1A1A] hover:text-[var(--color-gold)] transition-colors"
                  aria-label="Copy invite link"
                >
                  <LinkIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDelete(vip.id)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-neutral-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                  aria-label="Delete VIP"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
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
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Tier
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Status
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
              {vips.map((vip) => (
                <tr
                  key={vip.id}
                  className="transition-colors hover:bg-[#1A1A1A]"
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                    {vip.email}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-400">
                    {vip.name || "-"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <TierBadge tier={vip.tier} />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <StatusToggle
                      isActive={vip.is_active}
                      onChange={(isActive) => onStatusChange(vip.id, isActive)}
                    />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-400">
                    {formatDate(vip.created_at)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onEdit(vip.id)}
                        className={cn(
                          "inline-flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
                          "text-neutral-400 hover:bg-[#2A2A2A] hover:text-white"
                        )}
                        aria-label="Edit VIP"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onCopyLink(vip.invite_code)}
                        className={cn(
                          "inline-flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
                          "text-neutral-400 hover:bg-[#2A2A2A] hover:text-[var(--color-gold)]"
                        )}
                        aria-label="Copy invite link"
                      >
                        <LinkIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete(vip.id)}
                        className={cn(
                          "inline-flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
                          "text-neutral-400 hover:bg-red-500/10 hover:text-red-400"
                        )}
                        aria-label="Delete VIP"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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
