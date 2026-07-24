import { createFileRoute } from "@tanstack/react-router";

import { SiteNav } from "../../components/site/nav";
import { SiteFooter } from "../../components/site/footer";
import { FieldPlate } from "../../components/site/field-plate";
import { IconScroll } from "../../components/site/icons";
import { StoryArrowButton } from "../../components/site/cta/story-arrow-button";
import { useT } from "../../lib/i18n/context";
import { listStories } from "../../lib/api/stories.functions";

export const Route = createFileRoute("/stories/")({
  loader: async () => listStories(),
  component: Stories,
  head: () => ({
    meta: [
      { title: "Cultural Stories · Culture Atlas" },
      {
        name: "description",
        content: "Articles and short films by Youth Cultural Ambassadors, told from inside Indonesia's hidden villages.",
      },
    ],
  }),
});

function Stories() {
  const { stories } = Route.useLoaderData();
  const t = useT();

  return (
    <div className="ca-motion">
      <SiteNav />
      <section className="px-6 pt-12 pb-8">
        <div className="mx-auto max-w-7xl">
          <span className="ca-eyebrow">{t("stories.eyebrow")}</span>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold md:text-5xl">
            {t("stories.title")}
          </h1>
        </div>
      </section>

      <section className="ca-rule px-6 py-12">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <article key={story.slug} className="flex flex-col border border-ca-ink/20 bg-ca-paper-bright">
              <FieldPlate
                icon={<IconScroll className="h-6 w-6" />}
                label={story.content_type === "video" ? t("stories.type.video") : t("stories.type.article")}
                className="rounded-none border-x-0 border-t-0"
              />
              <div className="flex flex-1 flex-col gap-2.5 p-5">
                <span className="ca-eyebrow">{story.destination_name}</span>
                <h2 className="font-display text-lg font-bold leading-tight">{story.title}</h2>
                <p className="text-sm text-ca-ink-soft">{story.excerpt}</p>
                <p className="mt-auto pt-2 text-xs text-ca-ink-soft">
                  {t("common.by")} {story.author_name}, {story.author_role}
                </p>
                <div className="pt-2">
                  <StoryArrowButton slug={story.slug} label={`${t("common.read")} ${story.title}`} />
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
