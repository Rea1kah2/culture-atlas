import { IconCoffee, IconLeaf, IconMask, IconThread, IconCompass } from "./icons";

export function CategoryIcon({ category, className }: { category: string; className?: string }) {
  switch (category) {
    case "kuliner":
      return <IconCoffee className={className} />;
    case "kerajinan":
      return <IconThread className={className} />;
    case "festival":
      return <IconMask className={className} />;
    case "alam-budaya":
      return <IconLeaf className={className} />;
    default:
      return <IconCompass className={className} />;
  }
}
