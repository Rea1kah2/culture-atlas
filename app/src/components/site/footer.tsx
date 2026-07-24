import { Link } from "@tanstack/react-router";

import { useT } from "../../lib/i18n/context";

const CONTACT_EMAIL = "selvyanaangel10@gmail.com";

export function SiteFooter() {
  const t = useT();

  return (
    <footer className="border-t border-ca-ink/15 bg-ca-ink text-ca-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <span className="font-display text-lg font-bold">Culture Atlas</span>
          <p className="mt-3 max-w-[26ch] text-sm text-ca-paper/70">{t("footer.tagline")}</p>
        </div>
        <FooterColumn
          title={t("footer.col.explore")}
          links={[
            { to: "/explore", label: t("footer.link.destinations") },
            { to: "/stories", label: t("footer.link.stories") },
            { to: "/experiences", label: t("footer.link.experience") },
          ]}
        />
        <FooterColumn
          title={t("footer.col.participate")}
          links={[
            { to: "/marketplace", label: t("footer.link.marketplace") },
            { to: "/ambassador", label: t("footer.link.ambassador") },
          ]}
        />
        <div>
          <span className="ca-eyebrow text-ca-paper/60">{t("footer.col.contact")}</span>
          <p className="mt-3 text-sm text-ca-paper/70">{t("footer.contact.help")}</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-ca-paper hover:text-ca-gold-soft"
          >
            <span aria-hidden>📧</span>
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
      <div className="ca-rule mx-auto max-w-7xl px-6 py-5 text-xs text-ca-paper/50">
        {t("footer.legal")}
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { to: string; label: string }[];
}) {
  return (
    <div>
      <span className="ca-eyebrow text-ca-paper/60">{title}</span>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="text-sm text-ca-paper/80 hover:text-ca-paper">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
