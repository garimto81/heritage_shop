"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { VipForm } from "@/components/admin/vips/VipForm";
import { ConfirmModal } from "@/components/admin/shared/ConfirmModal";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowLeft } from "lucide-react";
import type { AdminVip } from "@/types/admin";

interface EditVipClientProps {
  vip: AdminVip;
}

export function EditVipClient({ vip }: EditVipClientProps) {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSuccess = useCallback(
    (updatedVip: AdminVip) => {
      router.push("/admin/vips");
      router.refresh();
    },
    [router]
  );

  const handleCancel = useCallback(() => {
    router.push("/admin/vips");
  }, [router]);

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/vips/${vip.id}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (result.success) {
        router.push("/admin/vips");
        router.refresh();
      } else {
        if (result.error === "has_orders") {
          alert(
            "Cannot delete VIP with existing orders. Please cancel or complete all orders first."
          );
        } else {
          alert("Failed to delete VIP. Please try again.");
        }
      }
    } catch (error) {
      console.error("Failed to delete VIP:", error);
      alert("Failed to delete VIP. Please try again.");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  }, [vip.id, router]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleCancel}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#2A2A2A] bg-[var(--color-surface)] text-[var(--color-text-secondary)] transition-colors hover:border-[#3A3A3A] hover:text-[var(--color-text-primary)]"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Edit VIP
          </h1>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowDeleteModal(true)}
          className="border-red-500/50 text-red-500 hover:bg-red-500/10 hover:border-red-500"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete VIP
        </Button>
      </div>

      {/* Form */}
      <div className="rounded-xl border border-[#2A2A2A] bg-[var(--color-surface)] p-6">
        <VipForm
          mode="edit"
          initialData={vip}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete VIP"
        message="Are you sure you want to delete this VIP? This action cannot be undone. VIPs with existing orders cannot be deleted."
        confirmLabel="Delete"
        variant="destructive"
        isLoading={isDeleting}
      />
    </div>
  );
}
