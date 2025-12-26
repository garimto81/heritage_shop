import { LoginForm } from "./login-form";
import { Diamond } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Admin Login - GG POKER",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          {/* Logo Icon */}
          <div className="flex h-7 w-7 rotate-45 items-center justify-center border border-[var(--color-luxury-black)]">
            <div className="h-3.5 w-3.5 -rotate-45 bg-[var(--color-luxury-black)]" />
          </div>
          {/* Logo Text */}
          <div className="leading-none">
            <h1 className="font-[var(--font-playfair)] text-lg font-semibold tracking-[0.15em] text-[var(--color-luxury-black)]">
              GGP
            </h1>
            <span className="text-[8px] uppercase tracking-[0.35em] text-[var(--color-gold-dark)]">
              Heritage
            </span>
          </div>
        </div>
        {/* Status Badge */}
        <div className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/50 px-3 py-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
          <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
            System Secure
          </span>
        </div>
      </header>

      {/* Main Content - 50:50 Split */}
      <main className="mx-6 grid min-h-[calc(100vh-100px)] grid-cols-1 overflow-hidden shadow-sharp lg:grid-cols-2">
        {/* Left: Image Panel */}
        <div className="relative hidden bg-black lg:block">
          {/* Background Image */}
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
            alt="Luxury boutique"
            fill
            className="object-cover opacity-85"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30" />
          {/* Content */}
          <div className="absolute bottom-10 left-8 right-8 text-white">
            <div className="mb-6 h-px w-10 bg-[var(--color-gold)]" />
            <p className="font-[var(--font-cormorant)] text-xl font-light italic leading-relaxed text-white/95">
              &ldquo;True luxury requires genuine materials and the craftsman&rsquo;s sincerity.&rdquo;
            </p>
            <span className="mt-4 block text-[9px] uppercase tracking-[0.35em] text-[var(--color-gold-light)]">
              The Heritage Collection
            </span>
          </div>
        </div>

        {/* Right: Form Panel */}
        <div className="relative flex flex-col justify-center bg-[var(--color-surface)] px-8 py-12 lg:px-12">
          {/* Diamond Icon (decorative) */}
          <Diamond className="absolute right-6 top-6 h-8 w-8 text-[var(--color-gold)] opacity-20" />

          {/* Form Header */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-px w-3 bg-[var(--color-gold-dark)]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-[var(--color-gold-dark)]">
                Authentication
              </span>
            </div>
            <h2 className="font-[var(--font-playfair)] text-3xl text-[var(--color-luxury-black)]">
              Admin Portal
            </h2>
            <p className="mt-3 max-w-[240px] text-[11px] font-light leading-relaxed tracking-wide text-[var(--color-text-muted)]">
              Welcome back. Please enter your credentials to access the exclusive GGP Heritage Mall network.
            </p>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Footer */}
          <div className="mt-8 flex items-center gap-2 text-[9px] uppercase tracking-[0.15em] text-[var(--color-border-hover)]">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Concierge Support:{" "}
            <a
              href="mailto:support@ggp-heritage.com"
              className="border-b border-[var(--color-border)] pb-0.5 text-[var(--color-luxury-black)] transition-colors hover:border-[var(--color-gold-dark)] hover:text-[var(--color-gold-dark)]"
            >
              Contact Desk
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
