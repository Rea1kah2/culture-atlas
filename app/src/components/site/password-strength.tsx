// Password strength meter shown under the register form's password field.
//
// Advisory only: it never blocks submission. The hard requirement stays the
// schema's 8-character minimum; this just shows the user how much stronger
// they could make it, scored on exactly the criteria that were asked for
// (length, uppercase, digits, special symbols).
import { useT } from "../../lib/i18n/context";

const MAX_SCORE = 5;

export function scorePassword(password: string): number {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

type Level = "weak" | "medium" | "strong";

function levelFor(score: number): Level {
  if (score <= 2) return "weak";
  if (score <= 4) return "medium";
  return "strong";
}

const LEVEL_STYLES: Record<Level, { bar: string; text: string; labelKey: string }> = {
  weak: { bar: "bg-ca-error", text: "text-ca-error", labelKey: "auth.strength.weak" },
  medium: { bar: "bg-ca-warn", text: "text-ca-warn", labelKey: "auth.strength.medium" },
  strong: { bar: "bg-ca-success", text: "text-ca-success", labelKey: "auth.strength.strong" },
};

export function PasswordStrength({ password }: { password: string }) {
  const t = useT();

  // Nothing typed yet: stay quiet rather than greeting the user with a red
  // "weak" bar before they have had a chance to type anything.
  if (!password) return null;

  const score = scorePassword(password);
  const level = levelFor(score);
  const styles = LEVEL_STYLES[level];

  const missing: string[] = [];
  if (password.length < 8) missing.push(t("auth.strength.need.length"));
  if (!/[A-Z]/.test(password)) missing.push(t("auth.strength.need.upper"));
  if (!/[0-9]/.test(password)) missing.push(t("auth.strength.need.digit"));
  if (!/[^A-Za-z0-9]/.test(password)) missing.push(t("auth.strength.need.symbol"));

  return (
    <div className="mt-2">
      <div
        className="flex h-1.5 gap-1"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={MAX_SCORE}
        aria-valuenow={score}
        aria-label={t("auth.strength.label")}
      >
        {Array.from({ length: MAX_SCORE }, (_, i) => (
          <span
            key={i}
            className={`flex-1 transition-colors duration-200 ${
              i < score ? styles.bar : "bg-ca-ink/15"
            }`}
          />
        ))}
      </div>
      <p className="mt-1.5 text-xs">
        <span className={`font-semibold ${styles.text}`}>
          {t("auth.strength.label")}: {t(styles.labelKey)}
        </span>
        {missing.length > 0 && (
          <span className="text-ca-ink-soft"> · {t("auth.strength.add")} {missing.join(", ")}</span>
        )}
      </p>
    </div>
  );
}
