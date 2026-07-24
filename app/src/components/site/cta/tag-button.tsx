// CTA garment 4/6: marketplace product link. Hang-tag shape with a die-cut
// corner + string hole, tilts on hover like a swinging price tag. Only ever
// points at one product's detail route, so `to` is hardcoded (see
// underline-link.tsx for why a generic `to` prop fights TanStack Router's
// typed params).
import { Link } from "@tanstack/react-router";

export function TagButton({ slug, children }: { slug: string; children: string }) {
  return (
    <Link
      to="/marketplace/$slug"
      params={{ slug }}
      className="group/tag inline-flex origin-top-left items-center gap-2 border border-ca-ink bg-ca-paper px-4 py-2 text-sm font-semibold text-ca-ink transition-transform duration-200 ease-out hover:-rotate-3"
      style={{ clipPath: "polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)" }}
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full border border-ca-ink bg-ca-paper-bright"
      />
      {children}
    </Link>
  );
}
