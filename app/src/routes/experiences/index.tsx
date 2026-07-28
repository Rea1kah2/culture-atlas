import { createFileRoute } from "@tanstack/react-router";

import { SiteNav } from "../../components/site/nav";
import { SiteFooter } from "../../components/site/footer";
import { FieldPlate } from "../../components/site/field-plate";
import { IconCompass } from "../../components/site/icons";
import { TicketButton } from "../../components/site/cta/ticket-button";
import { UnderlineLink } from "../../components/site/cta/underline-link";
import { formatIDR } from "../../lib/format";
import { useT } from "../../lib/i18n/context";
import { listExperiences } from "../../lib/api/experiences.functions";

export const Route = createFileRoute("/experiences/")({
  loader: async () => listExperiences(),
  component: Experiences,
  head: () => ({
    meta: [
      { title: "Local Experience · Culture Atlas" },
      {
        name: "description",
        content: "Workshops and traditions you can join with the communities who keep them alive: weaving, coffee, cooking, and festival participation.",
      },
    ],
  }),
});

function Experiences() {
  const { experiences } = Route.useLoaderData();
  const t = useT();

  return (
    <div className="ca-motion">
      <SiteNav />
      <section className="px-6 pt-12 pb-8">
        <div className="mx-auto max-w-7xl">
          <span className="ca-eyebrow">{t("experiences.eyebrow")}</span>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold md:text-5xl">
            {t("experiences.title")}
          </h1>
        </div>
      </section>

      <section className="ca-rule px-6 py-12">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((exp) => (
            <article key={exp.slug} className="flex flex-col border border-ca-ink/20 bg-ca-paper-bright">
              <FieldPlate
                icon={<IconCompass className="h-6 w-6" />}
                label={exp.title}
                className="rounded-none border-x-0 border-t-0"
              />
              <div className="flex flex-1 flex-col gap-2.5 p-5">
                <span className="ca-eyebrow">
                  {exp.destination_name} · {exp.destination_province}
                </span>
                <h2 className="font-display text-lg font-bold leading-tight">{exp.title}</h2>
                <p className="text-sm text-ca-ink-soft">{exp.description}</p>
                <p className="mt-2 text-sm font-semibold">
                  {formatIDR(exp.price_idr)} · {exp.duration} · {exp.group_size}
                </p>
                <div className="mt-auto flex flex-wrap items-center gap-4 pt-3">
                  <TicketButton slug={exp.slug}>{t("btn.reserveExperience")}</TicketButton>
                  <UnderlineLink to="/destinations/$slug" slug={exp.destination_slug}>
                    {t("btn.viewDestination")}
                  </UnderlineLink>
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
