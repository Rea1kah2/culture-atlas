import { DestinationPhoto } from "./destination-photo";
import { SustainabilityBadge } from "./sustainability-badge";
import { UnderlineLink } from "./cta/underline-link";
import { useT } from "../../lib/i18n/context";

export type DestinationSummary = {
  slug: string;
  name: string;
  province: string;
  category: string;
  tagline: string;
  sustainability_score: number;
  hero_image_url?: string | null;
  photo_credit_name?: string | null;
  photo_credit_license?: string | null;
  photo_credit_url?: string | null;
};

export function DestinationCard({ destination }: { destination: DestinationSummary }) {
  const t = useT();
  return (
    <article className="flex h-full flex-col border border-ca-ink/20 bg-ca-paper-bright">
      <DestinationPhoto
        name={destination.name}
        category={destination.category}
        heroImageUrl={destination.hero_image_url ?? null}
        photoCreditName={destination.photo_credit_name ?? null}
        photoCreditLicense={destination.photo_credit_license ?? null}
        photoCreditUrl={destination.photo_credit_url ?? null}
        className="rounded-none border-x-0 border-t-0"
      />
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="ca-eyebrow">{t(`cat.${destination.category}`)}</span>
          <SustainabilityBadge score={destination.sustainability_score} />
        </div>
        <h3 className="font-display text-xl font-bold leading-tight">{destination.name}</h3>
        <p className="text-sm text-ca-ink-soft">{destination.province}</p>
        <p className="text-sm text-ca-ink-soft">{destination.tagline}</p>
        <div className="mt-auto pt-2">
          <UnderlineLink to="/destinations/$slug" slug={destination.slug}>
            {t("btn.viewDestination")}
          </UnderlineLink>
        </div>
      </div>
    </article>
  );
}
