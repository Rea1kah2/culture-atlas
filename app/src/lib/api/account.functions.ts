import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { bindings } from "../bindings.server";
import { getSessionUser } from "./auth.functions";

export type AccountProfile = {
  fullName: string;
  email: string;
  createdAt: string;
};

export type AccountOrder = {
  id: number;
  productSlug: string;
  productName: string | null;
  quantity: number;
  status: string;
  createdAt: string;
};

export type AccountReservation = {
  id: number;
  experienceSlug: string;
  experienceTitle: string | null;
  preferredDate: string;
  participants: number;
  status: string;
  createdAt: string;
};

export type AccountOverview = {
  profile: AccountProfile;
  orders: AccountOrder[];
  reservations: AccountReservation[];
};

// Everything the account page needs in a single round trip. Re-checks the
// session itself rather than trusting the route's beforeLoad guard: that
// guard is a UX convenience, and this function is reachable directly over
// RPC regardless of what the client did.
export const getAccountOverview = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ overview: AccountOverview | null }> => {
    const user = await getSessionUser();
    if (!user) return { overview: null };

    const { DB } = bindings();
    if (!DB) return { overview: null };

    const profile = await DB.prepare(
      `SELECT full_name AS fullName, email, created_at AS createdAt FROM users WHERE id = ?`,
    )
      .bind(user.id)
      .first<AccountProfile>();

    if (!profile) return { overview: null };

    const orders = await DB.prepare(
      `SELECT o.id, o.product_slug AS productSlug, p.name AS productName,
              o.quantity, o.status, o.created_at AS createdAt
       FROM orders o
       LEFT JOIN marketplace_products p ON p.slug = o.product_slug
       WHERE o.user_id = ?
       ORDER BY o.created_at DESC`,
    )
      .bind(user.id)
      .all<AccountOrder>();

    const reservations = await DB.prepare(
      `SELECT r.id, r.experience_slug AS experienceSlug, e.title AS experienceTitle,
              r.preferred_date AS preferredDate, r.participants, r.status,
              r.created_at AS createdAt
       FROM reservations r
       LEFT JOIN local_experiences e ON e.slug = r.experience_slug
       WHERE r.user_id = ?
       ORDER BY r.created_at DESC`,
    )
      .bind(user.id)
      .all<AccountReservation>();

    return {
      overview: {
        profile,
        orders: orders.results ?? [],
        reservations: reservations.results ?? [],
      },
    };
  },
);

const updateProfileSchema = z.object({
  fullName: z.string().min(2, "Nama lengkap wajib diisi"),
});

export const updateProfile = createServerFn({ method: "POST" })
  .inputValidator(updateProfileSchema)
  .handler(async ({ data }) => {
    const user = await getSessionUser();
    if (!user) {
      return { ok: false as const, error: "Silakan login terlebih dahulu." };
    }

    const { DB } = bindings();
    if (!DB) {
      return { ok: false as const, error: "Database tidak aktif di lingkungan ini." };
    }

    await DB.prepare(`UPDATE users SET full_name = ? WHERE id = ?`)
      .bind(data.fullName, user.id)
      .run();

    return { ok: true as const };
  });
