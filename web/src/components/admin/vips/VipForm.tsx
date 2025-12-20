"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { StatusToggle } from "@/components/admin/ui/StatusToggle";
import type { AdminVip, CreateVipInput } from "@/types/admin";
import { cn } from "@/lib/utils";

interface VipFormProps {
  mode: "create" | "edit";
  initialData?: AdminVip;
  onSuccess: (vip: AdminVip, inviteUrl?: string) => void;
  onCancel: () => void;
}

export function VipForm({
  mode,
  initialData,
  onSuccess,
  onCancel,
}: VipFormProps) {
  const [email, setEmail] = useState(initialData?.email || "");
  const [name, setName] = useState(initialData?.name || "");
  const [tier, setTier] = useState<"silver" | "gold">(
    initialData?.tier || "silver"
  );
  const [regType, setRegType] = useState<"email_invite" | "qr_code">(
    initialData?.reg_type || "email_invite"
  );
  const [isActive, setIsActive] = useState(initialData?.is_active ?? true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setIsSubmitting(true);

      try {
        if (mode === "create") {
          const input: CreateVipInput = {
            email,
            name: name || undefined,
            tier,
            reg_type: regType,
          };

          const res = await fetch("/api/admin/vips", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
          });

          const result = await res.json();

          if (result.success) {
            onSuccess(result.vip, result.invite_url);
          } else {
            setError(
              result.error === "duplicate_email"
                ? "Email already exists"
                : "Failed to create VIP"
            );
          }
        } else {
          // Edit mode
          const res = await fetch(`/api/admin/vips/${initialData?.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              name: name || undefined,
              tier,
              is_active: isActive,
            }),
          });

          const result = await res.json();

          if (result.success) {
            onSuccess(result.vip);
          } else {
            setError(
              result.error === "duplicate_email"
                ? "Email already exists"
                : result.error === "not_found"
                  ? "VIP not found"
                  : "Failed to update VIP"
            );
          }
        }
      } catch (err) {
        console.error("Form submission error:", err);
        setError("An unexpected error occurred");
      } finally {
        setIsSubmitting(false);
      }
    },
    [mode, email, name, tier, regType, isActive, initialData?.id, onSuccess]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-[var(--color-text-primary)]"
        >
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={cn(
            "w-full rounded-lg border border-[#2A2A2A] bg-[var(--color-surface)] px-4 py-2 text-sm",
            "text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]",
            "transition-colors",
            "focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]",
            "hover:border-[#3A3A3A]"
          )}
          placeholder="vip@example.com"
        />
      </div>

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-[var(--color-text-primary)]"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={cn(
            "w-full rounded-lg border border-[#2A2A2A] bg-[var(--color-surface)] px-4 py-2 text-sm",
            "text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]",
            "transition-colors",
            "focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]",
            "hover:border-[#3A3A3A]"
          )}
          placeholder="John Doe"
        />
      </div>

      {/* Tier */}
      <div>
        <label className="mb-2 block text-sm font-medium text-[var(--color-text-primary)]">
          Tier <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="tier"
              value="silver"
              checked={tier === "silver"}
              onChange={(e) => setTier(e.target.value as "silver" | "gold")}
              className="h-4 w-4 border-[#2A2A2A] bg-[var(--color-surface)] text-[var(--color-gold)] focus:ring-[var(--color-gold)] focus:ring-offset-[var(--color-background)]"
            />
            <span className="text-sm text-[var(--color-text-primary)]">
              Silver (3 items limit)
            </span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="tier"
              value="gold"
              checked={tier === "gold"}
              onChange={(e) => setTier(e.target.value as "silver" | "gold")}
              className="h-4 w-4 border-[#2A2A2A] bg-[var(--color-surface)] text-[var(--color-gold)] focus:ring-[var(--color-gold)] focus:ring-offset-[var(--color-background)]"
            />
            <span className="text-sm text-[var(--color-text-primary)]">
              Gold (5 items limit)
            </span>
          </label>
        </div>
      </div>

      {/* Registration Type (Create only) */}
      {mode === "create" && (
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--color-text-primary)]">
            Registration Type <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="regType"
                value="email_invite"
                checked={regType === "email_invite"}
                onChange={(e) =>
                  setRegType(e.target.value as "email_invite" | "qr_code")
                }
                className="h-4 w-4 border-[#2A2A2A] bg-[var(--color-surface)] text-[var(--color-gold)] focus:ring-[var(--color-gold)] focus:ring-offset-[var(--color-background)]"
              />
              <span className="text-sm text-[var(--color-text-primary)]">
                Email Invite
              </span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="regType"
                value="qr_code"
                checked={regType === "qr_code"}
                onChange={(e) =>
                  setRegType(e.target.value as "email_invite" | "qr_code")
                }
                className="h-4 w-4 border-[#2A2A2A] bg-[var(--color-surface)] text-[var(--color-gold)] focus:ring-[var(--color-gold)] focus:ring-offset-[var(--color-background)]"
              />
              <span className="text-sm text-[var(--color-text-primary)]">
                QR Code
              </span>
            </label>
          </div>
        </div>
      )}

      {/* Status (Edit only) */}
      {mode === "edit" && (
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--color-text-primary)]">
            Status
          </label>
          <StatusToggle
            isActive={isActive}
            onChange={setIsActive}
            showLabel={true}
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : mode === "create"
              ? "Create VIP"
              : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
