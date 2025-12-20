"use client";

import React, { useCallback } from "react";
import { CheckCircle, Copy, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface InviteLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  inviteUrl: string;
  vipEmail: string;
}

export function InviteLinkModal({
  isOpen,
  onClose,
  inviteUrl,
  vipEmail,
}: InviteLinkModalProps) {
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(inviteUrl);
    alert("Invite link copied to clipboard!");
  }, [inviteUrl]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/80"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className={cn(
            "relative w-full max-w-lg rounded-xl border border-[#2A2A2A] bg-[var(--color-surface)] p-6 shadow-2xl",
            "animate-in fade-in-0 zoom-in-95"
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className={cn(
              "absolute right-4 top-4 rounded-lg p-1 transition-colors",
              "text-[var(--color-text-muted)] hover:bg-[#2A2A2A] hover:text-[var(--color-text-primary)]"
            )}
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Success Icon */}
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-green-500/10 p-3">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
          </div>

          {/* Title */}
          <h2
            id="modal-title"
            className="mb-2 text-center text-xl font-bold text-[var(--color-text-primary)]"
          >
            VIP Created Successfully!
          </h2>

          {/* Description */}
          <p className="mb-6 text-center text-sm text-[var(--color-text-secondary)]">
            An invite link has been generated for{" "}
            <span className="font-medium text-[var(--color-text-primary)]">
              {vipEmail}
            </span>
          </p>

          {/* Invite Link */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-[var(--color-text-primary)]">
              Invite Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inviteUrl}
                readOnly
                className={cn(
                  "flex-1 rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2 text-sm",
                  "text-[var(--color-text-primary)]",
                  "focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
                )}
              />
              <Button
                onClick={handleCopy}
                size="icon"
                variant="outline"
                aria-label="Copy invite link"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Close Action */}
          <div className="flex justify-center">
            <Button onClick={onClose} className="min-w-[120px]">
              Close
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
