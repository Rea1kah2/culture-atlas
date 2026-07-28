import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { SiteNav } from "../components/site/nav";
import { SiteFooter } from "../components/site/footer";
import { VisaStampButton } from "../components/site/cta/visa-stamp-button";
import { useT } from "../lib/i18n/context";
import { registerUser } from "../lib/api/auth.functions";

const searchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/register")({
  validateSearch: searchSchema,
  component: Register,
  head: () => ({
    meta: [{ title: "Daftar Akun · Culture Atlas" }],
  }),
});

function safeRedirectTarget(raw: string | undefined): string {
  if (raw && raw.startsWith("/") && !raw.startsWith("//")) return raw;
  return "/";
}

const formSchema = z.object({
  fullName: z.string().min(2, "Nama lengkap wajib diisi"),
  email: z.string().email("Masukkan email yang valid"),
  password: z.string().min(8, "Kata sandi minimal 8 karakter"),
});

type FormValues = z.infer<typeof formSchema>;

function Register() {
  const t = useT();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  async function onSubmit(values: FormValues) {
    setStatus("submitting");
    setErrorMessage(null);
    try {
      const result = await registerUser({ data: values });
      if (result.ok) {
        await router.invalidate();
        await navigate({ to: safeRedirectTarget(search.redirect) });
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
      <section className="px-6 py-16">
        <div className="mx-auto max-w-md">
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
            <Field label={t("auth.password")} error={errors.password?.message}>
              <input {...register("password")} type="password" className="ca-input" />
            </Field>

            {status === "error" && errorMessage && (
              <p className="border border-ca-error/40 bg-ca-paper-bright px-4 py-3 text-sm text-ca-error">
                {errorMessage}
              </p>
            )}

            <VisaStampButton type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? t("auth.register.submitting") : t("auth.register.submit")}
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
