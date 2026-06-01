"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { ArrowRight, ChevronDown } from "./icons";

const USE_CASES = [
  { label: "AI for Buyers", href: "#alon", color: "#E2691A" },
  { label: "AI for Sellers", href: "#realtoros", color: "#2157A6" },
];

const linkClass = "rounded-full px-4 py-1.5 text-[14px] font-medium text-fg-mute transition-colors hover:bg-paper hover:text-ink";

function UseCasesMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={`flex items-center gap-1 ${linkClass} ${open ? "bg-paper text-ink" : ""}`}
      >
        Use Cases
        <ChevronDown className={`text-[1.05em] transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2.5">
          <div className="min-w-[184px] rounded-2xl border border-line bg-paper p-1.5 shadow-[0_24px_56px_-22px_rgba(15,23,41,0.4)]">
            {USE_CASES.map((c) => (
              <a
                key={c.href}
                href={c.href}
                onClick={() => setOpen(false)}
                className="group/uc flex items-center gap-2.5 rounded-xl px-3 py-2.5 transition-colors hover:bg-ink/[0.04]"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: c.color }} />
                <span className="text-[14px] font-medium text-ink">{c.label}</span>
                <ArrowRight className="ml-auto text-[1em] text-fg-faint opacity-0 transition-all group-hover/uc:translate-x-0.5 group-hover/uc:opacity-100" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex w-full max-w-[1200px] items-center justify-between rounded-full border px-3 py-2.5 transition-all duration-500 ${
          scrolled
            ? "border-line bg-paper/80 shadow-[0_10px_40px_-22px_rgba(15,23,41,0.4)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="flex items-center pl-2">
          <Logo />
        </div>

        <div className="hidden items-center rounded-full bg-ink/[0.04] p-1 lg:flex">
          <a href="#products" className={linkClass}>
            Platform
          </a>
          <UseCasesMenu />
          <a href="#pricing" className={linkClass}>
            Pricing
          </a>
        </div>

        <div className="flex items-center gap-2 pr-1">
          <a
            href="#demo"
            className="hidden rounded-full border border-line bg-paper/70 px-4 py-2 text-[14px] font-semibold text-ink transition-colors hover:border-line-strong sm:inline-flex"
          >
            Book a demo
          </a>
          <a
            href="#access"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2558A6] px-4 py-2 text-[14px] font-semibold text-white transition-all duration-300 hover:bg-[#1d477f] hover:shadow-[0_14px_30px_-14px_rgba(37,88,166,0.8)] active:scale-[0.98]"
          >
            Sign in / Sign Up
            <ArrowRight className="text-[1.1em]" />
          </a>
        </div>
      </nav>
    </header>
  );
}
