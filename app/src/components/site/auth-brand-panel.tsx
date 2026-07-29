// Branding panel that fills the otherwise-empty half of the Login/Register
// pages on large screens. The logo lockup is composed in markup (existing
// transparent icon + the brand display font) rather than shipping a second
// raster image of the full lockup: it stays crisp at any size, scales with
// the layout, and needs no new asset.
//
// Hidden below `lg` on purpose — the complaint this solves is specifically
// about wide monitors; on a phone this long panel would only push the form
// down below the fold.
import { useT } from "../../lib/i18n/context";

export function AuthBrandPanel() {
  const t = useT();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:justify-center">
      <div className="max-w-md">
        <div className="flex items-center gap-4">
          <img
            src="/assets/logo-icon.png"
            alt=""
            aria-hidden
            className="h-20 w-20 shrink-0 object-contain"
          />
          <div>
            <p className="font-display text-3xl font-bold leading-none tracking-tight text-ca-ink">
              Culture Atlas
            </p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ca-ink-soft">
              {t("auth.brand.tagline")}
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-ca-ink/15 pt-8">
          <p className="text-sm leading-relaxed text-ca-ink-soft">{t("auth.brand.description")}</p>
        </div>
      </div>
    </aside>
  );
}
