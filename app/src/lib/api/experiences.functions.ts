import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { bindings } from "../bindings.server";

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
