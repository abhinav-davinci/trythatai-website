import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light canvas — the bar is a crisp elevated surface
        canvas: "#F3F5F8",
        paper: "#FFFFFF",
        // Dark ink — headings, dark buttons
        ink: {
          DEFAULT: "#0F1729",
          800: "#1B2333",
          700: "#2A3343",
        },
        // Text scale
        fg: {
          DEFAULT: "#27303F",
          mute: "#5A6477",
          faint: "#97A0B0",
        },
        line: {
          DEFAULT: "rgba(15,23,41,0.10)",
          soft: "rgba(15,23,41,0.06)",
          strong: "rgba(15,23,41,0.16)",
        },
        // ALON · buyers · left territory  (·bright = readable text, ·DEFAULT = vivid dot)
        teal: {
          DEFAULT: "#14B8A6",
          bright: "#0D9488",
          deep: "#0F766E",
        },
        // RealtorOS · builders/sellers · right territory
        blue: {
          DEFAULT: "#3B82F6",
          bright: "#2563EB",
          deep: "#1D4ED8",
          soft: "#EAF1FE",
        },
        wa: "#1FAE54",
        hot: "#E11D48",
        gold: "#B45309",
        // ALON · buyers · warm orange
        orange: { DEFAULT: "#FF7E27", deep: "#E2691A", soft: "#FBF1E8" },
        // trythat brand accent · cool blue
        tt: { DEFAULT: "#2558A6", deep: "#1D477F", soft: "#EAF1FB" },
        // RealtorOS · matches realtors.trythat.ai exactly
        ros: { DEFAULT: "#2157A6", navy: "#0D2547", ink: "#0A0A12", mute: "#6B6877", bg: "#FAF9F5" },
      },
      fontFamily: {
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        tighter2: "-0.03em",
      },
      boxShadow: {
        bar: "inset 0 1px 0 rgba(255,255,255,0.9), 0 2px 6px rgba(15,23,41,0.05), 0 28px 60px -26px rgba(15,23,41,0.28)",
        card: "0 1px 0 rgba(255,255,255,0.8) inset, 0 18px 44px -26px rgba(15,23,41,0.28)",
        glowteal: "0 14px 44px -16px rgba(20,184,166,0.55)",
        glowblue: "0 14px 44px -16px rgba(59,130,246,0.5)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        caret: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        caret: "caret 1.05s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
