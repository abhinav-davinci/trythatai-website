"use client";

import { motion } from "framer-motion";
import {
  ALON_LOGO_VIEWBOX,
  ALON_HEAD_PATHS,
  ALON_EAR_LEFT_PATH,
  ALON_EAR_RIGHT_PATH,
  ALON_BODY_PATHS,
  ALON_ACCENT_PATHS,
} from "@/lib/alonLogo";

/**
 * Web port of the ALON mascot avatar.
 * The original is a React Native (reanimated) component; this recreates the
 * same character and idle choreography (entrance, head bob, breathing, ear
 * flicks, gentle sway) with Framer Motion + layered SVG, plus pulse rings.
 *
 * The mascot's white parts stay white; its terracotta accents map to `accent`
 * (default = the site's ALON orange) so it stays on-brand on a navy surface.
 */

type P = { d: string; fill: string; transform?: string };

function mapFill(fill: string, accent: string) {
  const f = fill.toUpperCase();
  return f.startsWith("#FE") || f.startsWith("#FF") ? "#FFFFFF" : accent;
}

function Layer({ paths, accent }: { paths: P[]; accent: string }) {
  return (
    <svg viewBox={ALON_LOGO_VIEWBOX} width="100%" height="100%" style={{ display: "block", overflow: "visible" }}>
      {paths.map((p, i) => (
        <path key={i} d={p.d} fill={mapFill(p.fill, accent)} transform={p.transform} />
      ))}
    </svg>
  );
}

interface Props {
  size?: number;
  showRings?: boolean;
  accent?: string;
  className?: string;
}

export default function AlonAvatar({ size = 64, showRings = true, accent = "#FF7E27", className = "" }: Props) {
  const bob = size * 0.035;
  const swayX = size * 0.022;

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.7, y: -6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 180, damping: 13 }}
      aria-hidden
    >
      {showRings &&
        [0, 0.7].map((delay, i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 rounded-[34%]"
            style={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2, border: `1px solid ${accent}` }}
            initial={{ opacity: 0 }}
            animate={{ scale: [0.85, 1.7], opacity: [0.45, 0] }}
            transition={{ duration: 2.7, repeat: Infinity, ease: "easeOut", delay }}
          />
        ))}

      <div className="absolute inset-0">
        {/* body + hands — breathing */}
        <motion.div
          className="absolute inset-0"
          style={{ transformOrigin: "center bottom" }}
          animate={{ scaleY: [1, 1.02, 1] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Layer paths={ALON_BODY_PATHS} accent={accent} />
        </motion.div>

        {/* head — gentle bob + sway */}
        <motion.div
          className="absolute inset-0"
          animate={{ y: [-bob, bob, -bob], x: [-swayX, swayX, -swayX] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Layer paths={ALON_HEAD_PATHS} accent={accent} />
        </motion.div>

        {/* left ear — occasional flick */}
        <motion.div
          className="absolute inset-0"
          style={{ transformOrigin: "32% 42%" }}
          animate={{ scale: [1, 1, 1.12, 1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.45, 0.5, 0.57, 1] }}
        >
          <Layer paths={[ALON_EAR_LEFT_PATH]} accent={accent} />
        </motion.div>

        {/* right ear — flick, offset in time */}
        <motion.div
          className="absolute inset-0"
          style={{ transformOrigin: "68% 42%" }}
          animate={{ scale: [1, 1, 1.12, 1, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", times: [0, 0.6, 0.65, 0.72, 1], delay: 1.4 }}
        >
          <Layer paths={[ALON_EAR_RIGHT_PATH]} accent={accent} />
        </motion.div>

        {/* center accent — subtle sway */}
        <motion.div
          className="absolute inset-0"
          animate={{ x: [-swayX * 0.6, swayX * 0.6, -swayX * 0.6] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Layer paths={ALON_ACCENT_PATHS} accent={accent} />
        </motion.div>
      </div>
    </motion.div>
  );
}
