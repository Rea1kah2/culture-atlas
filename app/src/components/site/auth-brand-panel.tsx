// Branding panel filling the otherwise-empty half of the Login/Register
// pages on large screens. Rendered as a solid navy card so it actually
// carries visual weight against the pale blue page background instead of
// reading as leftover copy.
//
// The logo lockup is composed in markup (existing transparent icon + the
// brand display font) rather than shipping a raster of the full lockup: it
// stays crisp at any size and needs no new asset. The amber accent rule is
// deliberate — per the palette notes, amber is only ever used on dark navy
// surfaces, which is exactly what this card is.
//
// Hidden below `lg` on purpose: the emptiness this solves is specific to
// wide monitors, and on a phone this panel would just push the form down.
import { IconCompass, IconMapPin, IconScroll } from "./icons";
import { useT } from "../../lib/i18n/context";
import type { SiteStats } from "../../lib/api/destinations.functions";

export function AuthBrandPanel({ stats }: { stats: SiteStats | null }) {
  const t = useT();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:justify-center">
      <div className="bg-ca-ink p-10 text-ca-paper">
        <div className="flex items-center gap-5">
          <img
            src="/assets/logo-icon.png"
            alt=""
            aria-hidden
            className="h-28 w-28 shrink-0 object-contain"
          />
          <div>
            <p className="font-display text-4xl font-bold leading-none tracking-tight text-ca-paper-bright">
              Culture Atlas
            </p>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-ca-gold-soft">
              {t("auth.brand.tagline")}
            </p>
          </div>
        </div>

        <div className="mt-8 h-px w-16 bg-ca-gold-soft" />

        <p className="mt-8 text-sm leading-relaxed text-ca-paper/80">
          {t("auth.brand.description")}
        </p>

        {stats && (
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-ca-paper/15 pt-8">
            <Stat
              icon={<IconMapPin className="h-5 w-5" />}
              value={stats.destinations}
              label={t("auth.brand.stat.destinations")}
            />
            <Stat
              icon={<IconCompass className="h-5 w-5" />}
              value={stats.provinces}
              label={t("auth.brand.stat.provinces")}
            />
            <Stat
              icon={<IconScroll className="h-5 w-5" />}
              value={stats.stories}
              label={t("auth.brand.stat.stories")}
            />
          </dl>
        )}
      </div>
    </aside>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <div>
      <span aria-hidden className="text-ca-gold-soft">
        {icon}
      </span>
      <dd className="mt-2 font-display text-2xl font-bold text-ca-paper-bright">{value}</dd>
      <dt className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ca-paper/60">
        {label}
      </dt>
    </div>
  );
}
