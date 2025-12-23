"use client";

import { motion } from "framer-motion";
import { Lock, Mail, Sparkles, Shield, Gift } from "lucide-react";
import { fadeInUpVariants, luxuryEasing, luxuryDuration } from "@/lib/motion";

/**
 * 환영 페이지 컴포넌트 - GGP Fashion 스타일
 * VIP 세션이 없는 사용자에게 표시됩니다.
 */
export function Welcome() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: luxuryDuration.slow,
        ease: luxuryEasing.elegant,
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: luxuryDuration.normal,
        ease: luxuryEasing.elegant,
      },
    },
  };

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      {/* GGP Fashion 스타일 헤더 */}
      <motion.header
        className="flex justify-between items-end px-6 py-12 md:px-12 border-b border-white/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: luxuryDuration.slow, ease: luxuryEasing.elegant }}
      >
        <div>
          <p className="text-xs tracking-[0.3em] text-gray-400 mb-2 uppercase">
            VIP Exclusive
          </p>
          <h1 className="text-4xl md:text-6xl font-heading italic">
            The Heritage
          </h1>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-xs text-gray-500">SEOUL</p>
          <p className="text-sm font-bold mt-1">GGP HERITAGE</p>
        </div>
      </motion.header>

      {/* 메인 콘텐츠 */}
      <motion.div
        className="flex flex-col items-center justify-center px-6 py-20 md:py-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 로고 */}
        <motion.div className="relative mb-12" variants={itemVariants}>
          <div className="absolute inset-0 bg-[var(--color-gold)] opacity-20 rounded-2xl blur-xl scale-110" />
          <div className="relative w-28 h-28 bg-gradient-to-br from-[var(--color-gold)] via-[#E5C158] to-[var(--color-gold-dark)] rounded-2xl flex items-center justify-center shadow-2xl shadow-[var(--color-gold)]/20 border border-[var(--color-gold)]/30">
            <span className="font-heading font-bold text-4xl text-[var(--color-background)] tracking-wide">
              GG
            </span>
          </div>
        </motion.div>

        {/* 타이틀 */}
        <motion.div className="text-center space-y-4 mb-12" variants={itemVariants}>
          <h2 className="font-heading text-5xl md:text-6xl italic bg-gradient-to-r from-[var(--color-gold)] via-[#E5C158] to-[var(--color-gold)] bg-clip-text text-transparent">
            GGP Heritage Mall
          </h2>
          <p className="text-lg text-gray-400 tracking-wide">
            VIP Exclusive Shopping Experience
          </p>
        </motion.div>

        {/* 특징 아이콘 */}
        <motion.div
          className="flex justify-center gap-12 mb-16"
          variants={containerVariants}
        >
          {[
            { icon: Shield, label: "Exclusive" },
            { icon: Gift, label: "Complimentary" },
            { icon: Sparkles, label: "Premium" },
          ].map(({ icon: Icon, label }) => (
            <motion.div
              key={label}
              className="flex flex-col items-center gap-3 group"
              variants={iconVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-14 h-14 rounded-full bg-[var(--color-surface)] border border-white/10 flex items-center justify-center group-hover:border-[var(--color-gold)]/50 transition-colors duration-300">
                <Icon className="w-6 h-6 text-[var(--color-gold)]" />
              </div>
              <span className="text-xs text-gray-500 tracking-wider uppercase">
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* 안내 박스 - 글래스모피즘 */}
        <motion.div
          className="max-w-md w-full glass-dark rounded-2xl p-8 space-y-6"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center gap-3 text-[var(--color-gold)]">
            <Lock className="w-5 h-5" />
            <span className="font-semibold text-lg tracking-wide">VIP 전용 서비스</span>
          </div>

          <div className="w-16 h-px mx-auto bg-gradient-to-r from-transparent via-[var(--color-gold)]/50 to-transparent" />

          <p className="text-gray-400 text-center leading-relaxed">
            GGP Heritage Mall은 초대받은 VIP 고객만
            <br />
            이용하실 수 있습니다.
          </p>
          <p className="text-gray-500 text-center text-sm">
            초대 링크를 통해 입장해주세요.
          </p>

          <div className="pt-4 border-t border-white/10">
            <a
              href="mailto:support@ggpheritage.com"
              className="text-sm text-gray-500 flex items-center justify-center gap-2 hover:text-[var(--color-gold)] transition-colors duration-300"
            >
              <Mail className="w-4 h-4" />
              support@ggpheritage.com
            </a>
          </div>
        </motion.div>

        {/* 추가 안내 */}
        <motion.p
          className="mt-12 text-sm text-gray-600"
          variants={itemVariants}
        >
          이미 초대 링크를 받으셨다면 해당 링크로 접속해주세요.
        </motion.p>
      </motion.div>

      {/* 하단 장식 */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/10 to-transparent" />
    </main>
  );
}
