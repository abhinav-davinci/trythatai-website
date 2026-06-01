import type { SVGProps } from "react";

type I = SVGProps<SVGSVGElement>;

export const ArrowRight = (p: I) => (
  <svg viewBox="0 0 20 20" fill="none" width="1em" height="1em" {...p}>
    <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowUpRight = (p: I) => (
  <svg viewBox="0 0 20 20" fill="none" width="1em" height="1em" {...p}>
    <path d="M6 14 14 6M7 6h7v7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Return = (p: I) => (
  <svg viewBox="0 0 20 20" fill="none" width="1em" height="1em" {...p}>
    <path d="M16 5v4a2 2 0 0 1-2 2H5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 8 5 11l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronDown = (p: I) => (
  <svg viewBox="0 0 20 20" fill="none" width="1em" height="1em" {...p}>
    <path d="M5 7.5 10 12.5 15 7.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Spark = (p: I) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...p}>
    <path d="M12 3c.5 4.2 1.8 5.5 6 6-4.2.5-5.5 1.8-6 6-.5-4.2-1.8-5.5-6-6 4.2-.5 5.5-1.8 6-6Z" fill="currentColor" />
  </svg>
);

export const Bolt = (p: I) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...p}>
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" fill="currentColor" />
  </svg>
);

export const Check = (p: I) => (
  <svg viewBox="0 0 16 16" fill="none" width="1em" height="1em" {...p}>
    <path d="M3.5 8.5 6.5 11.5 12.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Whatsapp = (p: I) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" {...p}>
    <path d="M12 2a10 10 0 0 0-8.6 15.05L2 22l5.1-1.33A10 10 0 1 0 12 2Zm5.5 14.1c-.23.65-1.34 1.24-1.85 1.28-.5.05-1 .24-3.32-.69-2.8-1.1-4.55-3.96-4.69-4.14-.14-.18-1.12-1.49-1.12-2.84 0-1.35.7-2.02.96-2.3.23-.25.5-.31.67-.31.16 0 .33 0 .47.01.16.01.37-.06.57.44.23.55.79 1.9.86 2.04.07.14.11.3.02.48-.09.18-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.28.29-.12.57.16.27.72 1.18 1.54 1.92 1.06.94 1.95 1.24 2.23 1.38.27.14.43.12.59-.07.16-.18.68-.79.86-1.06.18-.27.36-.23.61-.14.25.09 1.6.76 1.87.9.27.14.45.2.52.32.07.11.07.65-.16 1.29Z" />
  </svg>
);

export const Compass = (p: I) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...p}>
    <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.6" />
    <path d="M15.2 8.8 13.4 13.4 8.8 15.2l1.8-4.6 4.6-1.8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

export const Building = (p: I) => (
  <svg viewBox="0 0 24 24" fill="none" width="1em" height="1em" {...p}>
    <path d="M5 20V6.5L12.5 4v16M12.5 20V9l6 2v9M3.5 20h17" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);
