// CTA garment 5/6: ambassador application submit button. A rectangular
// visa-stamp shape drops and "stamps" onto the button on hover/focus.
import type { ButtonHTMLAttributes } from "react";

export function VisaStampButton({
  children,
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={`group relative inline-flex items-center gap-3 border-2 border-ca-ink bg-ca-ink px-8 py-4 font-display text-base font-bold uppercase tracking-wide text-ca-paper transition-opacity duration-150 hover:opacity-90 ${className ?? ""}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-1 -translate-y-3 rotate-[-6deg] border border-ca-gold opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-60 group-focus-visible:translate-y-0 group-focus-visible:opacity-60"
      />
      {children}
    </button>
  );
}
