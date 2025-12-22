"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VipFilters } from "@/components/admin/vips/VipFilters";
import { VipsTable } from "@/components/admin/vips/VipsTable";
import { Pagination } from "@/components/admin/shared/Pagination";
import type { VipListResponse, VipFilters as VipFiltersType } from "@/types/admin";

interface VipsClientProps {
  initialData: VipListResponse;
}

export function VipsClient({ initialData }: VipsClientProps) {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [filters, setFilters] = useState<VipFiltersType>({
    page: 1,
    limit: 20,
  });
  const [tierFilter, setTierFilter] = useState<"all" | "silver" | "gold">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchVips = useCallback(async (newFilters: VipFiltersType) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (newFilters.page) params.set("page", String(newFilters.page));
      if (newFilters.limit) params.set("limit", String(newFilters.limit));
      if (newFilters.tier) params.set("tier", newFilters.tier);
      if (newFilters.is_active !== undefined)
        params.set("is_active", String(newFilters.is_active));
      if (newFilters.search) params.set("search", newFilters.search);

      const res = await fetch(`/api/admin/vips?${params.toString()}`);
      const result = await res.json();

      if (result.success) {
        setData({
          vips: result.vips,
          total: result.total,
          page: result.page,
          limit: result.limit,
        });
      }
    } catch (error) {
      console.error("Failed to fetch VIPs:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleTierChange = useCallback(
    (tier: "all" | "silver" | "gold") => {
      setTierFilter(tier);
      const newFilters: VipFiltersType = {
        ...filters,
        tier: tier === "all" ? undefined : tier,
        page: 1,
      };
      setFilters(newFilters);
      fetchVips(newFilters);
    },
    [filters, fetchVips]
  );

  const handleStatusChange = useCallback(
    (status: "all" | "active" | "inactive") => {
      setStatusFilter(status);
      const newFilters: VipFiltersType = {
        ...filters,
        is_active: status === "all" ? undefined : status === "active",
        page: 1,
      };
      setFilters(newFilters);
      fetchVips(newFilters);
    },
    [filters, fetchVips]
  );

  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchQuery(query);
      const newFilters: VipFiltersType = {
        ...filters,
        search: query || undefined,
        page: 1,
      };
      setFilters(newFilters);
      fetchVips(newFilters);
    },
    [filters, fetchVips]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      const newFilters: VipFiltersType = {
        ...filters,
        page,
      };
      setFilters(newFilters);
      fetchVips(newFilters);
    },
    [filters, fetchVips]
  );

  const handleEdit = useCallback(
    (id: string) => {
      router.push(`/admin/vips/${id}/edit`);
    },
    [router]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      if (!confirm("Are you sure you want to delete this VIP?")) {
        return;
      }

      try {
        const res = await fetch(`/api/admin/vips/${id}`, {
          method: "DELETE",
        });
        const result = await res.json();

        if (result.success) {
          fetchVips(filters);
        } else {
          alert(`Failed to delete VIP: ${result.error}`);
        }
      } catch (error) {
        console.error("Failed to delete VIP:", error);
        alert("Failed to delete VIP");
      }
    },
    [filters, fetchVips]
  );

  const handleVipStatusChange = useCallback(
    async (id: string, isActive: boolean) => {
      try {
        const res = await fetch(`/api/admin/vips/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ is_active: isActive }),
        });
        const result = await res.json();

        if (result.success) {
          fetchVips(filters);
        } else {
          alert(`Failed to update VIP status: ${result.error}`);
        }
      } catch (error) {
        console.error("Failed to update VIP status:", error);
        alert("Failed to update VIP status");
      }
    },
    [filters, fetchVips]
  );

  const handleCopyLink = useCallback((token: string) => {
    const inviteUrl = `${window.location.origin}/invite/${token}`;
    navigator.clipboard.writeText(inviteUrl);
    alert("Invite link copied to clipboard!");
  }, []);

  const totalPages = Math.ceil(data.total / data.limit);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
          VIP Management
        </h1>
        <Link href="/admin/vips/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add VIP
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <VipFilters
        tierFilter={tierFilter}
        statusFilter={statusFilter}
        searchQuery={searchQuery}
        onTierChange={handleTierChange}
        onStatusChange={handleStatusChange}
        onSearchChange={handleSearchChange}
      />

      {/* Loading State */}
      {isLoading && (
        <div className="rounded-xl border border-[#2A2A2A] bg-[var(--color-surface)] p-12 text-center">
          <p className="text-[var(--color-text-secondary)]">Loading...</p>
        </div>
      )}

      {/* Table */}
      {!isLoading && (
        <VipsTable
          vips={data.vips}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleVipStatusChange}
          onCopyLink={handleCopyLink}
        />
      )}

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
