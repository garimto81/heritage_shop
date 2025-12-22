import { LoginForm } from "./login-form";
import { Shield } from "lucide-react";

export const metadata = {
  title: "Admin Login - GGP Heritage Mall",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-4 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-[var(--color-gold)] opacity-[0.03] rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500 opacity-[0.03] rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/20 to-transparent" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* 로고 */}
        <div className="mb-10 text-center">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-[var(--color-gold)] opacity-20 rounded-2xl blur-xl scale-110" />
            <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-[var(--color-gold)] via-[#E5C158] to-[var(--color-gold-dark)] rounded-2xl flex items-center justify-center shadow-xl shadow-[var(--color-gold)]/20">
              <span className="font-heading font-bold text-3xl text-[var(--color-background)]">GG</span>
            </div>
          </div>
          <h1 className="font-heading text-3xl bg-gradient-to-r from-[var(--color-gold)] via-[#E5C158] to-[var(--color-gold)] bg-clip-text text-transparent">
            GGP Heritage Mall
          </h1>
          <div className="mt-3 flex items-center justify-center gap-2 text-[var(--color-text-secondary)]">
            <Shield className="w-4 h-4" />
            <span>Admin Portal</span>
          </div>
        </div>

        {/* 로그인 폼 */}
        <div className="rounded-2xl border border-[#2A2A2A] bg-gradient-to-b from-[var(--color-surface)] to-[#0F0F0F] p-8 shadow-xl shadow-black/20">
          <LoginForm />
        </div>

        {/* 하단 안내 */}
        <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
          Authorized personnel only
        </p>
      </div>
    </div>
  );
}
