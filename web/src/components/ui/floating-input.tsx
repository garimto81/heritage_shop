"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, type, label, error, id, ...props }, ref) => {
    const inputId = id || `floating-${label.replace(/\s+/g, "-").toLowerCase()}`;

    return (
      <div className="floating-group">
        <input
          type={type}
          id={inputId}
          className={cn(
            "floating-input peer",
            "font-[var(--font-montserrat)] font-light",
            error && "border-b-[var(--color-error)]",
            className
          )}
          ref={ref}
          placeholder=" "
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            "floating-label",
            error && "text-[var(--color-error)]"
          )}
        >
          {label}
        </label>
        <div className="absolute bottom-0 left-0 h-px w-0 bg-[var(--color-gold)] transition-all duration-500 peer-focus:w-full" />
        {error && (
          <p className="mt-1 text-xs text-[var(--color-error)]">{error}</p>
        )}
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";

export { FloatingInput };
