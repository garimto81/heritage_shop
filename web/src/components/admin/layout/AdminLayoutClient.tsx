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
    <div className="min-h-screen bg-[#0A0A0A]">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* 메인 컨텐츠 영역 - 사이드바 너비만큼 여백 확보 */}
      <div className="lg:ml-64 min-h-screen flex flex-col w-full lg:w-[calc(100%-16rem)] overflow-x-hidden">
        <AdminHeader
          adminName={adminName}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 p-4 lg:p-8 max-w-full overflow-x-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
