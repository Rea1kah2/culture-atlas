// Illustrated (not geographically precise) archipelago map — the shipped
// stand-in for the hero photograph until Higgsfield generation is available
// (design-brief.md "Asset plan"). Island silhouettes are simplified blobs;
// pins are projected from each destination's real lat/lng so their relative
// position on the map is still honest.
import { Link } from "@tanstack/react-router";

export type MapPin = {
  slug: string;
  name: string;
  province: string;
  category: string;
  lat: number;
  lng: number;
};

const VIEW_W = 1000;
const VIEW_H = 320;
const LNG_MIN = 94;
const LNG_MAX = 141.5;
const LAT_MAX = 6.5;
const LAT_MIN = -11.5;

function project(lat: number, lng: number) {
  const x = 30 + ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * (VIEW_W - 60);
  const y = 30 + ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * (VIEW_H - 60);
  return { x, y };
}

// Simplified island silhouettes, hand-drawn, roughly positioned west to east.
const ISLANDS = [
  // Sumatra
  "M70,60 C110,50 140,90 130,150 C120,210 90,260 70,270 C55,220 50,120 70,60 Z",
  // Java
  "M180,220 C260,210 340,225 400,235 C340,250 250,255 180,240 Z",
  // Kalimantan
  "M300,60 C380,45 460,70 470,140 C475,200 410,230 340,210 C290,190 280,110 300,60 Z",
  // Sulawesi (abstracted K-shape)
  "M520,80 C560,70 580,110 560,140 C590,150 610,190 580,210 C560,180 540,180 530,210 C510,180 500,140 520,120 C500,110 500,90 520,80 Z",
  // Nusa Tenggara chain
  "M620,240 C660,235 700,242 730,248 C760,252 800,255 830,258 C800,264 760,262 720,258 C680,256 640,252 620,240 Z",
];

type IndonesiaMapProps = {
  pins: MapPin[];
  interactive?: boolean;
  activeSlug?: string | null;
  className?: string;
};

export function IndonesiaMap({
  pins,
  interactive = false,
  activeSlug,
  className,
}: IndonesiaMapProps) {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      role="img"
      aria-label="Illustrated map of Indonesia with Culture Atlas destinations"
      className={className}
    >
      <title>Illustrated map of Indonesia</title>
      {ISLANDS.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="var(--color-ca-ink)"
          fillOpacity={0.1}
          stroke="var(--color-ca-ink)"
          strokeOpacity={0.3}
          strokeWidth={1}
        />
      ))}
      {pins.map((pin) => {
        const { x, y } = project(pin.lat, pin.lng);
        const isActive = activeSlug === pin.slug;
        const pinNode = (
          <g
            key={pin.slug}
            className="ca-map-pin"
            data-active={isActive || undefined}
          >
            <circle
              cx={x}
              cy={y}
              r={isActive ? 8 : 5.5}
              fill="var(--color-ca-gold)"
              stroke="var(--color-ca-ink)"
              strokeWidth={1.25}
            />
            {interactive && (
              <text
                x={x}
                y={y - 12}
                textAnchor="middle"
                fontSize="11"
                fontFamily="var(--font-body)"
                fill="var(--color-ca-ink)"
                className="pointer-events-none opacity-0 transition-opacity duration-150 group-hover:opacity-100"
              >
                {pin.name}
              </text>
            )}
          </g>
        );

        if (!interactive) return pinNode;

        return (
          <Link
            key={pin.slug}
            to="/destinations/$slug"
            params={{ slug: pin.slug }}
            className="group cursor-pointer"
            aria-label={`Lihat ${pin.name}, ${pin.province}`}
          >
            {pinNode}
          </Link>
        );
      })}
    </svg>
  );
}
