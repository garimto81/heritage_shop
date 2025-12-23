"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

/**
 * Toast 알림 Provider
 * 다크 테마 + 골드 액센트 스타일
 */
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[var(--color-surface)] group-[.toaster]:text-[var(--color-text-primary)] group-[.toaster]:border-[var(--color-border)] group-[.toaster]:shadow-lg group-[.toaster]:rounded-xl",
          description: "group-[.toast]:text-[var(--color-text-secondary)]",
          actionButton:
            "group-[.toast]:bg-[var(--color-gold)] group-[.toast]:text-[var(--color-background)]",
          cancelButton:
            "group-[.toast]:bg-[var(--color-border)] group-[.toast]:text-[var(--color-text-secondary)]",
          success:
            "group-[.toast]:border-l-4 group-[.toast]:border-l-[var(--color-success)]",
          error:
            "group-[.toast]:border-l-4 group-[.toast]:border-l-[var(--color-error)]",
          warning:
            "group-[.toast]:border-l-4 group-[.toast]:border-l-yellow-500",
          info: "group-[.toast]:border-l-4 group-[.toast]:border-l-blue-500",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
