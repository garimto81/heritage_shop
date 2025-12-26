"use client";

import { Menu, GitCommit } from "lucide-react";

interface AdminHeaderProps {
  adminName: string;
  onMenuClick?: () => void;
}

export function AdminHeader({ adminName, onMenuClick }: AdminHeaderProps) {
  const commitHash = process.env.NEXT_PUBLIC_COMMIT_HASH || "dev";
  const commitMessage = process.env.NEXT_PUBLIC_COMMIT_MESSAGE || "";

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[var(--color-border)] bg-white/95 px-4 backdrop-blur-md lg:px-8">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-[var(--color-text-muted)] transition-all duration-200 hover:bg-[var(--color-background)] hover:text-[var(--color-luxury-black)] lg:hidden"
        aria-label="메뉴 열기"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Version info */}
      <div className="hidden items-center gap-2 rounded border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-1.5 lg:flex">
        <GitCommit className="h-3.5 w-3.5 text-[var(--color-gold)]" />
        <span className="font-mono text-[10px] text-[var(--color-gold)]">{commitHash}</span>
        <span className="max-w-[300px] truncate text-[10px] text-[var(--color-text-muted)]">{commitMessage}</span>
      </div>

      {/* Admin info */}
      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-[var(--color-luxury-black)]">{adminName}</p>
          <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">Administrator</p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-gold-light)] to-[var(--color-gold)] text-sm font-semibold text-[var(--color-luxury-black)]">
          {adminName.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
