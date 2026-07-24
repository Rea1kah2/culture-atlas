import { createFileRoute, notFound } from "@tanstack/react-router";

import { SiteNav } from "../../components/site/nav";
import { SiteFooter } from "../../components/site/footer";
import { FieldPlate } from "../../components/site/field-plate";
import { IconThread, IconCoffee } from "../../components/site/icons";
import { UnderlineLink } from "../../components/site/cta/underline-link";
import { formatIDR } from "../../lib/format";
import { useT } from "../../lib/i18n/context";
import { getProduct } from "../../lib/api/marketplace.functions";

export const Route = createFileRoute("/marketplace/$slug")({
  loader: async ({ params }) => {
    const { product } = await getProduct({ data: { slug: params.slug } });
    if (!product) throw notFound();
    return { product };
  },
  component: ProductDetail,
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} · Culture Atlas Marketplace` },
          { name: "description", content: loaderData.product.description },
        ]
      : [],
  }),
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const t = useT();

  return (
    <div className="ca-motion">
      <SiteNav />
      <section className="px-6 py-12">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          <FieldPlate
            icon={
              product.category === "kopi" ? (
                <IconCoffee className="h-8 w-8" />
              ) : (
                <IconThread className="h-8 w-8" />
              )
            }
            label={product.name}
            aspect="aspect-square"
          />
          <div>
            <span className="ca-eyebrow capitalize">{product.category}</span>
            <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">{product.name}</h1>
            <p className="mt-4 text-2xl font-display font-bold text-ca-gold">
              {formatIDR(product.price_idr)}
            </p>
            <p className="mt-4 text-ca-ink-soft">{product.description}</p>
            <p className="mt-4 text-sm font-semibold">
              {t("common.madeBy")} {product.maker_name}
            </p>
            <div className="ca-rule mt-8 pt-6">
              <UnderlineLink to="/destinations/$slug" slug={product.destination_slug}>
                {`${t("common.view")} ${product.destination_name}`}
              </UnderlineLink>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
