// CTA garment 2/6: destination-card link. Underline draws in from the left,
// arrow glyph slides right on hover. TanStack Router correlates `to` and
// `params` per literal route, which a generic passthrough prop breaks — so
// this takes a small discriminated union of the exact routes it's actually
// used for and calls `<Link>` directly with a literal `to` in each branch.
import { Link } from "@tanstack/react-router";
import { IconArrowRight } from "../icons";

type UnderlineLinkProps = {
  children: string;
} & (
  | { to: "/explore" | "/experiences" | "/marketplace" | "/ambassador" }
  | { to: "/destinations/$slug"; slug: string }
);

export function UnderlineLink(props: UnderlineLinkProps) {
  const className =
    "group/link relative inline-flex items-center gap-1.5 font-semibold text-ca-ink";
  const inner = (
    <>
      <span className="relative">
        {props.children}
        <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-ca-gold transition-[width] duration-300 ease-out group-hover/link:w-full" />
      </span>
      <IconArrowRight className="h-4 w-4 -translate-x-0.5 transition-transform duration-300 ease-out group-hover/link:translate-x-0.5" />
    </>
  );

  if (props.to === "/destinations/$slug") {
    return (
      <Link to="/destinations/$slug" params={{ slug: props.slug }} className={className}>
        {inner}
      </Link>
    );
  }

  return (
    <Link to={props.to} className={className}>
      {inner}
    </Link>
  );
}
