import { Link } from "@tanstack/react-router";

import { useT } from "../../lib/i18n/context";
import { LanguageSwitcher } from "./language-switcher";

const LINKS = [
  { to: "/explore", key: "nav.explore" },
  { to: "/stories", key: "nav.stories" },
  { to: "/experiences", key: "nav.experiences" },
  { to: "/marketplace", key: "nav.marketplace" },
  { to: "/ambassador", key: "nav.ambassador" },
] as const;

export function SiteNav() {
  const t = useT();

  return (
    <header className="sticky top-0 z-40 border-b border-ca-ink/15 bg-ca-paper/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src="/assets/logo-icon.png"
            alt="Culture Atlas"
            className="h-8 w-8 shrink-0 object-contain"
          />
          <span className="font-display text-lg font-bold tracking-tight">Culture Atlas</span>
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-ca-ink-soft transition-colors hover:text-ca-ink [&.active]:text-ca-ink [&.active]:font-semibold"
            >
              {t(link.key)}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            to="/explore"
            className="hidden border border-ca-ink px-4 py-2 text-sm font-semibold text-ca-ink transition-colors hover:bg-ca-ink hover:text-ca-paper md:inline-block"
          >
            {t("nav.cta")}
          </Link>
        </div>
      </nav>
      {/* Explicit mobile collapse: horizontally scrollable link strip instead
       * of hiding navigation entirely below md. */}
      <div className="flex gap-5 overflow-x-auto border-t border-ca-ink/10 px-6 py-2.5 md:hidden">
        {LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="shrink-0 text-sm font-medium text-ca-ink-soft [&.active]:text-ca-ink [&.active]:font-semibold"
          >
            {t(link.key)}
          </Link>
        ))}
      </div>
    </header>
  );
}
