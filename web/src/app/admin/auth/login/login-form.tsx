"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FloatingInput } from "@/components/ui/floating-input";
import { ArrowRight, Loader2 } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.success) {
        const errorMessages: Record<string, string> = {
          missing_credentials: "이메일과 비밀번호를 입력해주세요.",
          invalid_credentials: "이메일 또는 비밀번호가 올바르지 않습니다.",
          not_admin: "관리자 권한이 없습니다.",
          admin_inactive: "비활성화된 관리자 계정입니다.",
          server_error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        };
        setError(errorMessages[data.error] || "로그인에 실패했습니다.");
        return;
      }

      router.push("/admin/dashboard");
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-0">
      {/* Error Message */}
      {error && (
        <div className="mb-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Email */}
      <FloatingInput
        id="email"
        type="email"
        label="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={isLoading}
        autoComplete="email"
      />

      {/* Password */}
      <FloatingInput
        id="password"
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={isLoading}
        autoComplete="current-password"
      />

      {/* Remember Me / Forgot Password Row */}
      <div className="flex items-center justify-between pb-6 pt-2">
        <label className="flex cursor-pointer items-center gap-2.5">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-3.5 w-3.5 cursor-pointer border border-[var(--color-border)] bg-transparent accent-[var(--color-gold)]"
          />
          <span className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
            Remember Me
          </span>
        </label>
        <button
          type="button"
          className="border-b border-transparent text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-gold-dark)] hover:text-[var(--color-gold-dark)]"
        >
          Forgot Password?
        </button>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="luxury"
        size="luxury"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Authenticating...
          </>
        ) : (
          <>
            Enter Portal
            <ArrowRight className="ml-3 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
