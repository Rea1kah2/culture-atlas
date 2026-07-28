import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { bindings } from "../bindings.server";
import { getSessionUser } from "./auth.functions";

export type LocalExperience = {
  slug: string;
  destination_slug: string;
  destination_name?: string;
  destination_province?: string;
  title: string;
  description: string;
  duration: string;
  group_size: string;
  price_idr: number;
  how_to_join: string;
};

export const listExperiences = createServerFn({ method: "GET" }).handler(async () => {
  const { DB } = bindings();
  if (!DB) return { experiences: [] as LocalExperience[] };

  const result = await DB.prepare(
    `SELECT e.slug, e.destination_slug, d.name AS destination_name, d.province AS destination_province,
            e.title, e.description, e.duration, e.group_size, e.price_idr, e.how_to_join
     FROM local_experiences e
     JOIN destinations d ON d.slug = e.destination_slug
     ORDER BY e.created_at ASC`,
  ).all<LocalExperience>();

  return { experiences: result.results ?? [] };
});

export const listExperiencesForDestination = createServerFn({ method: "GET" })
  .inputValidator(z.object({ destinationSlug: z.string().min(1) }))
  .handler(async ({ data }) => {
    const { DB } = bindings();
    if (!DB) return { experiences: [] as LocalExperience[] };

    const result = await DB.prepare(
      `SELECT slug, destination_slug, title, description, duration, group_size, price_idr, how_to_join
       FROM local_experiences WHERE destination_slug = ? ORDER BY created_at ASC`,
    )
      .bind(data.destinationSlug)
      .all<LocalExperience>();

    return { experiences: result.results ?? [] };
  });

export const getExperience = createServerFn({ method: "GET" })
  .inputValidator(z.object({ slug: z.string().min(1) }))
  .handler(async ({ data }) => {
    const { DB } = bindings();
    if (!DB) return { experience: null as LocalExperience | null };

    const experience = await DB.prepare(
      `SELECT e.slug, e.destination_slug, d.name AS destination_name, d.province AS destination_province,
              e.title, e.description, e.duration, e.group_size, e.price_idr, e.how_to_join
       FROM local_experiences e
       JOIN destinations d ON d.slug = e.destination_slug
       WHERE e.slug = ?`,
    )
      .bind(data.slug)
      .first<LocalExperience>();

    return { experience: experience ?? null };
  });

const reservationSchema = z.object({
  experienceSlug: z.string().min(1),
  preferredDate: z.string().min(1, "Pilih tanggal yang diinginkan"),
  participants: z.coerce.number().int().min(1).max(30),
  contactNote: z.string().optional(),
});

// Booking REQUEST, not a live calendar/slot system -- schedule confirmation
// happens off-platform (same spirit as `how_to_join`), consistent with the
// "form request, no real-time availability" scope decided for this feature.
export const createReservation = createServerFn({ method: "POST" })
  .inputValidator(reservationSchema)
  .handler(async ({ data }) => {
    const user = await getSessionUser();
    if (!user) {
      return { ok: false as const, error: "Silakan login terlebih dahulu." };
    }

    const { DB } = bindings();
    if (!DB) {
      return { ok: false as const, error: "Database tidak aktif di lingkungan ini." };
    }

    await DB.prepare(
      `INSERT INTO reservations (user_id, experience_slug, preferred_date, participants, contact_note)
       VALUES (?, ?, ?, ?, ?)`,
    )
      .bind(
        user.id,
        data.experienceSlug,
        data.preferredDate,
        data.participants,
        data.contactNote || null,
      )
      .run();

    return { ok: true as const };
  });
