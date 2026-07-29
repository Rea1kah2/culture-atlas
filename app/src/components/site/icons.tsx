// Hand-authored icon set standing in for the Higgsfield-generated custom icon
// set (design-brief.md "Asset plan": generation pending credits). Single
// stroke weight, ink color, stamp/compass/field-note motif so the set reads
// as one system rather than a mixed icon-font grab-bag.
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconCompass(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5 13 13l-4.5 2.5L11 11l4.5-2.5Z" />
    </svg>
  );
}

export function IconLeaf(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 19c8-1 12-6 13-13-8 1-13 5-13 13Z" />
      <path d="M6 18c3-3 5-6 6-10" />
    </svg>
  );
}

export function IconThread(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      <path d="M7 4v16M17 4v16" strokeDasharray="1 3" />
    </svg>
  );
}

export function IconMask(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9c0-3 3.5-5 8-5s8 2 8 5c0 6-3.5 10-8 10S4 15 4 9Z" />
      <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none" />
      <path d="M9 14c1 1 5 1 6 0" />
    </svg>
  );
}

export function IconCoffee(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 9h11v5a5 5 0 0 1-5 5H9a4 4 0 0 1-4-4V9Z" />
      <path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16" />
      <path d="M8 4c-.5 1-.5 1.5 0 2.5M11.5 4c-.5 1-.5 1.5 0 2.5" />
    </svg>
  );
}

export function IconMapPin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.3" />
    </svg>
  );
}

export function IconStamp(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="4" width="12" height="9" rx="1" />
      <path d="M9 13v3l3-1.5L15 16v-3" />
      <path d="M5 20h14" />
    </svg>
  );
}

export function IconScroll(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 4h9a3 3 0 0 1 3 3v13" />
      <path d="M6 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12" />
      <path d="M9 9h6M9 13h6" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconFoldArrow(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 5h11l3 3v11H5V5Z" />
      <path d="M16 5v3h3" />
      <path d="M9 14l6-6M15 8v6h-6" />
    </svg>
  );
}

export function IconEye(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function IconEyeOff(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9.9 5.8A9.6 9.6 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-3.2 3.9" />
      <path d="M6.5 7.6A17.3 17.3 0 0 0 2.5 12S6 18.5 12 18.5c1.5 0 2.8-.4 4-1" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
      <path d="M4 4l16 16" />
    </svg>
  );
}

export function IconUser(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19.5c0-3.3 3.1-5.5 7-5.5s7 2.2 7 5.5" />
    </svg>
  );
}

export function IconCheckCircle(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.2l2.6 2.6L16 9.4" />
    </svg>
  );
}

export function IconLogout(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8" />
      <path d="M17 8.5l3.5 3.5-3.5 3.5" />
      <path d="M20.5 12H10" />
    </svg>
  );
}
