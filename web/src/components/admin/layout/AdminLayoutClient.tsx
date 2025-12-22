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
    <div className="min-h-screen bg-[#0A0A0A] flex">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* 메인 컨텐츠 영역 - 사이드바 너비만큼 여백 확보 (lg:ml-64 = 16rem = 256px) */}
      <div className="flex-1 min-h-screen flex flex-col" style={{ marginLeft: 'var(--sidebar-width, 0)' }}>
        <style>{`@media (min-width: 1024px) { :root { --sidebar-width: 16rem; } }`}</style>
        <AdminHeader
          adminName={adminName}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 p-4 lg:p-8 overflow-x-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
