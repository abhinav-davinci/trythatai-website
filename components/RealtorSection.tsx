"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "./icons";
import AiQualifying from "./AiQualifying";

const POINTS = [
  "Listings with AI-generated video and voice-over",
  "AI workflows: voice and chat with every prospect",
  "Lead qualification, bifurcation and routing",
  "Automated marketing and a private data terminal",
];

export default function RealtorSection() {
  return (
    <section id="realtoros" className="font-inter relative overflow-hidden px-5 py-24 sm:py-28" style={{ background: "#FAF9F5", color: "#0A0A12" }}>
      {/* faint warm grid wash, like the realtors site */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_100%_0%,rgba(33,87,166,0.06),transparent_55%)]" />

      <div className="relative mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* left — pitch (RealtorOS brand) */}
        <div>
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ros">
            <span className="h-1.5 w-1.5 rounded-full bg-ros" /> trythat for sellers
          </span>
          <h2 className="mt-4 text-[clamp(2.1rem,4.6vw,3.3rem)] font-bold leading-[1.02] tracking-tight text-ros-ink">
            Your AI sales team,<br />working while you sleep.
          </h2>
          <p className="mt-5 max-w-[33rem] text-[16.5px] leading-relaxed text-ros-mute">
            <span className="font-semibold text-ros">RealtorOS</span> is the operating system for realtors and FSBO sellers. It lists, markets, qualifies and follows up, so you only step in when a deal is ready. Qualifying is just one of the things it handles.
          </p>

          <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
            {POINTS.map((p) => (
              <span key={p} className="flex items-start gap-2 text-[13.5px] leading-snug text-[#3A3A4A]">
                <span className="mt-0.5 shrink-0 text-[#15803D]"><Check className="text-[14px]" /></span>
                {p}
              </span>
            ))}
          </div>

          <a
            href="https://realtors.trythat.ai/"
            className="group/cta mt-9 inline-flex items-center gap-2.5 rounded-full bg-ros-navy px-6 py-3.5 text-[15px] font-semibold text-white transition-transform hover:scale-[1.02]"
          >
            Know more
            <ArrowRight className="text-[1.15em] transition-transform group-hover/cta:translate-x-0.5" />
          </a>
        </div>

        {/* right — the AI qualifying panel */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <AiQualifying />
        </motion.div>
      </div>
    </section>
  );
}
