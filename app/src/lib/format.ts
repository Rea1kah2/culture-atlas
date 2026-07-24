export const CATEGORY_LABELS: Record<string, string> = {
  budaya: "Budaya",
  festival: "Festival",
  kuliner: "Kuliner",
  kerajinan: "Kerajinan",
  "alam-budaya": "Alam & Budaya",
};

export function categoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category;
}

export function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}
