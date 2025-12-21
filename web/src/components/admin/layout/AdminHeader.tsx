"use client";

import { Menu } from "lucide-react";

interface AdminHeaderProps {
  adminName: string;
  onMenuClick?: () => void;
}

export function AdminHeader({ adminName, onMenuClick }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#2A2A2A] bg-[#0A0A0A]/95 backdrop-blur-md px-4 lg:px-8">
      {/* 모바일 메뉴 버튼 */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-[#1A1A1A] transition-all duration-200"
        aria-label="메뉴 열기"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* 데스크톱 빈 공간 */}
      <div className="hidden lg:block" />

      {/* 관리자 정보 */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-gold)] to-[#B8860B] text-black font-semibold text-sm shadow-lg shadow-[var(--color-gold)]/20">
          {adminName.charAt(0).toUpperCase()}
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-white">{adminName}</p>
          <p className="text-xs text-neutral-500">Administrator</p>
        </div>
      </div>
    </header>
  );
}
