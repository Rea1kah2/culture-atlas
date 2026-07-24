// Illustrated "specimen plate" — the shipped stand-in for a destination
// photograph everywhere a photo would normally run (design-brief.md "Asset
// plan": Higgsfield photo generation is pending credits, so this is a
// deliberate illustration style, not a broken/empty state). Once generation
// is available, swap the background layer for the generated photo and keep
// this component's label/frame chrome.
import type { ReactNode } from "react";

export function FieldPlate({
  icon,
  label,
  aspect = "aspect-[4/3]",
  className,
}: {
  icon: ReactNode;
  label: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[4px] border border-ca-ink/25 bg-ca-paper-deep ${aspect} ${className ?? ""}`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, var(--color-ca-ink) 0, var(--color-ca-ink) 1px, transparent 1px, transparent 10px)",
        }}
      />
      <div className="relative flex h-full flex-col items-center justify-center gap-2 p-4 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ca-ink/40 bg-ca-paper text-ca-ink">
          {icon}
        </span>
        <span className="ca-eyebrow text-[10px]">{label}</span>
      </div>
    </div>
  );
}
