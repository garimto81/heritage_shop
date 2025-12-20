"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface StatusToggleProps {
  isActive: boolean;
  onChange: (isActive: boolean) => void;
  disabled?: boolean;
  showLabel?: boolean;
}

export function StatusToggle({
  isActive,
  onChange,
  disabled = false,
  showLabel = false,
}: StatusToggleProps) {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!isActive);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        role="switch"
        aria-checked={isActive}
        onClick={handleToggle}
        disabled={disabled}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]",
          disabled && "cursor-not-allowed opacity-50",
          !disabled && "cursor-pointer",
          isActive ? "bg-green-500" : "bg-gray-600"
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
            isActive ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>

      {showLabel && (
        <span
          className={cn(
            "text-sm font-medium",
            isActive ? "text-green-400" : "text-[var(--color-text-muted)]"
          )}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      )}
    </div>
  );
}
