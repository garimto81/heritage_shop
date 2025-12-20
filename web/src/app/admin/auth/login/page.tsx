import { LoginForm } from "./login-form";

export const metadata = {
  title: "Admin Login - GGP Heritage Mall",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)]">
      <div className="w-full max-w-md">
        {/* 로고 */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[var(--color-gold)]">GGP Heritage Mall</h1>
          <p className="mt-2 text-[var(--color-text-secondary)]">Admin Portal</p>
        </div>

        {/* 로그인 폼 */}
        <div className="rounded-xl border border-[#2A2A2A] bg-[var(--color-surface)] p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
