"use client";

import { useEffect, useState, type JSX } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "./icons";
import AlonAvatar from "./AlonAvatar";

const ease = [0.22, 1, 0.36, 1] as const;
const CYCLE = 2400;

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-orange/30 bg-orange/[0.08] px-2.5 py-1 text-[11px] font-medium text-orange">
      {children}
    </span>
  );
}
function Row({ a, b, dot = "bg-orange" }: { a: string; b: string; dot?: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2">
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
      <span className="flex-1 truncate text-[12.5px] text-white/85">{a}</span>
      <span className="font-mono text-[12px] text-white/55">{b}</span>
    </div>
  );
}
function Slider({ label, value, pct }: { label: string; value: string; pct: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-[12px]">
        <span className="text-white/55">{label}</span>
        <span className="font-semibold text-white">{value}</span>
      </div>
      <div className="relative h-1.5 rounded-full bg-white/10">
        <div className="absolute inset-y-0 left-0 rounded-full bg-orange" style={{ width: `${pct}%` }} />
        <span className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-orange bg-[#0c1a33]" style={{ left: `calc(${pct}% - 6px)` }} />
      </div>
    </div>
  );
}

/* the live "ALON screen" for each stage */
const VISUALS: JSX.Element[] = [
  // 01 Search
  <div key="s" className="space-y-3">
    <p className="font-mono text-[11px] text-white/40">scanning registry…</p>
    <p className="text-[30px] font-bold leading-none text-white">
      12,84,210 <span className="text-[13px] font-normal text-white/40">listings</span>
    </p>
    <div className="flex flex-wrap gap-2">
      <Chip>RERA verified</Chip>
      <Chip>Builder score 8+</Chip>
      <Chip>Your filters</Chip>
    </div>
  </div>,
  // 02 Shortlist
  <div key="sh" className="space-y-2">
    <Row a="Skyline Heights · Wakad" b="₹78L" />
    <Row a="Orchid Court · Baner" b="₹92L" />
    <Row a="Riverdale · Kharadi" b="₹71L" />
    <div className="inline-flex items-center gap-1.5 rounded-md bg-orange/12 px-2.5 py-1 text-[11px] font-semibold text-orange">
      <Check className="text-[12px]" /> Conflict check clear
    </div>
  </div>,
  // 03 Site Visits
  <div key="v" className="space-y-3">
    <Row a="Skyline Heights · site visit" b="Sat 11:00" />
    <Row a="Orchid Court · site visit" b="Sun 16:30" dot="bg-white/30" />
    <Chip>Your number stays hidden</Chip>
  </div>,
  // 04 Compare
  <div key="c" className="space-y-3">
    <div>
      <div className="mb-1 flex justify-between text-[11.5px] text-white/60"><span>You pay</span><span className="font-semibold text-white">₹78L</span></div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-orange" style={{ width: "78%" }} /></div>
    </div>
    <div>
      <div className="mb-1 flex justify-between text-[11.5px] text-white/60"><span>Area average</span><span className="text-white/70">₹85L</span></div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-white/25" style={{ width: "92%" }} /></div>
    </div>
    <p className="text-[12px] font-semibold text-orange">8% below market · real transaction data</p>
  </div>,
  // 05 Finance — plan the loan with an EMI calculator
  <div key="f" className="space-y-3">
    <p className="font-mono text-[11px] text-white/40">plan your loan</p>
    <Slider label="Loan amount" value="₹62L" pct={62} />
    <Slider label="Tenure" value="20 yrs" pct={66} />
    <Slider label="Interest rate" value="8.4%" pct={40} />
    <div className="flex items-center justify-between rounded-xl border border-orange/30 bg-orange/[0.08] px-3.5 py-2.5">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-wider text-white/45">Monthly EMI</p>
        <p className="mt-0.5 text-[22px] font-bold leading-none text-white">
          ₹53,400<span className="ml-1 text-[12px] font-normal text-white/45">/mo</span>
        </p>
      </div>
      <span className="inline-flex items-center gap-1 rounded-md bg-orange/15 px-2 py-1 text-[10.5px] font-semibold text-orange">
        <Check className="text-[11px]" /> Pre-approved
      </span>
    </div>
  </div>,
  // 06 Legal
  <div key="l" className="space-y-2.5">
    <div className="inline-flex items-center gap-1.5 rounded-md bg-orange/12 px-2.5 py-1 text-[11.5px] font-semibold text-orange">
      <Check className="text-[12px]" /> RERA P52100002345 verified
    </div>
    <Row a="Builder reputation" b="strong" />
    <Row a="Risky clauses" b="2 flagged" dot="bg-orange" />
  </div>,
  // 07 Negotiate
  <div key="n" className="space-y-2">
    <Row a="Quoted price" b="₹82L" dot="bg-white/30" />
    <Row a="Fair value" b="₹74L" />
    <Row a="Your walkaway" b="₹80L" />
    <p className="text-[12px] text-white/70">Negotiation checklist ready</p>
  </div>,
  // 08 Deal Closure
  <div key="d" className="space-y-2">
    <Row a="Agreement signed" b="done" />
    <Row a="Token paid" b="done" />
    <Row a="Registration" b="12 Jul" dot="bg-orange" />
    <p className="font-mono text-[11px] text-white/40">nothing slips through</p>
  </div>,
  // 09 Possession
  <div key="p" className="space-y-2">
    <Row a="Keys handover" b="30 Jun" />
    <Row a="Handover checklist" b="9 / 12" dot="bg-white/30" />
    <Row a="Snag list" b="3 open" dot="bg-orange" />
  </div>,
];

const STAGES = [
  { n: "01", name: "Search", desc: "Scans 12L+ listings, filtered by RERA compliance, builder trust scores and your exact needs." },
  { n: "02", name: "Shortlist", desc: "Curates your top 5 picks, runs conflict checks and flags anything suspicious before you spend time." },
  { n: "03", name: "Site Visits", desc: "Books visits on your schedule. Your number stays hidden, so brokers never spam you." },
  { n: "04", name: "Compare", desc: "Side by side on real transaction data, not broker quotes. See what people actually paid." },
  { n: "05", name: "Finance", desc: "Best rates from 10+ banks, with pre-approved offers and EMI breakdowns for your budget." },
  { n: "06", name: "Legal", desc: "Verifies builder reputation, checks RERA status and flags risky clauses in the agreement." },
  { n: "07", name: "Negotiate", desc: "Price benchmarking on real market data, with a negotiation checklist and a walkaway number." },
  { n: "08", name: "Closure", desc: "Timeline tracking, document checklists and payment reminders, so nothing falls through." },
  { n: "09", name: "Possession", desc: "Key-date reminders, a handover checklist and a snag list. You finish with confidence." },
];

export default function AlonJourney() {
  const [active, setActive] = useState(0);
  // `nudge` bumps on manual click to restart the timer from the chosen stage
  const [nudge, setNudge] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % STAGES.length), CYCLE);
    return () => clearInterval(t);
  }, [nudge]);

  const pick = (i: number) => {
    setNudge((n) => n + 1);
    setActive(i);
  };

  const s = STAGES[active];

  return (
    <section
      id="alon"
      className="relative overflow-hidden px-5 py-24 text-white sm:py-28"
      style={{ background: "linear-gradient(180deg,#142a52 0%,#0b1a36 60%,#0a1730 100%)" }}
    >
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[280px] w-[760px] max-w-[92vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,126,39,0.12),transparent_70%)] blur-2xl" />
        <div className="grain absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
      </div>

      <div className="relative mx-auto max-w-[1120px]">
        {/* header */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <AlonAvatar size={72} className="mb-7" />
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-orange">
              <span className="h-1.5 w-1.5 rounded-full bg-orange" /> trythat for buyers · the journey
            </span>
            <h2 className="mt-4 text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.04] tracking-tightest text-white">
              Nine stages. One AI.<br />Every step handled.
            </h2>
          </div>
          <p className="max-w-[24rem] text-[15px] leading-relaxed text-white/55">
            From your first search to the day you get the keys, <span className="font-serif text-white">Trythat</span> walks you through the whole buy. Watch it work.
          </p>
        </div>

        {/* the rail */}
        <div className="mt-12 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-[760px] items-start">
            {STAGES.map((st, i) => {
              const done = i <= active;
              return (
                <div key={st.n} className="flex flex-1 items-start">
                  <button onClick={() => pick(i)} className="group flex flex-1 flex-col items-center gap-2.5">
                    <span className={`font-mono text-[11px] tracking-wider transition-colors ${i === active ? "text-orange" : done ? "text-white/55" : "text-white/25"}`}>
                      {st.n}
                    </span>
                    <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                      {i === active && <motion.span layoutId="alon-glow" className="absolute h-6 w-6 rounded-full bg-orange/30 blur-[6px]" />}
                      <span className={`relative h-3 w-3 rounded-full transition-colors duration-300 ${done ? "bg-orange" : "bg-white/15 group-hover:bg-white/30"}`} />
                    </span>
                    <span className={`text-[11.5px] font-medium uppercase tracking-wide transition-colors ${i === active ? "text-white" : done ? "text-white/45" : "text-white/30"}`}>
                      {st.name}
                    </span>
                  </button>
                  {i < STAGES.length - 1 && (
                    <span className="mt-[26px] h-px flex-1 overflow-hidden bg-white/12">
                      <motion.span className="block h-full bg-orange" initial={false} animate={{ width: i < active ? "100%" : "0%" }} transition={{ duration: 0.4, ease }} />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* stage detail */}
        <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-16">
          <div className="relative min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease }}
              >
                <div className="flex items-center gap-4">
                  <span className="font-serif text-[clamp(3.5rem,8vw,5.5rem)] font-medium leading-none text-orange/90">{s.n}</span>
                  <h3 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold tracking-tight text-white">{s.name}</h3>
                </div>
                <p className="mt-5 max-w-[30rem] text-[16.5px] leading-relaxed text-white/65">{s.desc}</p>
              </motion.div>
            </AnimatePresence>

            <a
              href="https://alon.trythat.ai/"
              className="group/cta mt-9 inline-flex items-center gap-2.5 rounded-full bg-orange px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_18px_50px_-16px_rgba(255,126,39,0.8)] transition-transform hover:scale-[1.02]"
            >
              Start your search
              <ArrowRight className="text-[1.15em] transition-transform group-hover/cta:translate-x-0.5" />
            </a>
          </div>

          {/* the live screen */}
          <div className="rounded-[22px] border border-white/10 bg-[#0c1a33]/80 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.9)] backdrop-blur">
            <div className="flex items-center gap-2 border-b border-white/[0.08] px-4 py-3">
              <span className="font-serif text-[15px] text-white">Trythat</span>
              <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-white/40">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange" /> working
              </span>
            </div>
            <div className="relative min-h-[224px] px-5 py-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -14 }}
                  transition={{ duration: 0.3, ease }}
                >
                  {VISUALS[active]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
