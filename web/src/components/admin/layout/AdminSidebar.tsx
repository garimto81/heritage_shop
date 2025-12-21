"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, ShoppingBag, LogOut, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/vips", icon: Users, label: "VIPs" },
  { href: "/admin/orders", icon: ShoppingBag, label: "Orders" },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    window.location.href = "/admin/auth/login";
  };

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  return (
    <>
      {/* 모바일 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* 사이드바 */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 bg-[#0F0F0F] border-r border-[#2A2A2A]",
          "transform transition-transform duration-300 ease-in-out",
          "lg:translate-x-0 lg:z-40",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* 로고 & 닫기 버튼 */}
        <div className="flex h-16 items-center justify-between border-b border-[#2A2A2A] px-6">
          <span className="text-xl font-bold text-[var(--color-gold)]">GGP Admin</span>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-[#2A2A2A] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 네비게이션 */}
        <nav className="flex flex-col gap-1 p-4">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-[var(--color-gold)]/20 to-[var(--color-gold)]/5 text-[var(--color-gold)] shadow-lg shadow-[var(--color-gold)]/10"
                    : "text-neutral-400 hover:bg-[#1A1A1A] hover:text-white"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive && "drop-shadow-[0_0_8px_var(--color-gold)]")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* 로그아웃 버튼 (하단 고정) */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-[#2A2A2A] p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-neutral-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
