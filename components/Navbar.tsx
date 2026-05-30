"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { ArrowRight } from "./icons";

const NAV = ["Products", "ALON", "RealtorOS", "Pricing"];

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
          {NAV.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="rounded-full px-4 py-1.5 text-[14px] font-medium text-fg-mute transition-colors hover:bg-paper hover:text-ink"
            >
              {item}
            </a>
          ))}
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
