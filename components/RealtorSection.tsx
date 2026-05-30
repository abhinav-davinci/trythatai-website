"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "./icons";

const ease = [0.22, 1, 0.36, 1] as const;

const FEATURES = [
  "Listings with AI-generated video and voice-over",
  "AI workflows: voice and chat with every prospect",
  "Lead qualification, bifurcation and routing",
  "Automated marketing and a private data terminal",
];

const AGENTS = [
  { n: "Lister", s: "Listing 12 new units", v: "live" },
  { n: "Marketer", s: "Posting 4 reels today", v: "live" },
  { n: "Qualifier", s: "Screening 8 leads", v: "live" },
  { n: "Analyst", s: "Drafting RealtyBrief", v: "live" },
];

export default function RealtorSection() {
  return (
    <section id="realtoros" className="relative overflow-hidden bg-canvas px-5 py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-[360px] w-1/2 bg-[radial-gradient(120%_80%_at_100%_0%,rgba(59,130,246,0.12),transparent_60%)]" />
      </div>

      <div className="relative mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* left: pitch */}
        <div>
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-blue-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-blue" /> trythat for sellers · the desk
          </span>
          <h2 className="mt-4 text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.04] tracking-tightest text-ink">
            Your AI sales team,<br />working while you sleep.
          </h2>
          <p className="mt-5 max-w-[32rem] text-[16.5px] leading-relaxed text-fg-mute">
            <span className="font-bold text-blue-deep">RealtorOS</span> is the operating system for realtors and FSBO sellers. It lists, markets and qualifies, so you only step in when a deal is ready.
          </p>

          <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[14px] text-ink">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blue/12 text-blue-deep">
                  <Check className="text-[12px]" />
                </span>
                {f}
              </li>
            ))}
          </ul>

          <a
            href="https://realtors.trythat.ai/"
            className="group/cta mt-9 inline-flex items-center gap-2.5 rounded-full bg-blue-deep px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_18px_50px_-18px_rgba(29,78,216,0.7)] transition-transform hover:scale-[1.02]"
          >
            List your property
            <ArrowRight className="text-[1.15em] transition-transform group-hover/cta:translate-x-0.5" />
          </a>
        </div>

        {/* right: the live desk */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="rounded-[24px] border border-line bg-paper p-5 shadow-[0_40px_90px_-50px_rgba(15,23,41,0.4)] sm:p-6"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint">your desk · pipeline 142</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-blue-deep">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue" /> live
            </span>
          </div>

          {/* hot leads */}
          <div className="mt-4 space-y-2">
            {[
              { in: "YB", n: "Yash B.", src: "Meta ads", t: "HOT", s: 92, hot: true },
              { in: "SP", n: "Seema P.", src: "99acres", t: "WARM", s: 74, hot: false },
            ].map((l) => (
              <div key={l.n} className="flex items-center gap-3 rounded-xl border border-line bg-canvas px-3 py-2.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue-deep to-blue text-[11px] font-bold text-white">
                  {l.in}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-ink">{l.n}</p>
                  <p className="text-[11px] text-fg-faint">via {l.src}</p>
                </div>
                <span className={`rounded px-1.5 py-0.5 text-[9.5px] font-bold tracking-wide ${l.hot ? "bg-hot/12 text-hot" : "bg-gold/12 text-gold"}`}>{l.t}</span>
                <span className="font-mono text-[13px] font-bold text-ink">{l.s}</span>
              </div>
            ))}
          </div>

          {/* agents working */}
          <div className="mt-3 rounded-xl border border-blue/20 bg-blue-soft/60 p-3.5">
            <div className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-blue-deep">4 agents · working right now</div>
            <div className="grid grid-cols-2 gap-2">
              {AGENTS.map((a) => (
                <div key={a.n} className="rounded-lg border border-line bg-white px-2.5 py-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-wa" />
                    <span className="text-[12px] font-semibold text-ink">{a.n}</span>
                  </div>
                  <p className="mt-0.5 text-[10px] text-fg-mute">{a.s}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
