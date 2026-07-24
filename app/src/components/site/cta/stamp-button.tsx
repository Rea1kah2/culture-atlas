// CTA garment 1/6 (design-brief.md CTA inventory): circular wax-stamp
// button. Used ONCE page-wide for the single dominant landing CTA. Only
// ever points at /explore, so `to` is hardcoded (see underline-link.tsx for
// why a generic `to` prop fights TanStack Router's typed params).
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function StampButton({ children }: { children: ReactNode }) {
  return (
    <Link
      to="/explore"
      className="group relative inline-flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-2 border-ca-ink bg-ca-gold text-center font-display text-sm font-bold uppercase leading-tight tracking-wide text-ca-paper-bright shadow-[0_0_0_4px_var(--color-ca-paper),0_0_0_5px_var(--color-ca-ink)] transition-transform duration-150 ease-out will-change-transform hover:scale-[0.96] hover:-rotate-3 active:scale-[0.92]"
    >
      <span className="px-3">{children}</span>
    </Link>
  );
}
