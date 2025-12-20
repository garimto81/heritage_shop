"use client";

import React, { useEffect } from "react";
import { AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  variant?: "default" | "destructive";
  isLoading?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  variant = "default",
  isLoading = false,
}: ConfirmModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-md rounded-xl border border-[#2A2A2A] bg-[var(--color-surface)] p-6 shadow-xl">
        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full",
              variant === "destructive"
                ? "bg-red-500/10"
                : "bg-blue-500/10"
            )}
          >
            {variant === "destructive" ? (
              <AlertTriangle className="h-6 w-6 text-red-500" />
            ) : (
              <Info className="h-6 w-6 text-blue-500" />
            )}
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-2 text-center text-xl font-bold text-[var(--color-text-primary)]">
          {title}
        </h2>

        {/* Message */}
        <p className="mb-6 text-center text-sm text-[var(--color-text-secondary)]">
          {message}
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(
              "flex-1",
              variant === "destructive" &&
                "bg-red-500 hover:bg-red-600 text-white"
            )}
          >
            {isLoading ? "Processing..." : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
