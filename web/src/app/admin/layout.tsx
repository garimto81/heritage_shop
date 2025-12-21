import { getAdminSession } from "@/lib/auth/admin-session";
import { AdminLayoutClient } from "@/components/admin/layout/AdminLayoutClient";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();

  // 세션 없으면 (로그인 페이지) children만 렌더링
  if (!session) {
    return <>{children}</>;
  }

  return (
    <AdminLayoutClient adminName={session.name || session.email}>
      {children}
    </AdminLayoutClient>
  );
}
