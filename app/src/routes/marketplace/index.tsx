import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

import { SiteNav } from "../../components/site/nav";
import { SiteFooter } from "../../components/site/footer";
import { FieldPlate } from "../../components/site/field-plate";
import { IconThread, IconCoffee } from "../../components/site/icons";
import { TagButton } from "../../components/site/cta/tag-button";
import { formatIDR } from "../../lib/format";
import { useT } from "../../lib/i18n/context";
import { listProducts } from "../../lib/api/marketplace.functions";

const searchSchema = z.object({ category: z.string().optional() });
const CATEGORIES = ["tenun", "kopi", "kerajinan", "makanan"];

export const Route = createFileRoute("/marketplace/")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ category: search.category }),
  loader: async ({ deps }) => listProducts({ data: deps }),
  component: Marketplace,
  head: () => ({
    meta: [
      { title: "Local Marketplace · Culture Atlas" },
      {
        name: "description",
        content: "Woven textiles, coffee, crafts, and food made by the communities behind Indonesia's hidden cultural destinations.",
      },
    ],
  }),
});

function Marketplace() {
  const { products } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const t = useT();

  return (
    <div className="ca-motion">
      <SiteNav />
      <section className="px-6 pt-12 pb-8">
        <div className="mx-auto max-w-7xl">
          <span className="ca-eyebrow">{t("marketplace.eyebrow")}</span>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold md:text-5xl">
            {t("marketplace.title")}
          </h1>
        </div>
      </section>

      <section className="px-6 pb-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                navigate({
                  search: (prev) => ({ ...prev, category: prev.category === cat ? undefined : cat }),
                })
              }
              className={`border px-3 py-1.5 text-sm font-medium capitalize transition-colors ${
                search.category === cat
                  ? "border-ca-ink bg-ca-ink text-ca-paper"
                  : "border-ca-ink/30 text-ca-ink hover:border-ca-ink"
              }`}
            >
              {cat}
            </button>
          ))}
          {search.category && (
            <Link
              to="/marketplace"
              className="text-sm font-medium text-ca-ink-soft underline underline-offset-2 hover:text-ca-ink"
            >
              {t("marketplace.clearFilter")}
            </Link>
          )}
        </div>
      </section>

      <section className="ca-rule px-6 py-12">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article key={product.slug} className="flex flex-col border border-ca-ink/20 bg-ca-paper-bright">
              <FieldPlate
                icon={
                  product.category === "kopi" ? (
                    <IconCoffee className="h-6 w-6" />
                  ) : (
                    <IconThread className="h-6 w-6" />
                  )
                }
                label={product.name}
                className="rounded-none border-x-0 border-t-0"
              />
              <div className="flex flex-1 flex-col gap-2 p-5">
                <span className="ca-eyebrow capitalize">{product.category}</span>
                <h2 className="font-display text-lg font-bold leading-tight">{product.name}</h2>
                <p className="text-sm text-ca-ink-soft">{product.description}</p>
                <p className="mt-1 text-sm font-semibold">{formatIDR(product.price_idr)}</p>
                <p className="text-xs text-ca-ink-soft">
                  {t("common.by")} {product.maker_name}
                </p>
                <div className="mt-auto pt-3">
                  <TagButton slug={product.slug}>{t("btn.viewProduct")}</TagButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
