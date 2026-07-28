// CTA garment 1/6 (design-brief.md CTA inventory): frosted-glass compass
// medallion card. Used ONCE page-wide for the single dominant landing CTA,
// floating over the hero photograph. Only ever points at /explore, so `to`
// is hardcoded (see underline-link.tsx for why a generic `to` prop fights
// TanStack Router's typed params).
import { Link } from "@tanstack/react-router";
import { IconCompass } from "../icons";

export function CompassMedallionButton({
  label,
  subtext,
}: {
  label: string;
  subtext: string;
}) {
  return (
    <Link
      to="/explore"
      className="group flex flex-col items-center gap-4 rounded-2xl border border-ca-gold/40 bg-ca-ink/30 px-10 py-8 backdrop-blur-md transition-all duration-200 ease-out hover:scale-[1.02] hover:border-ca-gold hover:bg-ca-ink/45"
    >
      <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-ca-gold text-ca-gold">
        <IconCompass className="h-8 w-8" />
      </span>
      <span className="font-display text-lg font-bold uppercase tracking-wide text-ca-paper-bright">
        {label}
      </span>
      <span className="relative pb-1 text-xs font-medium text-ca-paper/70">
        {subtext}
        <span className="absolute -bottom-0.5 left-1/2 h-px w-0 -translate-x-1/2 bg-ca-gold transition-[width] duration-300 ease-out group-hover:w-full" />
      </span>
    </Link>
  );
}
