import { createFileRoute, notFound } from "@tanstack/react-router";

import { SiteNav } from "../../components/site/nav";
import { SiteFooter } from "../../components/site/footer";
import { FieldPlate } from "../../components/site/field-plate";
import { IconScroll } from "../../components/site/icons";
import { UnderlineLink } from "../../components/site/cta/underline-link";
import { useT } from "../../lib/i18n/context";
import { getStory } from "../../lib/api/stories.functions";

export const Route = createFileRoute("/stories/$slug")({
  loader: async ({ params }) => {
    const { story } = await getStory({ data: { slug: params.slug } });
    if (!story) throw notFound();
    return { story };
  },
  component: StoryDetail,
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.story.title} · Culture Atlas` },
          { name: "description", content: loaderData.story.excerpt },
        ]
      : [],
  }),
});

function StoryDetail() {
  const { story } = Route.useLoaderData();
  const t = useT();

  return (
    <div className="ca-motion">
      <SiteNav />
      <article className="px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <span className="ca-eyebrow">{story.destination_name}</span>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">
            {story.title}
          </h1>
          <p className="mt-4 text-sm text-ca-ink-soft">
            {t("common.by")} {story.author_name}, {story.author_role}
          </p>

          <FieldPlate
            icon={<IconScroll className="h-8 w-8" />}
            label={story.content_type === "video" ? t("stories.type.video") : t("stories.type.article")}
            aspect="aspect-[16/9]"
            className="mt-8"
          />

          <p className="mt-8 whitespace-pre-line text-lg leading-relaxed text-ca-ink-soft">
            {story.body}
          </p>

          <div className="ca-rule mt-10 pt-6">
            <UnderlineLink to="/destinations/$slug" slug={story.destination_slug}>
              {`${t("common.view")} ${story.destination_name}`}
            </UnderlineLink>
          </div>
        </div>
      </article>
      <SiteFooter />
    </div>
  );
}
