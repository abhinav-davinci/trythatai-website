"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Spark } from "./icons";
import AlonAvatar from "./AlonAvatar";

type AppId = "ai-chat" | "alon" | "realtoros";

interface App {
  id: AppId;
  name: string;
  role: string;
  url: string;
  link: string;
  color: string;
  features: string[];
  /** features that also exist on the other apps (platform-wide) */
  shared: string[];
}

const APPS: App[] = [
  {
    id: "ai-chat",
    name: "AI Chat",
    role: "discovery · the front door",
    url: "listings.trythat.ai",
    link: "https://trythat.ai/",
    color: "#2558A6",
    features: [
      "List a property and get notified on interest",
      "Browse properties with filters and search",
      "Save and get sellers' contact",
      "Get notified when a buyer shows interest",
      "Subscribe and get updates",
      "Insights",
      "RealtyBrief",
    ],
    shared: ["Subscribe and get updates", "Insights", "RealtyBrief"],
  },
  {
    id: "alon",
    name: "ALON",
    role: "for buyers",
    url: "buyers.trythat.ai",
    link: "https://alon.trythat.ai/",
    color: "#FF7E27",
    features: [
      "9 stages of buying a property",
      "Request data related to a listing",
      "Persona-tuned insights",
      "RealtyBrief",
    ],
    shared: ["Persona-tuned insights", "RealtyBrief"],
  },
  {
    id: "realtoros",
    name: "RealtorOS",
    role: "for sellers",
    url: "sellers.trythat.ai",
    link: "https://realtors.trythat.ai/",
    color: "#3B82F6",
    features: [
      "List property + AI videos & voice-over",
      "Request data + Data Terminal",
      "Subscribe and get updates",
      "AI workflows (voice + chat)",
      "Insights and reports",
      "Lead churning and initial bifurcation",
      "Automated marketing and brand building",
      "RealtyBrief",
    ],
    shared: ["Subscribe and get updates", "Insights and reports", "RealtyBrief"],
  },
];

// connector paths: hub (50,0) → each card top (17 / 50 / 83, 100)
const PATHS: Record<AppId, string> = {
  "ai-chat": "M50 0 C50 58 17 42 17 100",
  alon: "M50 0 L50 100",
  realtoros: "M50 0 C50 58 83 42 83 100",
};

export default function SystemMap() {
  const [active, setActive] = useState<AppId | null>(null);

  return (
    <section id="products" className="relative overflow-hidden px-5 py-24 text-white sm:py-28" style={{ background: "linear-gradient(180deg,#0b1020 0%,#080b14 100%)" }}>
      <div className="dotgrid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(80%_70%_at_50%_30%,#000,transparent)]" />

      <div className="relative mx-auto max-w-[1120px]">
        {/* header */}
        <div className="mx-auto max-w-[640px] text-center">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">
            <span className="h-px w-6 bg-white/30" /> The platform
          </span>
          <h2 className="mt-5 text-[clamp(1.9rem,3.8vw,2.9rem)] font-semibold leading-[1.05] tracking-tightest text-white">
            One super-app. Three apps.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-white/55">
            trythat.ai is one platform with three focused apps. Hover a branch to see what each one handles.
          </p>
        </div>

        {/* hub */}
        <div className="relative mt-16 flex justify-center">
          <div className="relative rounded-2xl border border-white/15 bg-white/[0.04] px-6 py-4 text-center backdrop-blur">
            <div className="flex items-baseline justify-center gap-1.5">
              <span className="text-[20px] font-bold tracking-tightest text-white">trythat</span>
              <span className="rounded-[6px] bg-gradient-to-br from-tt to-blue px-1.5 py-0.5 text-[13px] font-bold leading-none text-white">.ai</span>
            </div>
            <p className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/40">the super-app · trythat.ai</p>
            {/* hub anchor dot */}
            <span className="absolute -bottom-[5px] left-1/2 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-white lg:block" />
          </div>
        </div>

        {/* connectors (desktop) */}
        <div className="relative hidden h-[88px] lg:block">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            {APPS.map((app) => {
              const on = active === app.id;
              return (
                <g key={app.id}>
                  <path d={PATHS[app.id]} fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
                  <path
                    d={PATHS[app.id]}
                    fill="none"
                    stroke={app.color}
                    strokeWidth={1.6}
                    strokeDasharray="2 7"
                    vectorEffect="non-scaling-stroke"
                    className="conn-flow"
                    style={{ opacity: on ? 1 : 0.4, filter: on ? `drop-shadow(0 0 4px ${app.color})` : "none", transition: "opacity .3s" }}
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* mobile connector */}
        <div className="my-8 flex justify-center lg:hidden">
          <span className="h-10 w-px bg-white/15" />
        </div>

        {/* app cards */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:items-start lg:gap-6">
          {APPS.map((app) => {
            const on = active === app.id;
            const dim = active !== null && !on;
            return (
              <motion.div
                key={app.id}
                onMouseEnter={() => setActive(app.id)}
                onMouseLeave={() => setActive(null)}
                animate={{ opacity: dim ? 0.55 : 1, y: on ? -4 : 0 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-[22px] border bg-white/[0.025] p-5 backdrop-blur-sm sm:p-6"
                style={{
                  borderColor: on ? app.color : "rgba(255,255,255,0.1)",
                  boxShadow: on ? `0 30px 70px -40px ${app.color}, 0 0 0 1px ${app.color}40` : "none",
                }}
              >
                {/* anchor dot meeting the connector */}
                <span className="absolute -top-[6px] left-1/2 hidden h-3 w-3 -translate-x-1/2 rounded-full lg:block" style={{ backgroundColor: app.color, boxShadow: on ? `0 0 10px ${app.color}` : "none" }} />

                {/* header */}
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl" style={{ backgroundColor: app.id === "alon" ? "rgba(255,255,255,0.06)" : app.color, border: app.id === "alon" ? "1px solid rgba(255,255,255,0.12)" : "none" }}>
                    {app.id === "ai-chat" && <Spark className="text-[1.25em] text-white" />}
                    {app.id === "alon" && <AlonAvatar size={28} showRings={false} />}
                    {app.id === "realtoros" && <span className="font-serif text-[19px] font-semibold text-white">R</span>}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[20px] font-bold leading-none tracking-tight text-white">{app.name}</h3>
                    <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.12em]" style={{ color: app.color }}>{app.role}</p>
                  </div>
                </div>

                <a href={app.link} className="group/url mt-3 inline-flex items-center gap-1 font-mono text-[11px] text-white/40 transition-colors hover:text-white/70">
                  {app.url}
                  <ArrowUpRight className="text-[1.1em] transition-transform group-hover/url:translate-x-0.5 group-hover/url:-translate-y-0.5" />
                </a>

                <div className="my-4 h-px bg-white/8" />

                {/* features */}
                <ul className="space-y-2.5">
                  {app.features.map((f) => {
                    const isShared = app.shared.includes(f);
                    return (
                      <li key={f} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-white/85">
                        <span className="mt-[3px] grid h-4 w-4 shrink-0 place-items-center rounded-full" style={{ backgroundColor: `${app.color}26`, color: app.color }}>
                          <Check className="text-[10px]" />
                        </span>
                        <span className="flex-1">
                          {f}
                          {isShared && <span className="ml-1.5 align-middle font-mono text-[9px] uppercase tracking-wider text-white/30">· all apps</span>}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-10 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-white/35">
          Insights &amp; RealtyBrief ship across every app
        </p>
      </div>
    </section>
  );
}
