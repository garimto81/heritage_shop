"use client";

import React from "react";
import { SearchInput } from "@/components/admin/shared/SearchInput";
import { cn } from "@/lib/utils";

interface VipFiltersProps {
  tierFilter: "all" | "silver" | "gold";
  statusFilter: "all" | "active" | "inactive";
  searchQuery: string;
  onTierChange: (tier: "all" | "silver" | "gold") => void;
  onStatusChange: (status: "all" | "active" | "inactive") => void;
  onSearchChange: (query: string) => void;
}

export function VipFilters({
  tierFilter,
  statusFilter,
  searchQuery,
  onTierChange,
  onStatusChange,
  onSearchChange,
}: VipFiltersProps) {
  return (
    <div className="flex items-center gap-4">
      {/* Tier Filter */}
      <div className="flex items-center gap-2">
        <label
          htmlFor="tier-filter"
          className="text-sm font-medium text-[var(--color-text-secondary)]"
        >
          Tier:
        </label>
        <select
          id="tier-filter"
          value={tierFilter}
          onChange={(e) =>
            onTierChange(e.target.value as "all" | "silver" | "gold")
          }
          className={cn(
            "rounded-lg border border-[#2A2A2A] bg-[var(--color-surface)] px-3 py-2 text-sm",
            "text-[var(--color-text-primary)]",
            "transition-colors",
            "focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]",
            "hover:border-[#3A3A3A]"
          )}
        >
          <option value="all">All Tiers</option>
          <option value="silver">Silver</option>
          <option value="gold">Gold</option>
        </select>
      </div>

      {/* Status Filter */}
      <div className="flex items-center gap-2">
        <label
          htmlFor="status-filter"
          className="text-sm font-medium text-[var(--color-text-secondary)]"
        >
          Status:
        </label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) =>
            onStatusChange(e.target.value as "all" | "active" | "inactive")
          }
          className={cn(
            "rounded-lg border border-[#2A2A2A] bg-[var(--color-surface)] px-3 py-2 text-sm",
            "text-[var(--color-text-primary)]",
            "transition-colors",
            "focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]",
            "hover:border-[#3A3A3A]"
          )}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Search */}
      <div className="ml-auto w-80">
        <SearchInput
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search by name or email..."
        />
      </div>
    </div>
  );
}
