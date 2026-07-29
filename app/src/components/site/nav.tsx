import { Link, useRouteContext, useRouter } from "@tanstack/react-router";
import { useState } from "react";

import { useT } from "../../lib/i18n/context";
import { LanguageSwitcher } from "./language-switcher";
import { Modal } from "./modal";
import { IconUser } from "./icons";
import { logoutUser } from "../../lib/api/auth.functions";

const LINKS = [
  { to: "/explore", key: "nav.explore" },
  { to: "/stories", key: "nav.stories" },
  { to: "/experiences", key: "nav.experiences" },
  { to: "/marketplace", key: "nav.marketplace" },
  { to: "/ambassador", key: "nav.ambassador" },
] as const;

export function SiteNav() {
  const t = useT();
  const { user } = useRouteContext({ from: "__root__" });
  const router = useRouter();
  const [confirmingLogout, setConfirmingLogout] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function confirmLogout() {
    setLoggingOut(true);
    try {
      await logoutUser();
      await router.invalidate();
      setConfirmingLogout(false);
    } finally {
      setLoggingOut(false);
    }
  }

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
          {user ? (
            <>
              {/* Icon-only, so it carries an explicit accessible name. */}
              <Link
                to="/account"
                aria-label={t("auth.nav.account")}
                title={t("auth.nav.account")}
                className="flex h-9 w-9 items-center justify-center border border-ca-ink/25 text-ca-ink-soft transition-colors hover:border-ca-ink hover:text-ca-ink [&.active]:border-ca-ink [&.active]:text-ca-ink"
              >
                <IconUser className="h-5 w-5" />
              </Link>
              <button
                type="button"
                onClick={() => setConfirmingLogout(true)}
                className="text-sm font-medium text-ca-ink-soft transition-colors hover:text-ca-ink"
              >
                {t("auth.nav.logout")}
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm font-medium text-ca-ink-soft transition-colors hover:text-ca-ink"
            >
              {t("auth.nav.login")}
            </Link>
          )}
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

      <Modal
        open={confirmingLogout}
        onOpenChange={setConfirmingLogout}
        title={t("auth.logout.confirm.title")}
        description={t("auth.logout.confirm.body")}
      >
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={() => setConfirmingLogout(false)}
            disabled={loggingOut}
            className="border border-ca-ink px-5 py-2.5 font-semibold text-ca-ink transition-colors hover:bg-ca-ink hover:text-ca-paper disabled:opacity-60"
          >
            {t("auth.logout.confirm.cancel")}
          </button>
          <button
            type="button"
            onClick={() => void confirmLogout()}
            disabled={loggingOut}
            className="border border-ca-ink bg-ca-ink px-5 py-2.5 font-semibold text-ca-paper transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {t("auth.logout.confirm.yes")}
          </button>
        </div>
      </Modal>
    </header>
  );
}
