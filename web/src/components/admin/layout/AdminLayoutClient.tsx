"use client";

import { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";

interface AdminLayoutClientProps {
  children: React.ReactNode;
  adminName: string;
}

export function AdminLayoutClient({ children, adminName }: AdminLayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[var(--color-background)]">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area */}
      <div className="flex min-h-screen flex-1 flex-col" style={{ marginLeft: 'var(--sidebar-width, 0)' }}>
        <style>{`@media (min-width: 1024px) { :root { --sidebar-width: 16rem; } }`}</style>
        <AdminHeader
          adminName={adminName}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 overflow-x-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
