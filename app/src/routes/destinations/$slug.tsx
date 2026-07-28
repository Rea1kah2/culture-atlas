import { createFileRoute, notFound } from "@tanstack/react-router";

import { SiteNav } from "../../components/site/nav";
import { SiteFooter } from "../../components/site/footer";
import { DestinationPhoto } from "../../components/site/destination-photo";
import { SustainabilityBadge } from "../../components/site/sustainability-badge";
import { IndonesiaMap } from "../../components/site/indonesia-map";
import { StoryArrowButton } from "../../components/site/cta/story-arrow-button";
import { TicketButton } from "../../components/site/cta/ticket-button";
import { TagButton } from "../../components/site/cta/tag-button";
import { formatIDR } from "../../lib/format";
import { useT } from "../../lib/i18n/context";

import { getDestination } from "../../lib/api/destinations.functions";
import { listStoriesForDestination } from "../../lib/api/stories.functions";
import { listExperiencesForDestination } from "../../lib/api/experiences.functions";
import { listProductsForDestination } from "../../lib/api/marketplace.functions";

export const Route = createFileRoute("/destinations/$slug")({
  loader: async ({ params }) => {
    const [{ destination }, stories, experiences, products] = await Promise.all([
      getDestination({ data: { slug: params.slug } }),
      listStoriesForDestination({ data: { destinationSlug: params.slug } }),
      listExperiencesForDestination({ data: { destinationSlug: params.slug } }),
      listProductsForDestination({ data: { destinationSlug: params.slug } }),
    ]);
    if (!destination) throw notFound();
    return {
      destination,
      stories: stories.stories,
      experiences: experiences.experiences,
      products: products.products,
    };
  },
  component: DestinationDetail,
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.destination.name} · Culture Atlas` },
          { name: "description", content: loaderData.destination.tagline },
        ]
      : [],
  }),
});

function DestinationDetail() {
  const { destination, stories, experiences, products } = Route.useLoaderData();
  const t = useT();
  const activities = destination.activities.split("\n").filter(Boolean);

  return (
    <div className="ca-motion">
      <SiteNav />

      <section className="px-6 pt-10">
        <div className="mx-auto max-w-5xl">
          <span className="ca-eyebrow">{destination.province}</span>
          <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
            <h1 className="font-display text-4xl font-bold md:text-5xl">{destination.name}</h1>
            <SustainabilityBadge score={destination.sustainability_score} />
          </div>
          <p className="mt-3 max-w-2xl text-lg text-ca-ink-soft">{destination.tagline}</p>
        </div>
      </section>

      <section className="px-6 py-8">
        <div className="mx-auto max-w-5xl">
          <DestinationPhoto
            name={destination.name}
            category={destination.category}
            heroImageUrl={destination.hero_image_url}
            photoCreditName={destination.photo_credit_name}
            photoCreditLicense={destination.photo_credit_license}
            photoCreditUrl={destination.photo_credit_url}
            aspect="aspect-[16/9]"
          />
        </div>
      </section>

      <section className="ca-rule px-6 py-12">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-xl font-bold">{t("dd.history")}</h2>
              <p className="mt-2 text-ca-ink-soft">{destination.history}</p>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold">{t("dd.culturalValue")}</h2>
              <p className="mt-2 text-ca-ink-soft">{destination.cultural_value}</p>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold">{t("dd.activities")}</h2>
              <ul className="mt-2 space-y-1.5">
                {activities.map((activity) => (
                  <li key={activity} className="flex gap-2 text-ca-ink-soft">
                    <span aria-hidden className="text-ca-gold">
                      •
                    </span>
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <aside className="space-y-6">
            <div className="border border-ca-ink/20 bg-ca-paper-bright p-5">
              <h3 className="ca-eyebrow">{t("dd.location")}</h3>
              <IndonesiaMap
                pins={[
                  {
                    slug: destination.slug,
                    name: destination.name,
                    province: destination.province,
                    category: destination.category,
                    lat: destination.lat,
                    lng: destination.lng,
                  },
                ]}
                activeSlug={destination.slug}
                className="mt-3 w-full text-ca-ink"
              />
              <p className="mt-3 text-sm font-semibold">{destination.province}</p>
            </div>
            <div className="border border-ca-ink/20 bg-ca-paper-bright p-5">
              <h3 className="ca-eyebrow">{t("dd.howToGetThere")}</h3>
              <p className="mt-2 text-sm text-ca-ink-soft">{destination.how_to_get_there}</p>
            </div>
            <div className="border border-ca-ink/20 bg-ca-paper-bright p-5">
              <h3 className="ca-eyebrow">{t("dd.sustainabilityScore")}</h3>
              <p className="mt-2 text-2xl font-display font-bold">
                {destination.sustainability_score}/100
              </p>
              <p className="mt-1 text-sm text-ca-ink-soft">{destination.sustainability_note}</p>
            </div>
          </aside>
        </div>
      </section>

      {stories.length > 0 && (
        <section className="ca-rule px-6 py-12">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-2xl font-bold">{t("dd.storiesFromHere")}</h2>
            <div className="mt-6 space-y-5">
              {stories.map((story) => (
                <div
                  key={story.slug}
                  className="flex items-center justify-between gap-4 border border-ca-ink/20 bg-ca-paper-bright p-5"
                >
                  <div>
                    <p className="font-display text-lg font-bold">{story.title}</p>
                    <p className="mt-1 text-sm text-ca-ink-soft">
                      {t("common.by")} {story.author_name}
                    </p>
                  </div>
                  <StoryArrowButton slug={story.slug} label={`${t("common.read")} ${story.title}`} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {experiences.length > 0 && (
        <section className="ca-rule px-6 py-12">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-2xl font-bold">{t("dd.localExperience")}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {experiences.map((exp) => (
                <div key={exp.slug} className="border border-ca-ink/20 bg-ca-paper-bright p-5">
                  <p className="font-display text-lg font-bold">{exp.title}</p>
                  <p className="mt-2 text-sm text-ca-ink-soft">{exp.description}</p>
                  <p className="mt-3 text-sm font-semibold">
                    {formatIDR(exp.price_idr)} · {exp.duration}
                  </p>
                  <TicketButton slug={exp.slug} className="mt-4">
                    {t("btn.reserveExperience")}
                  </TicketButton>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {products.length > 0 && (
        <section className="ca-rule px-6 py-12">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-2xl font-bold">{t("dd.fromMarketplace")}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {products.map((product) => (
                <div
                  key={product.slug}
                  className="flex items-center justify-between gap-4 border border-ca-ink/20 bg-ca-paper-bright p-5"
                >
                  <div>
                    <p className="font-display text-lg font-bold">{product.name}</p>
                    <p className="mt-1 text-sm text-ca-ink-soft">{formatIDR(product.price_idr)}</p>
                  </div>
                  <TagButton slug={product.slug}>{t("btn.viewProduct")}</TagButton>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}
