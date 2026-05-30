export default function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="/" className={`group inline-flex items-center ${className}`} aria-label="trythat.ai home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/trythat-logo.svg"
        alt="trythat.ai"
        className="h-7 w-auto transition-transform duration-300 group-hover:-translate-y-0.5 sm:h-8"
      />
    </a>
  );
}
