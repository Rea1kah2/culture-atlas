import { createFileRoute, notFound, Link, useRouteContext } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { SiteNav } from "../../components/site/nav";
import { SiteFooter } from "../../components/site/footer";
import { FieldPlate } from "../../components/site/field-plate";
import { IconCompass, IconStamp } from "../../components/site/icons";
import { UnderlineLink } from "../../components/site/cta/underline-link";
import { formatIDR } from "../../lib/format";
import { useT } from "../../lib/i18n/context";
import { getExperience, createReservation } from "../../lib/api/experiences.functions";

export const Route = createFileRoute("/experiences/$slug")({
  loader: async ({ params }) => {
    const { experience } = await getExperience({ data: { slug: params.slug } });
    if (!experience) throw notFound();
    return { experience };
  },
  component: ExperienceDetail,
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.experience.title} · Culture Atlas` },
          { name: "description", content: loaderData.experience.description },
        ]
      : [],
  }),
});

const reservationFormSchema = z.object({
  preferredDate: z.string().min(1, "Pilih tanggal yang diinginkan"),
  participants: z.string().min(1),
  contactNote: z.string().optional(),
});
type ReservationFormValues = z.infer<typeof reservationFormSchema>;

function ExperienceDetail() {
  const { experience } = Route.useLoaderData();
  const t = useT();
  const { user } = useRouteContext({ from: "__root__" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: { participants: "1" },
  });

  async function onSubmit(values: ReservationFormValues) {
    setStatus("submitting");
    setErrorMessage(null);
    try {
      const result = await createReservation({
        data: {
          experienceSlug: experience.slug,
          preferredDate: values.preferredDate,
          participants: Number(values.participants),
          contactNote: values.contactNote,
        },
      });
      if (result.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(result.error);
      }
    } catch {
      setStatus("error");
      setErrorMessage(t("auth.error.generic"));
    }
  }

  return (
    <div className="ca-motion">
      <SiteNav />
      <section className="px-6 py-12">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          <FieldPlate
            icon={<IconCompass className="h-8 w-8" />}
            label={experience.title}
            aspect="aspect-square"
          />
          <div>
            <span className="ca-eyebrow">
              {experience.destination_name} · {experience.destination_province}
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              {experience.title}
            </h1>
            <p className="mt-4 text-2xl font-display font-bold text-ca-gold">
              {formatIDR(experience.price_idr)}
            </p>
            <p className="mt-4 text-ca-ink-soft">{experience.description}</p>
            <dl className="mt-4 space-y-1 text-sm">
              <div className="flex gap-2">
                <dt className="font-semibold">{t("experience.detail.duration")}:</dt>
                <dd className="text-ca-ink-soft">{experience.duration}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold">{t("experience.detail.groupSize")}:</dt>
                <dd className="text-ca-ink-soft">{experience.group_size}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold">{t("experience.detail.howToJoin")}:</dt>
                <dd className="text-ca-ink-soft">{experience.how_to_join}</dd>
              </div>
            </dl>
            <div className="ca-rule mt-8 pt-6">
              <UnderlineLink to="/destinations/$slug" slug={experience.destination_slug}>
                {`${t("common.view")} ${experience.destination_name}`}
              </UnderlineLink>
            </div>

            <div className="ca-rule mt-8 pt-6">
              {!user ? (
                <div className="border border-ca-ink/20 bg-ca-paper-bright p-6">
                  <h2 className="font-display text-lg font-bold">{t("auth.gate.title")}</h2>
                  <p className="mt-2 text-sm text-ca-ink-soft">{t("auth.gate.body")}</p>
                  <Link
                    to="/login"
                    search={{ redirect: `/experiences/${experience.slug}` }}
                    className="mt-4 inline-block border border-ca-ink bg-ca-ink px-6 py-3 font-semibold text-ca-paper transition-opacity hover:opacity-90"
                  >
                    {t("auth.gate.cta")}
                  </Link>
                </div>
              ) : status === "success" ? (
                <div className="flex items-start gap-4 border border-ca-ink/20 bg-ca-paper-bright p-6">
                  <IconStamp className="h-8 w-8 shrink-0 text-ca-gold" />
                  <div>
                    <h2 className="font-display text-lg font-bold">
                      {t("reservation.success.title")}
                    </h2>
                    <p className="mt-2 text-sm text-ca-ink-soft">
                      {t("reservation.success.body")}
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  <h2 className="font-display text-lg font-bold">{t("reservation.title")}</h2>
                  <Field label={t("reservation.date")} error={errors.preferredDate?.message}>
                    <input {...register("preferredDate")} type="date" className="ca-input" />
                  </Field>
                  <Field
                    label={t("reservation.participants")}
                    error={errors.participants?.message}
                  >
                    <input
                      {...register("participants")}
                      type="number"
                      min={1}
                      max={30}
                      className="ca-input"
                    />
                  </Field>
                  <Field label={t("reservation.note")}>
                    <input {...register("contactNote")} type="text" className="ca-input" />
                  </Field>

                  {status === "error" && errorMessage && (
                    <p className="border border-ca-error/40 bg-ca-paper-bright px-4 py-3 text-sm text-ca-error">
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="border border-ca-ink bg-ca-ink px-6 py-3 font-semibold text-ca-paper transition-opacity hover:opacity-90 disabled:opacity-60"
                  >
                    {status === "submitting"
                      ? t("reservation.submitting")
                      : t("reservation.submit")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ca-ink">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-sm text-ca-error">{error}</span>}
    </label>
  );
}
