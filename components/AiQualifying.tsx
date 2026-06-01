"use client";

import { useEffect, useState } from "react";
import { animate, AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";

type Lvl = "hot" | "warm" | "cold";

interface Lead {
  id: string;
  name: string;
  init: string;
  sub: string;
  final: number;
  lvl: Lvl;
  rank: number;
}

// Mirrors the RealtorOS "close in · ai qualifying" hero (slide B)
const LEADS: Lead[] = [
  { id: "devraj", name: "Devraj Patel", init: "DP", sub: "voice inbound · property inquiry", final: 51, lvl: "cold", rank: 2 },
  { id: "chandan", name: "Chandan Joshi", init: "CJ", sub: "plot · sunshine smart city · ₹35 L", final: 22, lvl: "cold", rank: 3 },
  { id: "anita", name: "Anita Sharma", init: "AS", sub: "3BHK · trythat vista · ₹95L–1.1 Cr", final: 74, lvl: "warm", rank: 1 },
  { id: "priya", name: "Priya Mehta", init: "PM", sub: "3BHK · sunshine smart city · ₹1.2–1.5 Cr", final: 92, lvl: "hot", rank: 0 },
];

const SORTED = [...LEADS].sort((a, b) => a.rank - b.rank);
const TOP = SORTED[0];
const BY_ID = Object.fromEntries(LEADS.map((l) => [l.id, l]));

const LVL: Record<Lvl, { bg: string; text: string }> = {
  hot: { bg: "#FCE3E3", text: "#B3261E" },
  warm: { bg: "#FAEFD6", text: "#B45309" },
  cold: { bg: "rgba(10,10,18,0.05)", text: "#6B6877" },
};

function LeadRow({ lead, progress, calling, scored, isTop }: { lead: Lead; progress: ReturnType<typeof useMotionValue<number>>; calling: boolean; scored: boolean; isTop: boolean }) {
  const display = useTransform(progress, (p) => Math.round(lead.final * p));
  const c = LVL[lead.lvl];
  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 420, damping: 38 }}
      className="flex items-center gap-3 rounded-xl border bg-white px-3 py-2.5"
      style={{ borderColor: isTop ? "#2157A6" : "rgba(10,10,18,0.08)", boxShadow: isTop ? "0 10px 26px -14px rgba(33,87,166,0.55)" : "none" }}
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ros-navy text-[11px] font-semibold text-white">{lead.init}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-semibold text-ros-ink">{lead.name}</p>
        <p className="truncate font-mono text-[10px] text-ros-mute">{lead.sub}</p>
      </div>

      {calling ? (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(33,87,166,0.1)] px-2.5 py-1 text-[10.5px] font-semibold text-ros">
          <span className="flex gap-[3px]">
            {[0, 1, 2].map((i) => (
              <motion.span key={i} className="h-1 w-1 rounded-full bg-ros" animate={{ opacity: [0.25, 1, 0.25] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />
            ))}
          </span>
          ringing
        </span>
      ) : scored ? (
        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1" style={{ background: c.bg, color: c.text }}>
          <motion.span className="font-instrument text-[16px] leading-none">{display}</motion.span>
          <span className="text-[9px] font-bold uppercase tracking-wide">{lead.lvl}</span>
        </span>
      ) : (
        <span className="rounded-full bg-[rgba(10,10,18,0.05)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ros-mute">casual</span>
      )}
    </motion.div>
  );
}

export default function AiQualifying() {
  const [order, setOrder] = useState(LEADS.map((l) => l.id));
  const [callingId, setCallingId] = useState<string | null>(null);
  const [scored, setScored] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [actionShow, setActionShow] = useState(false);
  const [typed, setTyped] = useState("");
  const [kbPulse, setKbPulse] = useState(false);
  const progress = useMotionValue(0);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) => new Promise<void>((r) => timers.push(setTimeout(r, ms)));
    const type = async (text: string) => {
      for (let i = 1; i <= text.length && !cancelled; i++) {
        setTyped(text.slice(0, i));
        await wait(38);
      }
    };

    (async function loop() {
      while (!cancelled) {
        setOrder(LEADS.map((l) => l.id));
        setCallingId(null);
        setScored(false);
        setSorted(false);
        setActionShow(false);
        setTyped("");
        progress.set(0);
        await wait(450);

        await type("close in · ai qualifying");
        await wait(350);

        setKbPulse(true);
        await wait(1100);
        setKbPulse(false);

        for (const l of LEADS) {
          if (cancelled) break;
          setCallingId(l.id);
          await wait(820);
        }
        setCallingId(null);
        await wait(150);

        setScored(true);
        animate(progress, 1, { duration: 1, ease: "easeOut" });
        await wait(1250);

        setSorted(true);
        setOrder(SORTED.map((l) => l.id));
        await wait(950);

        setActionShow(true);
        await wait(3000);
      }
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [progress]);

  return (
    <div className="font-inter rounded-[20px] border bg-white/95 p-4 shadow-[0_34px_80px_-44px_rgba(10,10,18,0.4)] backdrop-blur sm:p-5" style={{ borderColor: "rgba(10,10,18,0.08)" }}>
      {/* header */}
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#15803D]" />
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ros-ink">
          {typed}
          <span className="ml-0.5 inline-block h-3 w-[1.5px] animate-caret bg-ros align-middle" />
        </span>
      </div>

      {/* knowledge base */}
      <motion.div
        animate={{ borderColor: kbPulse ? "rgba(33,87,166,0.55)" : "rgba(10,10,18,0.08)", backgroundColor: kbPulse ? "rgba(33,87,166,0.05)" : "rgba(10,10,18,0.02)" }}
        className="mt-3.5 flex items-center justify-between rounded-xl border px-3 py-2.5"
      >
        <div className="min-w-0">
          <p className="text-[12px] font-semibold text-ros-ink">Knowledge base · 4 projects</p>
          <p className="truncate font-mono text-[10px] text-ros-mute">listings · floor plans · price sheets · FAQs</p>
        </div>
        <span className="ml-2 shrink-0 rounded-md bg-[rgba(21,128,61,0.12)] px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide text-[#15803D]">ready</span>
      </motion.div>

      {/* leads */}
      <div className="mt-3 space-y-2">
        {order.map((id) => {
          const lead = BY_ID[id];
          return <LeadRow key={id} lead={lead} progress={progress} calling={callingId === id} scored={scored} isTop={sorted && id === TOP.id} />;
        })}
      </div>

      {/* action bar */}
      <AnimatePresence>
        {actionShow && (
          <motion.a
            href="https://realtors.trythat.ai/"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="mt-3 flex items-center justify-between rounded-xl bg-ros-navy px-4 py-3 text-white transition-transform hover:scale-[1.01]"
          >
            <span className="text-[13px] font-semibold">Call {TOP.name.split(" ")[0]} first</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="font-instrument text-[18px] leading-none">{TOP.final}</span>
              <span className="rounded-md bg-white/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide">hot</span>
            </span>
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
