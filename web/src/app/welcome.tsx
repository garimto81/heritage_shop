"use client";

import { motion } from "framer-motion";
import { ChevronDown, Diamond, Crown, Shield, Sparkles, Lock, Mail, ArrowRight } from "lucide-react";
import { luxuryEasing, luxuryDuration, textRevealVariants, variants } from "@/lib/motion";

// ============================================
// Hero Section
// ============================================
function HeroSection() {
  const tagline = "EXCLUSIVE";

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 배경 그래디언트 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.05) 0%, transparent 40%)
          `,
        }}
      />

      {/* 로고 */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: luxuryDuration.slow, ease: luxuryEasing.elegant }}
      >
        <div className="w-20 h-20 bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-dark)] rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.3)]">
          <span className="font-heading font-bold text-3xl text-[var(--color-background)]">
            GG
          </span>
        </div>
      </motion.div>

      {/* 태그라인: letter-spacing 애니메이션 */}
      <motion.div
        className="flex gap-[0.5em] mb-6"
        initial="hidden"
        animate="visible"
        variants={textRevealVariants.container}
      >
        {tagline.split("").map((char, i) => (
          <motion.span
            key={i}
            className="text-sm tracking-[0.5em] text-[var(--color-gold)]"
            variants={textRevealVariants.char}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>

      {/* 메인 타이틀 */}
      <motion.h1
        className="font-heading text-4xl md:text-5xl lg:text-6xl text-center px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: luxuryDuration.slow,
          ease: luxuryEasing.elegant,
        }}
      >
        <span className="text-gradient-gold">Where Luxury</span>
        <br />
        <span className="text-white">Meets Legacy</span>
      </motion.h1>

      {/* 서브타이틀 */}
      <motion.p
        className="mt-6 text-[var(--color-text-secondary)] text-center max-w-md px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: luxuryDuration.slow }}
      >
        A curated collection for distinguished members
      </motion.p>

      {/* 스크롤 인디케이터 */}
      <motion.div
        className="absolute bottom-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-[var(--color-gold)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================
// Brand Story Section
// ============================================
const features = [
  {
    icon: Diamond,
    title: "Crafted Excellence",
    description: "Each piece selected with meticulous attention to quality and design",
  },
  {
    icon: Crown,
    title: "VIP Privilege",
    description: "Exclusive access to collections reserved for distinguished members",
  },
  {
    icon: Shield,
    title: "Private Experience",
    description: "A secure, personalized shopping journey tailored to you",
  },
  {
    icon: Sparkles,
    title: "Complimentary Service",
    description: "Premium selections delivered as a gesture of appreciation",
  },
];

function BrandStorySection() {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-20">
      {/* 섹션 헤더 */}
      <motion.div
        className="text-center mb-16 md:mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: luxuryDuration.slow, ease: luxuryEasing.elegant }}
      >
        <p className="text-sm tracking-[0.3em] text-[var(--color-gold)] mb-4">
          OUR STORY
        </p>
        <h2 className="font-heading text-3xl md:text-4xl">
          The Art of <span className="text-gradient-gold">Distinction</span>
        </h2>
      </motion.div>

      {/* 피처 그리드 */}
      <motion.div
        className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={variants.staggerContainer}
      >
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            className="glass-dark p-6 md:p-8 rounded-xl border border-white/5 hover:border-[var(--color-gold)]/20 transition-colors duration-300 group"
            variants={variants.staggerItem}
          >
            <feature.icon className="w-10 h-10 text-[var(--color-gold)] mb-4 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="font-heading text-xl mb-2">{feature.title}</h3>
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ============================================
// Invitation Section
// ============================================
function InvitationSection() {
  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-[var(--color-gold)] to-transparent" />
      </div>

      <div className="max-w-2xl mx-auto text-center">
        {/* 섹션 타이틀 */}
        <motion.p
          className="text-sm tracking-[0.4em] text-[var(--color-gold)] mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          BY INVITATION ONLY
        </motion.p>

        <motion.h2
          className="font-heading text-2xl md:text-3xl mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.1,
            duration: luxuryDuration.slow,
            ease: luxuryEasing.elegant,
          }}
        >
          A Private Collection
        </motion.h2>

        <motion.p
          className="text-[var(--color-text-secondary)] mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          This exclusive space is reserved for our distinguished VIP members.
          <br className="hidden md:block" />
          Access is granted through personal invitation only.
        </motion.p>

        {/* 초대 카드 */}
        <motion.div
          className="glass p-8 md:p-10 rounded-xl border border-white/10 shadow-[0_0_30px_rgba(212,175,55,0.08)]"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.3,
            duration: luxuryDuration.slow,
            ease: luxuryEasing.elegant,
          }}
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-surface)] border border-[var(--color-gold)]/30 flex items-center justify-center">
            <Lock className="w-7 h-7 text-[var(--color-gold)]" />
          </div>

          <h3 className="font-heading text-xl mb-3">
            Already have an invitation?
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] mb-8">
            Please access through your personal invitation link
          </p>

          {/* CTA 버튼 */}
          <a
            href="mailto:support@ggpheritage.com?subject=VIP Invitation Request"
            className="inline-flex items-center gap-3 px-8 py-4 border border-[var(--color-gold)] text-[var(--color-gold)] text-sm tracking-[0.15em] uppercase rounded-lg transition-all duration-300 hover:bg-[var(--color-gold)] hover:text-[var(--color-background)] group"
          >
            <Mail className="w-4 h-4" />
            Request Invitation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// Footer
// ============================================
function LandingFooter() {
  const commitHash = process.env.NEXT_PUBLIC_COMMIT_HASH || "dev";

  return (
    <footer className="py-16 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        {/* 로고 */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="font-heading text-2xl tracking-[0.2em] text-gradient-gold">
            GGP HERITAGE
          </span>
        </motion.div>

        {/* 연락처 */}
        <a
          href="mailto:support@ggpoker.com"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors"
        >
          <Mail className="w-4 h-4" />
          support@ggpoker.com
        </a>

        {/* 저작권 */}
        <p className="mt-8 text-xs text-[var(--color-text-muted)]">
          &copy; 2025 GG POKER. All rights reserved.
          <span className="ml-2 opacity-50">v2-{commitHash}</span>
        </p>
      </div>
    </footer>
  );
}

// ============================================
// Main Component
// ============================================
export function Welcome() {
  return (
    <main className="bg-[var(--color-background)] min-h-screen">
      <HeroSection />
      <BrandStorySection />
      <InvitationSection />
      <LandingFooter />
    </main>
  );
}
