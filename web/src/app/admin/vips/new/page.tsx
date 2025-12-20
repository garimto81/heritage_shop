"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { VipForm } from "@/components/admin/vips/VipForm";
import { InviteLinkModal } from "@/components/admin/vips/InviteLinkModal";

export default function NewVipPage() {
  const router = useRouter();
  const [modalData, setModalData] = useState<{
    isOpen: boolean;
    inviteUrl: string;
    vipEmail: string;
  }>({
    isOpen: false,
    inviteUrl: "",
    vipEmail: "",
  });

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-8 text-2xl font-bold text-[var(--color-text-primary)]">
        Create New VIP
      </h1>

      <div className="rounded-xl border border-[#2A2A2A] bg-[var(--color-surface)] p-6">
        <VipForm
          mode="create"
          onSuccess={(vip, inviteUrl) => {
            setModalData({
              isOpen: true,
              inviteUrl: inviteUrl || "",
              vipEmail: vip.email,
            });
          }}
          onCancel={() => router.push("/admin/vips")}
        />
      </div>

      <InviteLinkModal
        isOpen={modalData.isOpen}
        onClose={() => {
          setModalData({ ...modalData, isOpen: false });
          router.push("/admin/vips");
        }}
        inviteUrl={modalData.inviteUrl}
        vipEmail={modalData.vipEmail}
      />
    </div>
  );
}
