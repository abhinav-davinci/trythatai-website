import { ArrowRight } from "./icons";
import Logo from "./Logo";

const COLS: { title: string; links: string[] }[] = [
  { title: "Products", links: ["AI-Chat", "ALON", "RealtorOS", "Pricing"] },
  { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
  { title: "Legal", links: ["Privacy", "Terms", "Security"] },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink px-5 pb-10 pt-16 text-white">
      <div className="mx-auto max-w-[1120px]">
        {/* the two-sides balance beam */}
        <div className="flex items-center gap-4 pb-14">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-orange">Buyers</span>
          <span className="h-px flex-1 bg-white/12" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/45">one AI</span>
          <span className="h-px flex-1 bg-white/12" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6fa0e8]">Sellers</span>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          {/* brand */}
          <div>
            <Logo className="h-8" />
            <p className="mt-4 max-w-[24rem] text-[15px] leading-relaxed text-white/55">
              India&apos;s real estate super app. One platform for every side of the deal.
            </p>
            <a
              href="#access"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2558A6] px-5 py-2.5 text-[14px] font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              Sign in / Sign Up
              <ArrowRight className="text-[1.1em]" />
            </a>
          </div>

          {/* link columns */}
          <div className="grid grid-cols-3 gap-8">
            {COLS.map((c) => (
              <div key={c.title}>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/35">{c.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-[14px] text-white/65 transition-colors hover:text-white">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="font-mono text-[11px] tracking-wide text-white/35">
            © 2026 trythat.ai · Made in Pune, India
          </p>
          <div className="flex items-center gap-5">
            {["X", "LinkedIn", "Instagram"].map((s) => (
              <a key={s} href="#" className="font-mono text-[11px] uppercase tracking-wide text-white/45 transition-colors hover:text-white">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
