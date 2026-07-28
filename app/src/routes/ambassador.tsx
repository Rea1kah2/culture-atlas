import { createFileRoute, Link, useRouteContext } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { SiteNav } from "../components/site/nav";
import { SiteFooter } from "../components/site/footer";
import { VisaStampButton } from "../components/site/cta/visa-stamp-button";
import { IconStamp } from "../components/site/icons";
import { useT } from "../lib/i18n/context";
import { submitAmbassadorApplication } from "../lib/api/ambassador.functions";

export const Route = createFileRoute("/ambassador")({
  component: Ambassador,
  head: () => ({
    meta: [
      { title: "Youth Cultural Ambassador · Culture Atlas" },
      {
        name: "description",
        content: "Apply to become a Youth Cultural Ambassador: document your village's culture and collaborate with local communities.",
      },
    ],
  }),
});

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  region: z.string().min(2, "Region or village is required"),
  age: z.string().optional(),
  motivation: z.string().min(30, "Tell us more, at least 30 characters"),
  portfolioUrl: z.string().url("Enter a valid link").optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

function Ambassador() {
  const t = useT();
  const { user } = useRouteContext({ from: "__root__" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  async function onSubmit(values: FormValues) {
    setStatus("submitting");
    setErrorMessage(null);
    try {
      const result = await submitAmbassadorApplication({
        data: {
          fullName: values.fullName,
          email: values.email,
          region: values.region,
          age: values.age ? Number(values.age) : undefined,
          motivation: values.motivation,
          portfolioUrl: values.portfolioUrl || "",
        },
      });
      if (result.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
        setErrorMessage(result.error);
      }
    } catch {
      setStatus("error");
      setErrorMessage(t("ambassador.form.genericError"));
    }
  }

  return (
    <div className="ca-motion">
      <SiteNav />

      <section className="px-6 pt-12 pb-8">
        <div className="mx-auto max-w-3xl">
          <span className="ca-eyebrow">{t("ambassador.eyebrow")}</span>
          <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            {t("ambassador.title")}
          </h1>
          <p className="mt-4 max-w-xl text-ca-ink-soft">{t("ambassador.intro")}</p>
        </div>
      </section>

      <section className="ca-rule px-6 py-12">
        <div className="mx-auto max-w-3xl">
          {!user ? (
            <div className="flex items-start gap-4 border border-ca-ink/20 bg-ca-paper-bright p-6">
              <IconStamp className="h-8 w-8 shrink-0 text-ca-gold" />
              <div>
                <h2 className="font-display text-xl font-bold">{t("auth.gate.title")}</h2>
                <p className="mt-2 text-ca-ink-soft">{t("auth.gate.body")}</p>
                <Link
                  to="/login"
                  search={{ redirect: "/ambassador" }}
                  className="mt-4 inline-block border border-ca-ink bg-ca-ink px-6 py-3 font-semibold text-ca-paper transition-opacity hover:opacity-90"
                >
                  {t("auth.gate.cta")}
                </Link>
              </div>
            </div>
          ) : status === "success" ? (
            <div className="flex items-start gap-4 border border-ca-ink/20 bg-ca-paper-bright p-6">
              <IconStamp className="h-8 w-8 shrink-0 text-ca-gold" />
              <div>
                <h2 className="font-display text-xl font-bold">{t("ambassador.success.title")}</h2>
                <p className="mt-2 text-ca-ink-soft">{t("ambassador.success.body")}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
              <Field label={t("ambassador.form.fullName")} error={errors.fullName?.message}>
                <input
                  {...register("fullName")}
                  type="text"
                  className="ca-input"
                  placeholder={t("ambassador.form.fullName.ph")}
                />
              </Field>
              <Field label={t("ambassador.form.email")} error={errors.email?.message}>
                <input
                  {...register("email")}
                  type="email"
                  className="ca-input"
                  placeholder="nama@email.com"
                />
              </Field>
              <Field label={t("ambassador.form.region")} error={errors.region?.message}>
                <input
                  {...register("region")}
                  type="text"
                  className="ca-input"
                  placeholder={t("ambassador.form.region.ph")}
                />
              </Field>
              <Field label={t("ambassador.form.age")} error={errors.age?.message}>
                <input
                  {...register("age")}
                  type="number"
                  min={15}
                  max={30}
                  className="ca-input"
                  placeholder="18"
                />
              </Field>
              <Field label={t("ambassador.form.motivation")} error={errors.motivation?.message}>
                <textarea
                  {...register("motivation")}
                  rows={5}
                  className="ca-input resize-none"
                  placeholder={t("ambassador.form.motivation.ph")}
                />
              </Field>
              <Field label={t("ambassador.form.portfolio")} error={errors.portfolioUrl?.message}>
                <input
                  {...register("portfolioUrl")}
                  type="url"
                  className="ca-input"
                  placeholder="https://"
                />
              </Field>

              {status === "error" && errorMessage && (
                <p className="border border-ca-error/40 bg-ca-paper-bright px-4 py-3 text-sm text-ca-error">
                  {errorMessage}
                </p>
              )}

              <VisaStampButton type="submit" disabled={status === "submitting"}>
                {status === "submitting"
                  ? t("ambassador.form.submitting")
                  : t("ambassador.form.submit")}
              </VisaStampButton>
            </form>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ca-ink">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-sm text-ca-error">{error}</span>}
    </label>
  );
}
