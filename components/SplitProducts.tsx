"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Spark } from "./icons";

const ease = [0.22, 1, 0.36, 1] as const;

const STAGES = ["Discover", "Shortlist", "Visit", "Compare", "Negotiate", "Finance", "Legal", "Close", "Move-in"];
const AGENTS = [
  { n: "Lister", s: "Listing 12 new units" },
  { n: "Marketer", s: "Posting 4 reels today" },
  { n: "Qualifier", s: "Screening 8 leads" },
  { n: "Analyst", s: "Drafting RealtyBrief" },
];

export default function SplitProducts() {
  return (
    <section id="products" className="relative bg-canvas px-5 py-24 sm:py-28">
      <div className="mx-auto max-w-[1120px]">
        {/* header */}
        <div className="mx-auto max-w-[640px] text-center">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-tt">
            <span className="h-px w-6 bg-tt" /> Buyers &amp; Sellers
          </span>
          <h2 className="mt-5 text-[clamp(1.9rem,3.8vw,2.9rem)] font-semibold leading-[1.05] tracking-tightest text-ink">
            An AI for your side of the deal.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-fg-mute">
            Buying or selling, you get a specialist that works only for you.
          </p>
        </div>

        {/* the diptych */}
        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          {/* ── ALON · buyers · orange ── */}
          <motion.article
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
            className="flex flex-col rounded-[26px] border border-orange/20 bg-orange-soft p-7 sm:p-8"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-orange-deep">trythat for buyers</p>
                <h3 className="mt-2 font-serif text-[42px] font-medium leading-none text-ink">ALON</h3>
              </div>
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-orange text-white shadow-[0_10px_24px_-10px_rgba(255,126,39,0.8)]">
                <Spark className="text-[1.3em]" />
              </span>
            </div>

            <p className="mt-6 text-[19px] font-semibold leading-snug tracking-tight text-ink">
              Your personal property scout, from first search to keys in hand.
            </p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-fg-mute">
              ALON walks you through all 9 stages of buying: research, shortlisting, site visits, negotiation, legal, finance and possession.
            </p>

            <ul className="mt-6 space-y-2.5">
              {[
                "9-stage buying journey, AI-guided",
                "Request data on any listing, instantly",
                "Persona-tuned insights and area reports",
                "Auto-drafted RealtyBriefs you can share",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-[14px] text-ink">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-orange/15 text-orange-deep">
                    <Check className="text-[12px]" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            {/* 9-stage journey widget */}
            <div className="mt-7 rounded-2xl border border-orange/20 bg-white/70 p-4">
              <div className="mb-2.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em]">
                <span className="text-fg-faint">9-stage journey</span>
                <span className="font-semibold text-orange-deep">stage 3 / 9</span>
              </div>
              <div className="flex gap-1">
                {STAGES.map((s, i) => (
                  <div key={s} className={`h-1.5 flex-1 rounded-full ${i < 3 ? "bg-orange" : "bg-orange/15"}`} />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[9.5px] text-fg-faint">
                <span>Discover</span>
                <span className="font-semibold text-orange-deep">Visit</span>
                <span>Move-in</span>
              </div>
            </div>

            <a
              href="https://alon.trythat.ai/"
              className="group/cta mt-7 flex items-center justify-between rounded-2xl bg-orange px-5 py-3.5 text-white transition-transform hover:scale-[1.01]"
            >
              <span className="text-[15px] font-semibold">Start your search</span>
              <span className="flex items-center gap-2 font-mono text-[12px] text-white/80">
                alon.trythat.ai
                <ArrowRight className="text-[1.1em] text-white transition-transform group-hover/cta:translate-x-0.5" />
              </span>
            </a>
          </motion.article>

          {/* ── RealtorOS · sellers · blue ── */}
          <motion.article
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="flex flex-col rounded-[26px] border border-blue/20 bg-blue-soft p-7 sm:p-8"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue-deep">trythat for sellers</p>
                <h3 className="mt-2 text-[40px] font-bold leading-none tracking-tightest text-blue-deep">RealtorOS</h3>
              </div>
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue text-[20px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(59,130,246,0.85)]">
                R
              </span>
            </div>

            <p className="mt-6 text-[19px] font-semibold leading-snug tracking-tight text-ink">
              Hire your own AI team. They list, market and qualify leads while you sleep.
            </p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-fg-mute">
              The operating system for realtors and FSBO sellers: AI property videos, automated marketing, lead qualification and a private data terminal.
            </p>

            <ul className="mt-6 space-y-2.5">
              {[
                "Listings with AI video and voice-over",
                "AI workflows: voice and chat with prospects",
                "Lead qualification and routing",
                "Automated marketing and brand building",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-[14px] text-ink">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blue/15 text-blue-deep">
                    <Check className="text-[12px]" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            {/* agents working widget */}
            <div className="mt-7 rounded-2xl border border-blue/20 bg-white/70 p-4">
              <div className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-faint">
                4 agents · working right now
              </div>
              <div className="grid grid-cols-2 gap-2">
                {AGENTS.map((a) => (
                  <div key={a.n} className="rounded-xl border border-line bg-white px-2.5 py-2">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-wa" />
                      <span className="text-[12px] font-semibold text-ink">{a.n}</span>
                    </div>
                    <p className="mt-0.5 text-[10px] text-fg-mute">{a.s}</p>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="https://realtors.trythat.ai/"
              className="group/cta mt-7 flex items-center justify-between rounded-2xl bg-blue-deep px-5 py-3.5 text-white transition-transform hover:scale-[1.01]"
            >
              <span className="text-[15px] font-semibold">List your property</span>
              <span className="flex items-center gap-2 font-mono text-[12px] text-white/80">
                realtors.trythat.ai
                <ArrowRight className="text-[1.1em] text-white transition-transform group-hover/cta:translate-x-0.5" />
              </span>
            </a>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
