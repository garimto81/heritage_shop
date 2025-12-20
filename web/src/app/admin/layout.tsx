import { getAdminSession } from "@/lib/auth/admin-session";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { AdminHeader } from "@/components/admin/layout/AdminHeader";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();

  // 세션 없으면 (로그인 페이지) children만 렌더링
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <AdminSidebar />
      <div className="ml-60">
        <AdminHeader adminName={session.name || session.email} />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
