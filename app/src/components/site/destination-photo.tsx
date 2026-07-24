// Real, CC-licensed photography where available (see migrations/0003), with
// the illustrated field-plate as an honest fallback for the two seeded
// destinations no properly-licensed photo could be found for. CC BY / CC
// BY-SA require visible attribution, so the credit line ships with the
// photo, not buried in a footer.
import { FieldPlate } from "./field-plate";
import { CategoryIcon } from "./category-icon";

type DestinationPhotoProps = {
  name: string;
  category: string;
  heroImageUrl: string | null;
  photoCreditName: string | null;
  photoCreditLicense: string | null;
  photoCreditUrl: string | null;
  aspect?: string;
  className?: string;
};

export function DestinationPhoto({
  name,
  category,
  heroImageUrl,
  photoCreditName,
  photoCreditLicense,
  photoCreditUrl,
  aspect = "aspect-[4/3]",
  className,
}: DestinationPhotoProps) {
  if (!heroImageUrl) {
    return (
      <FieldPlate
        icon={<CategoryIcon category={category} className="h-6 w-6" />}
        label={name}
        aspect={aspect}
        className={className}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-[4px] border border-ca-ink/25 ${aspect} ${className ?? ""}`}>
      <img
        src={heroImageUrl}
        alt={name}
        loading="lazy"
        className="h-full w-full object-cover"
      />
      {photoCreditName && (
        <a
          href={photoCreditUrl ?? undefined}
          target="_blank"
          rel="noreferrer noopener"
          className="absolute bottom-0 right-0 bg-ca-ink/70 px-2 py-1 text-[10px] text-ca-paper/90 hover:bg-ca-ink"
        >
          Photo: {photoCreditName} ({photoCreditLicense})
        </a>
      )}
    </div>
  );
}
