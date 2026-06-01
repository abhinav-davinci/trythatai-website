"use client";

import { useEffect, useRef, useState, type JSX } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Building, Return, Spark } from "./icons";
import AlonAvatar from "./AlonAvatar";

type Id = "ai-chat" | "realtoros" | "alon";

interface Product {
  id: Id;
  name: string;
  kicker: string;
  tagline: string;
  features: string[];
  Icon: (p: { className?: string }) => JSX.Element;
  mediaBg: string;
  media: JSX.Element;
}

const PRODUCTS: Product[] = [
  {
    id: "ai-chat",
    name: "Trythat for all",
    kicker: "The front door",
    tagline: "Type any property question and get a clear answer.",
    features: ["Insights", "Request Data", "Transactions"],
    Icon: Spark,
    mediaBg: "from-[#2558A6] to-[#1b4480]",
    media: (
      <div className="flex h-full flex-col justify-end gap-2 p-3.5">
        <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-md bg-white px-3 py-2 text-[11.5px] font-medium text-ink shadow-sm">
          2BHK in Wakad under ₹85L?
        </div>
        <div className="mr-auto flex max-w-[85%] items-center gap-2 rounded-2xl rounded-tl-md bg-white/[0.14] px-3 py-2 text-[11.5px] text-white">
          <Spark className="shrink-0 text-[13px] text-white" />
          Found 3 RERA-approved matches
        </div>
      </div>
    ),
  },
  {
    id: "realtoros",
    name: "Trythat for sellers",
    kicker: "The sellers' desk",
    tagline: "List, market with AI video and voice, and keep every lead in one place.",
    features: ["AI video + voice", "Data Terminal", "Reports on demand"],
    Icon: Building,
    mediaBg: "from-[#16407e] to-[#2157a6]",
    media: (
      <div className="flex h-full flex-col justify-center gap-2 p-3.5">
        {[
          { n: "Yash B.", src: "Meta ads", t: "HOT", s: 92 },
          { n: "Seema P.", src: "99acres", t: "WARM", s: 74 },
        ].map((l) => (
          <div key={l.n} className="flex items-center gap-2.5 rounded-xl bg-white px-2.5 py-2 shadow-sm">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#0D2547] text-[10px] font-bold text-white">{l.n[0]}</span>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-[11.5px] font-semibold text-ink">{l.n}</p>
              <p className="text-[9.5px] text-fg-faint">via {l.src}</p>
            </div>
            <span className={`rounded px-1.5 py-0.5 text-[8.5px] font-bold tracking-wide ${l.t === "HOT" ? "bg-[#FCE3E3] text-[#B3261E]" : "bg-[#FAEFD6] text-[#B45309]"}`}>{l.t}</span>
            <span className="font-mono text-[12px] font-bold text-ink">{l.s}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "alon",
    name: "Trythat for buyers",
    kicker: "For buyers",
    tagline: "Scores listings, benchmarks prices, and checks RERA for the buyer.",
    features: ["Deal score", "Loan check", "Realty Brief"],
    Icon: Compass,
    mediaBg: "from-ink to-ink-700",
    media: (
      <div className="flex h-full items-center justify-center gap-4 p-4">
        <div className="relative grid h-[68px] w-[68px] place-items-center">
          <svg viewBox="0 0 40 40" className="h-[68px] w-[68px] -rotate-90">
            <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="3.5" />
            <circle cx="20" cy="20" r="16" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeDasharray={100.5} strokeDashoffset={13} />
          </svg>
          <span className="absolute text-[17px] font-bold text-white">87</span>
        </div>
        <div className="space-y-1.5">
          <p className="text-[11.5px] font-semibold text-white">Deal score</p>
          <p className="inline-block rounded-md bg-white/20 px-2 py-1 text-[9.5px] font-bold text-white">8% below market</p>
        </div>
      </div>
    ),
  },
];

/* ── geometry: cards seated on the rim, leaning along the tangent ── */
const WHEEL_W = 1120;
const WHEEL_H = 600;
const CX = WHEEL_W / 2;
const CARD_W = 372;
const CARD_H = 484;
const R = 600;
const BASE_Y_C = 506; // center card's base sits here, on the top of the disc
const Cy = BASE_Y_C + R;
const DEG = Math.PI / 180;
const DELTA = 26; // angular spread of the two side cards

// offset 0 = center, 1 = right, 2 = left
const ANGLE = [0, DELTA, -DELTA];
const SCALE = [1, 0.72, 0.72];
const OPACITY = [1, 0.97, 0.97];
const Z = [30, 20, 20];

function slot(offset: number) {
  const a = ANGLE[offset] * DEG;
  const baseX = CX + R * Math.sin(a);
  const baseY = Cy - R * Math.cos(a);
  return {
    x: baseX - CARD_W / 2,
    y: baseY - CARD_H,
    scale: SCALE[offset],
    rotate: ANGLE[offset],
    opacity: OPACITY[offset],
  };
}

const SLOTS = [slot(0), slot(1), slot(2)];
// bottom waypoint for the card swinging around the back of the wheel
const BOTTOM = { x: CX - CARD_W / 2, y: BASE_Y_C - CARD_H + 150, scale: 0.5, rotate: 0, opacity: 0.12 };

const easeWheel = [0.5, 0, 0.2, 1] as const;
const DISC_STEP = 30; // degrees the disc turns per advance

export default function ProductWheel() {
  const [active, setActive] = useState(0);
  const prev = useRef(0);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scale, setScale] = useState(1);
  const fitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 820px)");
    const f = () => setIsMobile(mq.matches);
    f();
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);

  useEffect(() => {
    const el = fitRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      if (r.width && r.height) setScale(Math.min(r.width / WHEEL_W, r.height / WHEEL_H, 1.14));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [isMobile]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      prev.current = active;
      setActive((a) => (a + 1) % PRODUCTS.length);
    }, 4600);
    return () => clearInterval(t);
  }, [paused, active]);

  const go = (i: number) => {
    prev.current = active;
    setActive(((i % PRODUCTS.length) + PRODUCTS.length) % PRODUCTS.length);
  };

  if (isMobile)
    return (
      <div ref={fitRef} className="flex h-full w-full items-center justify-center">
        <MobileWheel active={active} go={go} setPaused={setPaused} />
      </div>
    );

  return (
    <div ref={fitRef} className="relative h-full w-full" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div
        className="absolute left-1/2 top-0"
        style={{ width: WHEEL_W, height: WHEEL_H, transform: `translateX(-50%) scale(${scale})`, transformOrigin: "top center" }}
      >
        <Disc active={active} />

        {/* contact shadow grounding the active card on the disc */}
        <div
          className="pointer-events-none absolute"
          style={{
            left: CX - 150,
            top: BASE_Y_C - 16,
            width: 300,
            height: 40,
            zIndex: 10,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(15,23,41,0.28), transparent 76%)",
            filter: "blur(7px)",
          }}
        />

        {PRODUCTS.map((p, i) => {
          const newOff = (i - active + 3) % 3;
          const oldOff = (i - prev.current + 3) % 3;
          const wrap = (oldOff === 1 && newOff === 2) || (oldOff === 2 && newOff === 1);
          const t = SLOTS[newOff];
          const animate = wrap
            ? {
                x: [SLOTS[oldOff].x, BOTTOM.x, t.x],
                y: [SLOTS[oldOff].y, BOTTOM.y, t.y],
                scale: [SLOTS[oldOff].scale, BOTTOM.scale, t.scale],
                rotate: [SLOTS[oldOff].rotate, 0, t.rotate],
                opacity: [SLOTS[oldOff].opacity, BOTTOM.opacity, t.opacity],
              }
            : { x: t.x, y: t.y, scale: t.scale, rotate: t.rotate, opacity: t.opacity };

          return (
            <motion.div
              key={p.id}
              className="absolute left-0 top-0"
              style={{ width: CARD_W, height: CARD_H, transformOrigin: "bottom center", zIndex: Z[newOff], cursor: newOff === 0 ? "default" : "pointer" }}
              animate={animate}
              transition={{ duration: wrap ? 1.0 : 0.8, ease: easeWheel }}
              onClick={() => newOff !== 0 && go(i)}
            >
              <Card product={p} center={newOff === 0} />
            </motion.div>
          );
        })}
      </div>

      <Dots active={active} go={go} />
    </div>
  );
}

