import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { SiteNav } from "../components/site/nav";
import { SiteFooter } from "../components/site/footer";
import { AuthBrandPanel } from "../components/site/auth-brand-panel";
import { Field } from "../components/site/field";
import { PasswordField } from "../components/site/password-field";
import { Modal } from "../components/site/modal";
import { IconCheckCircle } from "../components/site/icons";
import { VisaStampButton } from "../components/site/cta/visa-stamp-button";
import { useT } from "../lib/i18n/context";
import { loginUser } from "../lib/api/auth.functions";
import { getSiteStats } from "../lib/api/destinations.functions";

const searchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/login")({
  validateSearch: searchSchema,
  loader: async () => getSiteStats(),
  component: Login,
  head: () => ({
    meta: [{ title: "Login · Culture Atlas" }],
  }),
});

// Only ever redirect to a path within this app -- never trust an absolute
// URL from a query param (open-redirect guard).
function safeRedirectTarget(raw: string | undefined): string {
  if (raw && raw.startsWith("/") && !raw.startsWith("//")) return raw;
  return "/";
}

const formSchema = z.object({
  email: z.string().email("Masukkan email yang valid"),
  password: z.string().min(1, "Kata sandi wajib diisi"),
});

type FormValues = z.infer<typeof formSchema>;

function Login() {
  const t = useT();
  const { stats } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // Set on success. Navigation is deliberately deferred until the user
  // acknowledges the welcome dialog, which keeps the "must be dismissed
  // first" requirement entirely local instead of passing a flag to whatever
  // page we land on next.
  const [welcomeName, setWelcomeName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  async function onSubmit(values: FormValues) {
    setStatus("submitting");
    setErrorMessage(null);
    try {
      const result = await loginUser({ data: values });
      if (result.ok) {
        setWelcomeName(result.fullName);
      } else {
        setStatus("error");
        setErrorMessage(result.error);
      }
    } catch {
      setStatus("error");
      setErrorMessage(t("auth.error.generic"));
    }
  }

  async function continueAfterWelcome() {
    setWelcomeName(null);
    await router.invalidate();
    await navigate({ to: safeRedirectTarget(search.redirect) });
  }

  return (
    <div className="ca-motion">
      <SiteNav />
      <section className="px-6 py-16">
        {/* Panel first in DOM order = panel on the LEFT, form on the right. */}
        <div className="mx-auto grid max-w-5xl items-center gap-16 lg:grid-cols-2">
          <AuthBrandPanel stats={stats} />
          <div className="mx-auto w-full max-w-md lg:mx-0">
            <span className="ca-eyebrow">{t("auth.login.eyebrow")}</span>
            <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              {t("auth.login.title")}
            </h1>
            <p className="mt-3 text-ca-ink-soft">{t("auth.login.subtitle")}</p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-6">
              <Field label={t("auth.email")} error={errors.email?.message}>
                <input
                  {...register("email")}
                  type="email"
                  className="ca-input"
                  placeholder="nama@email.com"
                />
              </Field>
              <Field label={t("auth.password")} error={errors.password?.message}>
                <PasswordField {...register("password")} />
              </Field>

              {status === "error" && errorMessage && (
                <p className="border border-ca-error/40 bg-ca-paper-bright px-4 py-3 text-sm text-ca-error">
                  {errorMessage}
                </p>
              )}

              <VisaStampButton type="submit" disabled={status === "submitting"}>
                {status === "submitting" ? t("auth.login.submitting") : t("auth.login.submit")}
              </VisaStampButton>
            </form>

            <p className="mt-6 text-sm text-ca-ink-soft">
              {t("auth.login.noAccount")}{" "}
              <Link
                to="/register"
                search={{ redirect: search.redirect }}
                className="font-semibold text-ca-ink underline"
              >
                {t("auth.login.registerLink")}
              </Link>
            </p>
          </div>
        </div>
      </section>
      <SiteFooter />

      <Modal
        open={welcomeName !== null}
        onOpenChange={(open) => {
          if (!open) void continueAfterWelcome();
        }}
        dismissible={false}
        title={`${t("auth.welcome.login.title")}, ${welcomeName ?? ""}`}
        description={t("auth.welcome.login.body")}
      >
        <div className="mt-6 flex items-center gap-3">
          <IconCheckCircle className="h-6 w-6 shrink-0 text-ca-success" />
          <button
            type="button"
            onClick={() => void continueAfterWelcome()}
            className="ml-auto border border-ca-ink bg-ca-ink px-6 py-3 font-semibold text-ca-paper transition-opacity hover:opacity-90"
          >
            {t("auth.welcome.cta")}
          </button>
        </div>
      </Modal>
    </div>
  );
}
