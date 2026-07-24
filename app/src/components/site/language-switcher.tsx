// Compact segmented language toggle for the nav's top-right corner. Renders
// both options at once (flag + short code) so switching is one tap; the active
// language is highlighted. Purely client-driven via the language context.
import { LANGUAGES } from "../../lib/i18n/messages";
import { useLanguage } from "../../lib/i18n/context";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-ca-ink/25 bg-ca-paper-bright p-0.5 ${className ?? ""}`}
      role="group"
      aria-label={t("nav.language")}
    >
      {LANGUAGES.map((option) => {
        const active = option.code === lang;
        return (
          <button
            key={option.code}
            type="button"
            onClick={() => setLang(option.code)}
            aria-pressed={active}
            title={option.label}
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
              active
                ? "bg-ca-ink text-ca-paper-bright"
                : "text-ca-ink-soft hover:text-ca-ink"
            }`}
          >
            <span aria-hidden>{option.flag}</span>
            <span>{option.short}</span>
          </button>
        );
      })}
    </div>
  );
}
