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
import { PasswordStrength } from "../components/site/password-strength";
import { Modal } from "../components/site/modal";
import { IconCheckCircle } from "../components/site/icons";
import { VisaStampButton } from "../components/site/cta/visa-stamp-button";
import { useT } from "../lib/i18n/context";
import { registerUser } from "../lib/api/auth.functions";
import { getSiteStats } from "../lib/api/destinations.functions";

const searchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/register")({
  validateSearch: searchSchema,
  loader: async () => getSiteStats(),
  component: Register,
  head: () => ({
    meta: [{ title: "Daftar Akun · Culture Atlas" }],
  }),
});

function safeRedirectTarget(raw: string | undefined): string {
  if (raw && raw.startsWith("/") && !raw.startsWith("//")) return raw;
  return "/";
}

const formSchema = z
  .object({
    fullName: z.string().min(2, "Nama lengkap wajib diisi"),
    email: z.string().email("Masukkan email yang valid"),
    password: z.string().min(8, "Kata sandi minimal 8 karakter"),
    confirmPassword: z.string().min(1, "Ulangi kata sandi"),
  })
  // Attach the mismatch error to the confirm field so it renders under the
  // input the user needs to fix.
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Kata sandi tidak sama",
  });

type FormValues = z.infer<typeof formSchema>;

function Register() {
  const t = useT();
  const { stats } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [welcomeName, setWelcomeName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  // Drives the live strength meter under the password field.
  const passwordValue = watch("password") ?? "";

  async function onSubmit(values: FormValues) {
    setStatus("submitting");
    setErrorMessage(null);
    try {
      const result = await registerUser({
        data: {
          fullName: values.fullName,
          email: values.email,
          password: values.password,
        },
      });
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
        {/* Form first in DOM order = form on the left, panel on the RIGHT
         * (mirrors login.tsx, where the panel comes first). */}
        <div className="mx-auto grid max-w-5xl items-center gap-16 lg:grid-cols-2">
          <div className="mx-auto w-full max-w-md lg:mx-0">
            <span className="ca-eyebrow">{t("auth.register.eyebrow")}</span>
            <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              {t("auth.register.title")}
            </h1>
            <p className="mt-3 text-ca-ink-soft">{t("auth.register.subtitle")}</p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-6">
              <Field label={t("auth.fullName")} error={errors.fullName?.message}>
                <input {...register("fullName")} type="text" className="ca-input" />
              </Field>
              <Field label={t("auth.email")} error={errors.email?.message}>
                <input
                  {...register("email")}
                  type="email"
                  className="ca-input"
                  placeholder="nama@email.com"
                />
              </Field>
              <div>
                <Field label={t("auth.password")} error={errors.password?.message}>
                  <PasswordField {...register("password")} />
                </Field>
                <PasswordStrength password={passwordValue} />
              </div>
              <Field label={t("auth.password.confirm")} error={errors.confirmPassword?.message}>
                <PasswordField {...register("confirmPassword")} />
              </Field>

              {status === "error" && errorMessage && (
                <p className="border border-ca-error/40 bg-ca-paper-bright px-4 py-3 text-sm text-ca-error">
                  {errorMessage}
                </p>
              )}

              <VisaStampButton type="submit" disabled={status === "submitting"}>
                {status === "submitting"
                  ? t("auth.register.submitting")
                  : t("auth.register.submit")}
              </VisaStampButton>
            </form>

            <p className="mt-6 text-sm text-ca-ink-soft">
              {t("auth.register.haveAccount")}{" "}
              <Link
                to="/login"
                search={{ redirect: search.redirect }}
                className="font-semibold text-ca-ink underline"
              >
                {t("auth.register.loginLink")}
              </Link>
            </p>
          </div>
          <AuthBrandPanel stats={stats} />
        </div>
      </section>
      <SiteFooter />

      <Modal
        open={welcomeName !== null}
        onOpenChange={(open) => {
          if (!open) void continueAfterWelcome();
        }}
        dismissible={false}
        title={`${t("auth.welcome.register.title")}, ${welcomeName ?? ""}`}
        description={t("auth.welcome.register.body")}
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
