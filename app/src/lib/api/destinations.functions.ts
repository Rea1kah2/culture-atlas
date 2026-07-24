import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { bindings } from "../bindings.server";

export type Destination = {
  slug: string;
  name: string;
  province: string;
  category: string;
  tagline: string;
  history: string;
  cultural_value: string;
  activities: string;
  how_to_get_there: string;
  lat: number;
  lng: number;
  sustainability_score: number;
  sustainability_note: string;
  hero_image_url: string | null;
  photo_credit_name: string | null;
  photo_credit_license: string | null;
  photo_credit_url: string | null;
};

export const listDestinations = createServerFn({ method: "GET" })
  .inputValidator(
    z.object({
      province: z.string().optional(),
      category: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { DB } = bindings();
    if (!DB) return { destinations: [] as Destination[], provinces: [] as string[] };

    const clauses: string[] = [];
    const params: string[] = [];
    if (data.province) {
      clauses.push("province = ?");
      params.push(data.province);
    }
    if (data.category) {
      clauses.push("category = ?");
      params.push(data.category);
    }
    const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";

    const result = await DB.prepare(
      `SELECT slug, name, province, category, tagline, history, cultural_value, activities,
              how_to_get_there, lat, lng, sustainability_score, sustainability_note, hero_image_url,
              photo_credit_name, photo_credit_license, photo_credit_url
       FROM destinations ${where} ORDER BY name ASC`,
    )
      .bind(...params)
      .all<Destination>();

    const provincesResult = await DB.prepare(
      "SELECT DISTINCT province FROM destinations ORDER BY province ASC",
    ).all<{ province: string }>();

    return {
      destinations: result.results ?? [],
      provinces: (provincesResult.results ?? []).map((r) => r.province),
    };
  });

export const getDestination = createServerFn({ method: "GET" })
  .inputValidator(z.object({ slug: z.string().min(1) }))
  .handler(async ({ data }) => {
    const { DB } = bindings();
    if (!DB) return { destination: null as Destination | null };

    const destination = await DB.prepare(
      `SELECT slug, name, province, category, tagline, history, cultural_value, activities,
              how_to_get_there, lat, lng, sustainability_score, sustainability_note, hero_image_url,
              photo_credit_name, photo_credit_license, photo_credit_url
       FROM destinations WHERE slug = ?`,
    )
      .bind(data.slug)
      .first<Destination>();

    return { destination: destination ?? null };
  });

export const listFeaturedDestinations = createServerFn({ method: "GET" }).handler(async () => {
  const { DB } = bindings();
  if (!DB) return { destinations: [] as Destination[] };

  const result = await DB.prepare(
    `SELECT slug, name, province, category, tagline, history, cultural_value, activities,
            how_to_get_there, lat, lng, sustainability_score, sustainability_note, hero_image_url,
              photo_credit_name, photo_credit_license, photo_credit_url
     FROM destinations ORDER BY sustainability_score DESC LIMIT 6`,
  ).all<Destination>();

  return { destinations: result.results ?? [] };
});

export const listMapPins = createServerFn({ method: "GET" }).handler(async () => {
  const { DB } = bindings();
  if (!DB) return { pins: [] as Pick<Destination, "slug" | "name" | "province" | "category" | "lat" | "lng">[] };

  const result = await DB.prepare(
    "SELECT slug, name, province, category, lat, lng FROM destinations ORDER BY name ASC",
  ).all<Pick<Destination, "slug" | "name" | "province" | "category" | "lat" | "lng">>();

  return { pins: result.results ?? [] };
});
