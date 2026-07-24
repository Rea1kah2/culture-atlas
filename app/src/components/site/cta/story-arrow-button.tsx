// CTA garment 6/6: story card link. Folded-corner arrow icon that unfolds
// (rotates 45°) on hover, distinct from the destination-card underline link.
// Only ever points at one story's detail route, so `to` is hardcoded (see
// underline-link.tsx for why a generic `to` prop fights TanStack Router's
// typed params).
import { Link } from "@tanstack/react-router";
import { IconFoldArrow } from "../icons";

export function StoryArrowButton({ slug, label }: { slug: string; label: string }) {
  return (
    <Link
      to="/stories/$slug"
      params={{ slug }}
      aria-label={label}
      className="group/story inline-flex h-11 w-11 shrink-0 items-center justify-center border border-ca-ink text-ca-ink transition-colors duration-200 hover:bg-ca-ink hover:text-ca-paper"
    >
      <IconFoldArrow className="h-5 w-5 transition-transform duration-300 ease-out group-hover/story:rotate-45" />
    </Link>
  );
}