/* ── the disc the cards ride on (static plate + rotating ticks) ── */
function Disc({ active }: { active: number }) {
  const ticks = Array.from({ length: 60 });
  const mask = "linear-gradient(to bottom, #000 0%, #000 11%, rgba(0,0,0,0.45) 19%, transparent 28%)";
  return (
    <div
      className="pointer-events-none absolute left-1/2 -translate-x-1/2"
      style={{ top: Cy - R, width: R * 2, height: R * 2, maskImage: mask, WebkitMaskImage: mask }}
    >
      {/* static plate: symmetric, never rotates */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, #ffffff, rgba(255,255,255,0.85) 8%, rgba(234,239,246,0.85) 15%, rgba(221,229,240,0.6) 22%, rgba(214,224,237,0.25) 30%, transparent 42%)",
          border: "1px solid rgba(15,23,41,0.22)",
          boxShadow: "inset 0 10px 60px rgba(255,255,255,0.9)",
        }}
      />
      <div className="absolute inset-[58px] rounded-full border border-[rgba(15,23,41,0.1)]" />
      <div className="absolute inset-[140px] rounded-full border border-[rgba(15,23,41,0.07)]" />
      <div className="absolute inset-[240px] rounded-full border border-[rgba(15,23,41,0.05)]" />

      {/* dial ticks: only these turn, signalling the wheel rotation */}
      <motion.div className="absolute inset-0" style={{ transformOrigin: "center" }} animate={{ rotate: -active * DISC_STEP }} transition={{ duration: 0.9, ease: easeWheel }}>
        {ticks.map((_, i) => {
          const a = (i / ticks.length) * 360;
          const major = i % 5 === 0;
          return (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 origin-top"
              style={{
                height: major ? 14 : 8,
                width: major ? 1.5 : 1,
                background: major ? "rgba(15,23,41,0.3)" : "rgba(15,23,41,0.15)",
                transform: `rotate(${a}deg) translateY(${-R + 1}px)`,
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
}

/* ── product card ── */
function Card({ product, center }: { product: Product; center: boolean }) {
  const { Icon } = product;
  if (product.id === "alon") return <AlonCard center={center} />;
  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden rounded-[28px] border border-line bg-paper"
      style={{ boxShadow: center ? "0 2px 6px rgba(15,23,41,0.05), 0 44px 90px -44px rgba(15,23,41,0.5)" : "0 2px 5px rgba(15,23,41,0.05), 0 30px 60px -40px rgba(15,23,41,0.42)" }}
    >
      <div className={`relative m-2.5 mb-0 h-[224px] overflow-hidden rounded-[20px] bg-gradient-to-br ${product.mediaBg}`}>
        {product.media}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-white backdrop-blur-sm">
          <Icon className="text-[12px]" /> {product.kicker}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <h3 className="text-[25px] font-semibold leading-none tracking-tighter2 text-ink">{product.name}</h3>
        <p className="mt-2.5 text-[13.5px] leading-[1.45] text-fg-mute">{product.tagline}</p>

        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {product.features.map((f) => (
            <span key={f} className="rounded-full border border-line bg-canvas px-2.5 py-1 text-[11px] font-medium text-fg-mute">
              {f}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4">
          {product.id === "ai-chat" ? (
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-1.5 rounded-2xl border border-line bg-canvas p-1.5 transition-colors focus-within:border-ink/25">
              <input
                placeholder="Ask anything real estate…"
                tabIndex={center ? 0 : -1}
                className="min-w-0 flex-1 bg-transparent px-2.5 text-[13px] text-ink outline-none placeholder:text-fg-faint"
              />
              <button className="flex shrink-0 items-center gap-1.5 rounded-xl border border-line bg-white px-3 py-2 text-[12.5px] font-semibold text-[#2558A6] transition-transform hover:scale-[1.03]" aria-label="Send">
                <Return className="text-[1.15em]" />
              </button>
            </form>
          ) : (
            <a
              href="https://realtors.trythat.ai/"
              className="group/cta inline-flex items-center gap-2 rounded-full bg-[#0D2547] px-5 py-3 text-[13.5px] font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              Know more
              <ArrowRight className="text-[1.1em] transition-transform group-hover/cta:translate-x-0.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── ALON · branded card, matching ALON's own intro screen ── */
const PROMISES = [
  {
    t: "Your contact is yours",
    s: "Never shared without your go-ahead",
    tint: "#6f93ff",
    icon: (
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
        <path d="M8 1.4 13.4 3.3V8c0 3.3-2.3 5.2-5.4 6.3C4.9 13.2 2.6 11.3 2.6 8V3.3L8 1.4Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M5.8 8 7.4 9.6 10.4 6.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    t: "Complete journey, not just listings",
    s: "Search to possession, all 9 stages",
    tint: "#ffa05a",
    icon: (
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
        <circle cx="4" cy="4" r="1.8" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="12" cy="12" r="1.8" stroke="currentColor" strokeWidth="1.3" />
        <path d="M5.8 4H10a2 2 0 0 1 0 4H6a2 2 0 0 0 0 4h4.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    t: "Always in your corner",
    s: "Works for you, never the builder or agent",
    tint: "#6f93ff",
    icon: (
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
        <circle cx="6.5" cy="5" r="2.6" stroke="currentColor" strokeWidth="1.3" />
        <path d="M2.4 13c0-2.4 1.9-4 4.1-4 1 0 1.9.3 2.6.9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M10.4 11.6 11.9 13 14.4 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function AlonCard({ center }: { center: boolean }) {
  return (
    <div
      className="flex h-full w-full flex-col items-center overflow-hidden rounded-[28px] px-5 pb-5 pt-5 text-center"
      style={{
        background: "linear-gradient(180deg,#15294f 0%,#0e1d3b 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: center ? "0 2px 6px rgba(8,14,28,0.4), 0 44px 90px -44px rgba(8,14,28,0.85)" : "0 30px 60px -40px rgba(8,14,28,0.7)",
      }}
    >
      <div className="flex w-full items-center justify-center gap-2 text-[9px] font-medium uppercase tracking-[0.32em] text-white/35">
        <span className="h-px w-8 bg-white/15" /> presents <span className="h-px w-8 bg-white/15" />
      </div>

      <div className="mt-3 grid h-[58px] w-[58px] place-items-center rounded-2xl border border-white/10 bg-white/[0.05]">
        <AlonAvatar size={42} showRings={false} />
      </div>

      <h3 className="mt-3 font-serif text-[30px] font-semibold leading-none tracking-wide text-white">Trythat</h3>
      <p className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-orange">for buyers</p>
      <p className="mt-2 text-[12.5px] leading-snug text-white/65">Your personal AI for the entire home-buying journey</p>

      <div className="mt-4 w-full rounded-2xl border border-white/[0.09] bg-white/[0.035] p-3 text-left">
        <p className="mb-2 font-serif text-[13px] font-semibold text-white/85">My Promises</p>
        <div className="space-y-2">
          {PROMISES.map((p) => (
            <div key={p.t} className="flex items-start gap-2.5">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg" style={{ backgroundColor: `${p.tint}22`, color: p.tint }}>
                {p.icon}
              </span>
              <div className="min-w-0">
                <p className="text-[11.5px] font-semibold leading-tight text-white">{p.t}</p>
                <p className="text-[10px] leading-tight text-white/45">{p.s}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <a
        href="https://alon.trythat.ai/"
        tabIndex={center ? 0 : -1}
        className="mt-auto flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3 text-[14px] font-bold text-[#FF7E27] transition-transform hover:scale-[1.02]"
      >
        Know more <ArrowRight className="text-[1.1em]" />
      </a>
      <p className="mt-2.5 text-[10px] text-white/35">Free forever for buyers · No spam, ever</p>
    </div>
  );
}

function Dots({ active, go }: { active: number; go: (i: number) => void }) {
  return (
    <div className="absolute bottom-2 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2">
      {PRODUCTS.map((p, i) => (
        <button
          key={p.id}
          onClick={() => go(i)}
          aria-label={p.name}
          className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-7 bg-ink" : "w-2 bg-line-strong hover:bg-fg-faint"}`}
        />
      ))}
    </div>
  );
}

function MobileWheel({ active, go, setPaused }: { active: number; go: (i: number) => void; setPaused: (b: boolean) => void }) {
  const p = PRODUCTS[active];
  return (
    <div className="flex w-full max-w-[340px] flex-col items-center" onTouchStart={() => setPaused(true)}>
      <motion.div key={p.id} initial={{ opacity: 0, y: 18, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5, ease: easeWheel }} style={{ width: "100%", height: CARD_H }}>
        <Card product={p} center />
      </motion.div>
      <div className="mt-6 flex items-center gap-2">
        {PRODUCTS.map((pp, i) => (
          <button key={pp.id} onClick={() => go(i)} aria-label={pp.name} className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-7 bg-ink" : "w-2 bg-line-strong"}`} />
        ))}
      </div>
    </div>
  );
}
