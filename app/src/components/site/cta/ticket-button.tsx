// CTA garment 3/6: experience reserve button. Dashed perforation edge, top
// corner peels back on hover — a ticket stub being torn. Links to the
// experience's own detail/reservation page (see routes/experiences/$slug.tsx)
// rather than acting inline, since reserving requires a login gate + a
// booking-request form. Only ever points at one experience's detail route,
// so `to` is hardcoded (see underline-link.tsx for why a generic `to` prop
// fights TanStack Router's typed params).
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function TicketButton({
  slug,
  children,
  className,
}: {
  slug: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to="/experiences/$slug"
      params={{ slug }}
      className={`group relative inline-flex items-center gap-2 overflow-hidden border border-ca-ink bg-ca-paper-bright px-6 py-3 font-semibold text-ca-ink transition-colors duration-200 hover:bg-ca-ink hover:text-ca-paper ${className ?? ""}`}
      style={{
        borderStyle: "dashed",
        clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)",
      }}
    >
      <span
        aria-hidden
        className="absolute right-0 top-0 h-3.5 w-3.5 origin-top-right bg-ca-paper transition-transform duration-200 ease-out group-hover:scale-[1.6] group-hover:rotate-6"
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
      />
      {children}
    </Link>
  );
}
