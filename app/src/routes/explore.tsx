import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

import { SiteNav } from "../components/site/nav";
import { SiteFooter } from "../components/site/footer";
import { IndonesiaMap } from "../components/site/indonesia-map";
import { DestinationCard } from "../components/site/destination-card";
import { useT } from "../lib/i18n/context";
import { listDestinations } from "../lib/api/destinations.functions";

const searchSchema = z.object({
  province: z.string().optional(),
  category: z.string().optional(),
});

const CATEGORY_OPTIONS = ["budaya", "festival", "kuliner", "kerajinan", "alam-budaya"];

export const Route = createFileRoute("/explore")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ province: search.province, category: search.category }),
  loader: async ({ deps }) => {
    const result = await listDestinations({ data: deps });
    return result;
  },
  component: Explore,
  head: () => ({
    meta: [
      { title: "Explore Destinations · Culture Atlas" },
      {
        name: "description",
        content: "Filter Indonesia's hidden cultural destinations by province, culture, festival, cuisine, craft, or nature.",
      },
    ],
  }),
});

function Explore() {
  const { destinations, provinces } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const t = useT();

  function setFilter(key: "province" | "category", value: string | undefined) {
    navigate({
      search: (prev) => ({
        ...prev,
        [key]: prev[key] === value ? undefined : value,
      }),
    });
  }

  return (
    <div className="ca-motion">
      <SiteNav />

      <section className="px-6 pt-12">
        <div className="mx-auto max-w-7xl">
          <span className="ca-eyebrow">{t("explore.eyebrow")}</span>
          <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">{t("explore.title")}</h1>
        </div>
      </section>

      <section className="px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <IndonesiaMap
            pins={destinations.map((d) => ({
              slug: d.slug,
              name: d.name,
              province: d.province,
              category: d.category,
              lat: d.lat,
              lng: d.lng,
            }))}
            interactive
            className="w-full text-ca-ink"
          />
        </div>
      </section>

      <section className="px-6 pb-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="ca-eyebrow mr-1">{t("explore.filter.category")}</span>
            {CATEGORY_OPTIONS.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter("category", cat)}
                className={`border px-3 py-1.5 text-sm font-medium transition-colors ${
                  search.category === cat
                    ? "border-ca-ink bg-ca-ink text-ca-paper"
                    : "border-ca-ink/30 text-ca-ink hover:border-ca-ink"
                }`}
              >
                {t(`cat.${cat}`)}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="ca-eyebrow mr-1">{t("explore.filter.province")}</span>
            {provinces.map((province) => (
              <button
                key={province}
                onClick={() => setFilter("province", province)}
                className={`border px-3 py-1.5 text-sm font-medium transition-colors ${
                  search.province === province
                    ? "border-ca-ink bg-ca-ink text-ca-paper"
                    : "border-ca-ink/30 text-ca-ink hover:border-ca-ink"
                }`}
              >
                {province}
              </button>
            ))}
            {(search.province || search.category) && (
              <Link
                to="/explore"
                className="text-sm font-medium text-ca-ink-soft underline underline-offset-2 hover:text-ca-ink"
              >
                {t("btn.clearFilters")}
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="ca-rule px-6 py-12">
        <div className="mx-auto max-w-7xl">
          {destinations.length === 0 ? (
            <p className="text-ca-ink-soft">{t("explore.empty")}</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {destinations.map((destination) => (
                <DestinationCard key={destination.slug} destination={destination} />
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
