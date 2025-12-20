"use client";

import React from "react";
import { Edit, Trash2, Link as LinkIcon } from "lucide-react";
import { TierBadge } from "@/components/admin/ui/TierBadge";
import { StatusToggle } from "@/components/admin/ui/StatusToggle";
import type { AdminVip } from "@/types/admin";
import { cn } from "@/lib/utils";

interface VipsTableProps {
  vips: AdminVip[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, isActive: boolean) => void;
  onCopyLink: (token: string) => void;
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
      <div className="rounded-xl border border-[#2A2A2A] bg-[var(--color-surface)] p-12 text-center">
        <p className="text-[var(--color-text-secondary)]">No VIPs found</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#2A2A2A] bg-[var(--color-surface)]">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2A2A2A] bg-[#1A1A1A]">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)]">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)]">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)]">
                Tier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)]">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)]">
                Created
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2A2A]">
            {vips.map((vip) => (
              <tr
                key={vip.id}
                className="transition-colors hover:bg-[#1a1a1a]"
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm text-[var(--color-text-primary)]">
                  {vip.email}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-[var(--color-text-secondary)]">
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
                <td className="whitespace-nowrap px-6 py-4 text-sm text-[var(--color-text-secondary)]">
                  {formatDate(vip.created_at)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(vip.id)}
                      className={cn(
                        "inline-flex h-8 w-8 items-center justify-center rounded transition-colors",
                        "text-[var(--color-text-secondary)] hover:bg-[#2A2A2A] hover:text-[var(--color-text-primary)]"
                      )}
                      aria-label="Edit VIP"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onCopyLink(vip.invite_token)}
                      className={cn(
                        "inline-flex h-8 w-8 items-center justify-center rounded transition-colors",
                        "text-[var(--color-text-secondary)] hover:bg-[#2A2A2A] hover:text-[var(--color-gold)]"
                      )}
                      aria-label="Copy invite link"
                    >
                      <LinkIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(vip.id)}
                      className={cn(
                        "inline-flex h-8 w-8 items-center justify-center rounded transition-colors",
                        "text-[var(--color-text-secondary)] hover:bg-red-500/10 hover:text-red-500"
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
  );
}
