import { createFileRoute } from "@tanstack/react-router";

import { SiteNav } from "../components/site/nav";
import { SiteFooter } from "../components/site/footer";
import { KineticHeadline } from "../components/site/kinetic-headline";
import { IndonesiaMap } from "../components/site/indonesia-map";
import { DestinationCard } from "../components/site/destination-card";
import { FieldPlate } from "../components/site/field-plate";
import { CompassMedallionButton } from "../components/site/cta/compass-medallion-button";
import { UnderlineLink } from "../components/site/cta/underline-link";
import { StoryArrowButton } from "../components/site/cta/story-arrow-button";
import {
  IconCompass,
  IconScroll,
  IconLeaf,
  IconMask,
  IconThread,
  IconCoffee,
} from "../components/site/icons";
import { useT } from "../lib/i18n/context";

import {
  listFeaturedDestinations,
  listMapPins,
  getSiteStats,
} from "../lib/api/destinations.functions";
import { listStories } from "../lib/api/stories.functions";
import { listExperiences } from "../lib/api/experiences.functions";
import { listProducts } from "../lib/api/marketplace.functions";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [featured, pins, stories, experiences, products, siteStats] = await Promise.all([
      listFeaturedDestinations(),
      listMapPins(),
      listStories(),
      listExperiences(),
      listProducts({ data: {} }),
      getSiteStats(),
    ]);
    return {
      destinations: featured.destinations,
      pins: pins.pins,
      story: stories.stories[0] ?? null,
      experience: experiences.experiences[0] ?? null,
      product: products.products[0] ?? null,
      stats: siteStats.stats,
    };
  },
  component: Landing,
});

const CATEGORIES = [
  { key: "budaya", icon: IconCompass },
  { key: "festival", icon: IconMask },
  { key: "kuliner", icon: IconCoffee },
  { key: "kerajinan", icon: IconThread },
  { key: "alam-budaya", icon: IconLeaf },
];

// Hero photograph credit — real, CC BY 4.0 image of Wae Rebo (Flores) used as
// the landing backdrop. Attribution is required by the license.
const HERO_CREDIT = {
  name: "Jakub Hałun",
  license: "CC BY 4.0",
  url: "https://commons.wikimedia.org/wiki/File:Distant_view_of_Wae_Rebo_village,_Flores_Island,_Indonesia,_20250824_0824_3037.jpg",
};

