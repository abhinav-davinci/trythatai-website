"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const QA = [
  {
    q: "Is trythat.ai a broker?",
    a: "No. trythat is an AI platform that helps buyers and sellers deal directly. We do not take brokerage on closures.",
  },
  {
    q: "Which cities does trythat cover?",
    a: "We are live in Pune today, with more Indian cities rolling out through the year.",
  },
  {
    q: "What's the difference between Trythat for buyers and for sellers?",
    a: "Trythat for buyers runs the full 9-stage buying journey. Trythat for sellers helps realtors and builders list, market, qualify leads and close. Same platform, one for each side of the deal.",
  },
  {
    q: "How does trythat make money?",
    a: "Buyers use Trythat free. Sellers pay for AI agents and consumables like AI video, voice minutes and data credits.",
  },
  {
    q: "Is my data safe?",
    a: "Your contact stays yours and is never shared without your go-ahead. Data is encrypted, and you control what gets requested.",
  },
  {
    q: "Can I use trythat without signing up?",
    a: "Yes. Start a chat instantly. Sign up only when you want to save a search or launch a product.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative bg-paper px-5 py-24 sm:py-28">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        {/* sticky headline */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-tt">
            <span className="h-px w-6 bg-tt" /> FAQ
          </span>
          <h2 className="mt-5 text-[clamp(2rem,4vw,2.9rem)] font-semibold leading-[1.04] tracking-tightest text-ink">
            Questions you might be sitting on.
          </h2>
          <p className="mt-5 max-w-[26rem] text-[15px] leading-relaxed text-fg-mute">
            Still wondering? Start a chat at the top of the page and get a straight answer in plain English.
          </p>
        </div>

        {/* accordion */}
        <div>
          {QA.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-t border-line last:border-b">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[18px] font-medium text-ink sm:text-[19px]">{item.q}</span>
                  <span
                    className={`relative grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                      isOpen ? "border-tt bg-tt" : "border-line bg-paper"
                    }`}
                  >
                    <span className={`absolute h-[1.5px] w-3.5 rounded-full transition-colors ${isOpen ? "bg-white" : "bg-ink"}`} />
                    <span
                      className={`absolute h-3.5 w-[1.5px] rounded-full transition-all duration-300 ${isOpen ? "scale-y-0 bg-white" : "bg-ink"}`}
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[42rem] pb-7 pr-12 text-[15px] leading-relaxed text-fg-mute">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
