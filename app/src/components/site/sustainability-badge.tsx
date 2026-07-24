import { IconLeaf } from "./icons";

export function SustainabilityBadge({ score }: { score: number }) {
  return (
    <div
      className="inline-flex items-center gap-1.5 border border-ca-ink/30 bg-ca-paper-bright px-2.5 py-1 text-xs font-semibold text-ca-ink"
      title="Culture Atlas Sustainability Score"
    >
      <IconLeaf className="h-3.5 w-3.5 text-ca-gold" />
      {score}/100
    </div>
  );
}
