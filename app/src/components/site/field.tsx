// Shared labelled form field. An identical local copy of this had been
// pasted into each auth/form route; extracted here so the pages touched in
// this change (login, register, account) share one definition instead of
// growing more copies.
import type { ReactNode } from "react";

export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ca-ink">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-sm text-ca-error">{error}</span>}
    </label>
  );
}
