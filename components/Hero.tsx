"use client";

import { motion } from "framer-motion";
import ProductWheel from "./ProductWheel";

const ease = [0.22, 1, 0.36, 1] as const;
const rise = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: 0.07 * i, ease } }),
};

export default function Hero() {
  return (
    <section className="relative flex h-[100svh] flex-col overflow-hidden">
      {/* ── atmosphere ── */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-canvas" />
        <div className="absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(110%_60%_at_0%_22%,rgba(20,184,166,0.13),transparent_58%)]" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(110%_60%_at_100%_22%,rgba(59,130,246,0.12),transparent_58%)]" />
        <div className="absolute left-1/2 top-[58%] h-[440px] w-[860px] max-w-[94vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.7),transparent_70%)] blur-2xl" />
        <div className="grain absolute inset-0 opacity-[0.04] mix-blend-multiply" />
      </div>

      {/* ── compact header ── */}
      <div className="relative z-10 flex shrink-0 flex-col items-center px-5 pt-20 text-center sm:pt-24">
        <motion.h1
          custom={0}
          variants={rise}
          initial="hidden"
          animate="show"
          className="max-w-[18ch] text-[clamp(1.7rem,3.4vw,2.6rem)] font-semibold leading-[1.05] tracking-tightest text-ink"
        >
          One super-app for <span className="seam-text whitespace-nowrap">every side</span> of real estate.
        </motion.h1>
      </div>

      {/* ── the product wheel, auto-fit to remaining space ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.3, ease }}
        className="relative z-10 min-h-0 w-full flex-1"
      >
        <ProductWheel />
      </motion.div>
    </section>
  );
}
