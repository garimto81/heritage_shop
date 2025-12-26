"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, ShoppingBag, LogOut, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/vips", icon: Users, label: "VIP List" },
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
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 transform border-r border-[var(--color-border)] bg-[var(--color-surface)] transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:z-40 lg:translate-x-0"
        )}
      >
        {/* Logo & close button */}
        <div className="flex h-14 items-center justify-between border-b border-[var(--color-border)] px-5">
          <div className="flex items-center gap-2">
            {/* Logo icon */}
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1" />
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1" />
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1" />
            </svg>
            <span className="font-[var(--font-playfair)] text-sm font-medium uppercase tracking-[0.15em] text-[var(--color-luxury-black)]">
              GGP Heritage
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-background)] hover:text-[var(--color-luxury-black)] lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-0.5 p-3">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] transition-all duration-200",
                  isActive
                    ? "border-b border-[var(--color-luxury-black)] text-[var(--color-luxury-black)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-luxury-black)]"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout button (fixed at bottom) */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-[var(--color-border)] p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)] transition-all duration-200 hover:text-red-500"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
