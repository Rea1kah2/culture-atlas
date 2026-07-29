import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { SiteNav } from "../components/site/nav";
import { SiteFooter } from "../components/site/footer";
import { Field } from "../components/site/field";
import { IconUser } from "../components/site/icons";
import { VisaStampButton } from "../components/site/cta/visa-stamp-button";
import { useT } from "../lib/i18n/context";
import {
  getAccountOverview,
  updateProfile,
  type AccountOrder,
  type AccountReservation,
} from "../lib/api/account.functions";

export const Route = createFileRoute("/account")({
  // First real route-level guard in this app. The root beforeLoad has
  // already put `user` in context by the time this runs, so an unauthenticated
  // visitor never renders the page at all -- they land on /login with a
  // redirect back here. The loader's server function re-checks the session
  // independently; this guard is for UX, not for security.
  beforeLoad: ({ context, location }) => {
    if (!context.user) {
      throw redirect({ to: "/login", search: { redirect: location.href } });
    }
  },
  loader: async () => getAccountOverview(),
  component: Account,
  head: () => ({
    meta: [{ title: "Akun · Culture Atlas" }],
  }),
});

const profileSchema = z.object({
  fullName: z.string().min(2, "Nama lengkap wajib diisi"),
});
type ProfileValues = z.infer<typeof profileSchema>;

function Account() {
  const t = useT();
  const { overview } = Route.useLoaderData();
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "saved" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { fullName: overview?.profile.fullName ?? "" },
  });

  async function onSubmit(values: ProfileValues) {
    setStatus("submitting");
    setErrorMessage(null);
    try {
      const result = await updateProfile({ data: values });
      if (result.ok) {
        setStatus("saved");
        // Refresh the root context so the nav (and this page's loader data)
        // pick up the new name immediately.
        await router.invalidate();
      } else {
        setStatus("error");
        setErrorMessage(result.error);
      }
    } catch {
      setStatus("error");
      setErrorMessage(t("auth.error.generic"));
    }
  }

  // The guard above means this is effectively unreachable, but the loader
  // returns null if the server-side session check disagrees -- render
  // something sane rather than crashing on a null deref.
  if (!overview) {
    return (
      <div className="ca-motion">
        <SiteNav />
        <section className="px-6 py-16">
          <p className="mx-auto max-w-3xl text-ca-ink-soft">{t("auth.gate.body")}</p>
        </section>
        <SiteFooter />
      </div>
    );
  }

  const { profile, orders, reservations } = overview;

  return (
    <div className="ca-motion">
      <SiteNav />

      <section className="px-6 pt-12 pb-8">
        <div className="mx-auto max-w-3xl">
          <span className="ca-eyebrow">{t("account.eyebrow")}</span>
          <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            {t("account.title")}
          </h1>
          <p className="mt-4 max-w-xl text-ca-ink-soft">{t("account.subtitle")}</p>
        </div>
      </section>

      <section className="ca-rule px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3">
            <IconUser className="h-6 w-6 text-ca-gold" />
            <h2 className="font-display text-2xl font-bold">{t("account.profile.title")}</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 max-w-md space-y-6">
            <Field label={t("auth.fullName")} error={errors.fullName?.message}>
              {/* defaultValue is set on the element as well as in useForm:
               * react-hook-form only applies its defaultValues imperatively
               * after mount, so without this the server-rendered input ships
               * empty and the name visibly pops in on hydration. */}
              <input
                {...register("fullName")}
                type="text"
                defaultValue={profile.fullName}
                className="ca-input"
              />
            </Field>

            <Field label={t("auth.email")}>
              <input value={profile.email} readOnly disabled className="ca-input opacity-70" />
              <span className="mt-1.5 block text-xs text-ca-ink-soft">
                {t("account.email.note")}
              </span>
            </Field>

            <p className="text-sm text-ca-ink-soft">
              {t("account.memberSince")}: {formatDate(profile.createdAt)}
            </p>

            {status === "error" && errorMessage && (
              <p className="border border-ca-error/40 bg-ca-paper-bright px-4 py-3 text-sm text-ca-error">
                {errorMessage}
              </p>
            )}
            {status === "saved" && (
              <p className="border border-ca-success/40 bg-ca-paper-bright px-4 py-3 text-sm text-ca-success">
                {t("account.profile.saved")}
              </p>
            )}

            <VisaStampButton type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? t("account.profile.saving") : t("account.profile.save")}
            </VisaStampButton>
          </form>
        </div>
      </section>

      <section className="ca-rule px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold">{t("account.orders.title")}</h2>
          {orders.length === 0 ? (
            <p className="mt-4 text-ca-ink-soft">{t("account.orders.empty")}</p>
          ) : (
            <ul className="mt-6 space-y-4">
              {orders.map((order) => (
                <OrderRow key={order.id} order={order} />
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="ca-rule px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold">{t("account.reservations.title")}</h2>
          {reservations.length === 0 ? (
            <p className="mt-4 text-ca-ink-soft">{t("account.reservations.empty")}</p>
          ) : (
            <ul className="mt-6 space-y-4">
              {reservations.map((reservation) => (
                <ReservationRow key={reservation.id} reservation={reservation} />
              ))}
            </ul>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function OrderRow({ order }: { order: AccountOrder }) {
  const t = useT();
  return (
    <li className="border border-ca-ink/20 bg-ca-paper-bright p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-display text-lg font-bold">{order.productName ?? order.productSlug}</p>
          <p className="mt-1 text-sm text-ca-ink-soft">
            {t("account.orders.qty")}: {order.quantity} · {formatDate(order.createdAt)}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>
    </li>
  );
}

function ReservationRow({ reservation }: { reservation: AccountReservation }) {
  const t = useT();
  return (
    <li className="border border-ca-ink/20 bg-ca-paper-bright p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-display text-lg font-bold">
            {reservation.experienceTitle ?? reservation.experienceSlug}
          </p>
          <p className="mt-1 text-sm text-ca-ink-soft">
            {t("account.reservations.date")}: {reservation.preferredDate} ·{" "}
            {t("account.reservations.people")}: {reservation.participants}
          </p>
        </div>
        <StatusBadge status={reservation.status} />
      </div>
    </li>
  );
}

function StatusBadge({ status }: { status: string }) {
  const t = useT();
  // Falls back to the raw value if the database ever holds a status the UI
  // doesn't know about yet, rather than rendering an empty badge.
  const known = ["pending", "contacted", "fulfilled", "confirmed", "completed"];
  const label = known.includes(status) ? t(`account.status.${status}`) : status;
  return (
    <span className="border border-ca-ink/30 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-ca-ink-soft">
      {label}
    </span>
  );
}

// D1 stores these as "YYYY-MM-DD HH:MM:SS" (SQLite datetime()). Render just
// the date part; parsing to a Date risks timezone drift for no benefit here.
function formatDate(value: string): string {
  return value.slice(0, 10);
}