function Landing() {
  const { destinations, pins, story, experience, product, stats } = Route.useLoaderData();
  const t = useT();

  // t() has no interpolation support, so the live count is composed here in
  // JSX rather than baked into an i18n string -- the same pattern already
  // used by AuthBrandPanel's stat row. Falls back to a count-less phrase if
  // the stats query ever fails, rather than hiding the CTA's subtext.
  const heroSubtext = stats
    ? `${stats.destinations} ${t("hero.cta.subtext.suffix")}`
    : t("hero.cta.subtext.fallback");

  const whyCards = [
    { icon: IconScroll, title: t("why.c1.title"), body: t("why.c1.body") },
    { icon: IconCompass, title: t("why.c2.title"), body: t("why.c2.body") },
    { icon: IconLeaf, title: t("why.c3.title"), body: t("why.c3.body") },
  ];

  return (
    <div className="ca-motion">
      <SiteNav />

      {/* 1. Hero — real Indonesian culture photograph with kinetic headline */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/destinations/wae-rebo.jpg"
            alt="Wae Rebo, a traditional village in the highlands of Flores, Indonesia"
            className="h-full w-full object-cover"
          />
          {/* Navy gradient scrim so the headline stays legible over the photo. */}
          <div className="absolute inset-0 bg-gradient-to-t from-ca-ink via-ca-ink/70 to-ca-ink/40" />
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pb-20 pt-20 text-center md:pb-28 md:pt-28">
          <span className="ca-eyebrow text-ca-paper/80">{t("hero.eyebrow")}</span>
          <KineticHeadline
            text={t("hero.headline")}
            className="mt-4 max-w-4xl font-display text-5xl font-bold leading-[0.98] tracking-tight text-ca-paper-bright md:text-7xl"
          />
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ca-paper/85">
            {t("hero.subcopy")}
          </p>
          <div className="mt-10">
            <CompassMedallionButton label={t("hero.cta")} subtext={heroSubtext} />
          </div>
        </div>
        <a
          href={HERO_CREDIT.url}
          target="_blank"
          rel="noreferrer noopener"
          className="absolute bottom-0 right-0 z-10 bg-ca-ink/70 px-2 py-1 text-[10px] text-ca-paper/80 hover:bg-ca-ink"
        >
          {t("hero.photoCredit")}: {HERO_CREDIT.name} ({HERO_CREDIT.license})
        </a>
      </section>

      {/* 1b. Illustrated archipelago map — kept on light ground below the hero */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <IndonesiaMap pins={pins} interactive className="w-full text-ca-ink" />
        </div>
      </section>

      {/* 2. Why Culture Atlas — horizontal scroll strip of field notes */}
      <section className="ca-rule px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-3xl font-bold md:text-4xl">{t("why.title")}</h2>
          <div className="mt-8 flex gap-5 overflow-x-auto pb-4">
            {whyCards.map((item) => (
              <div
                key={item.title}
                className="w-72 shrink-0 border border-ca-ink/20 bg-ca-paper-bright p-6"
              >
                <item.icon className="h-7 w-7 text-ca-gold" />
                <h3 className="mt-4 font-display text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-ca-ink-soft">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured hidden destinations — asymmetric bento grid */}
      <section className="ca-rule px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <span className="ca-eyebrow">{t("featured.eyebrow")}</span>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-bold md:text-4xl">{t("featured.title")}</h2>
            <UnderlineLink to="/explore">{t("nav.cta")}</UnderlineLink>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <DestinationCard key={destination.slug} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. The Atlas System — filters explained, split text + illustration */}
      <section className="ca-rule px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <span className="ca-eyebrow">{t("system.eyebrow")}</span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">{t("system.title")}</h2>
            <p className="mt-4 max-w-md text-ca-ink-soft">{t("system.body")}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {CATEGORIES.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="flex flex-col items-start gap-2.5 border border-ca-ink/20 bg-ca-paper-bright p-4"
              >
                <Icon className="h-6 w-6 text-ca-gold" />
                <span className="text-sm font-semibold">{t(`cat.${key}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Cultural Stories teaser — full-width editorial pull-quote */}
      {story && (
        <section className="ca-rule bg-ca-ink px-6 py-16 text-ca-paper">
          <div className="mx-auto max-w-4xl">
            <span className="text-sm font-semibold text-ca-gold-soft">{t("home.stories.label")}</span>
            <blockquote className="mt-4 font-display text-2xl font-medium leading-snug md:text-3xl">
              &ldquo;{story.excerpt}&rdquo;
            </blockquote>
            <div className="mt-6 flex items-center justify-between gap-4">
              <p className="text-sm text-ca-paper/70">
                {story.title} · {t("common.by")} {story.author_name}, {story.author_role}
              </p>
              <StoryArrowButton slug={story.slug} label={`${t("common.read")} ${story.title}`} />
            </div>
          </div>
        </section>
      )}

      {/* 6. Local Experience + Marketplace — 2-column split */}
      <section className="ca-rule px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          {experience && (
            <div className="border border-ca-ink/20 bg-ca-paper-bright p-6">
              <span className="text-sm font-semibold text-ca-gold">{t("home.experience.label")}</span>
              <h3 className="mt-2 font-display text-2xl font-bold">{experience.title}</h3>
              <p className="mt-3 text-sm text-ca-ink-soft">{experience.description}</p>
              <UnderlineLink to="/experiences">{t("btn.browseExperiences")}</UnderlineLink>
            </div>
          )}
          {product && (
            <div className="border border-ca-ink/20 bg-ca-paper-bright p-6">
              <span className="text-sm font-semibold text-ca-gold">{t("home.marketplace.label")}</span>
              <h3 className="mt-2 font-display text-2xl font-bold">{product.name}</h3>
              <p className="mt-3 text-sm text-ca-ink-soft">{product.description}</p>
              <UnderlineLink to="/marketplace">{t("btn.browseMarketplace")}</UnderlineLink>
            </div>
          )}
        </div>
      </section>

      {/* 7. Youth Cultural Ambassador — full-width CTA band */}
      <section className="ca-rule px-6 py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="text-sm font-semibold text-ca-gold">{t("home.ambassador.label")}</span>
            <h2 className="mt-3 max-w-lg font-display text-3xl font-bold md:text-4xl">
              {t("home.ambassador.title")}
            </h2>
          </div>
          <FieldPlate
            icon={<IconScroll className="h-6 w-6" />}
            label={t("home.ambassador.plate")}
            aspect="aspect-square"
            className="w-40 shrink-0"
          />
          <UnderlineLink to="/ambassador">{t("home.ambassador.cta")}</UnderlineLink>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
