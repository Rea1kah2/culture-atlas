import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { bindings } from "../bindings.server";

export type CulturalStory = {
  slug: string;
  destination_slug: string;
  destination_name?: string;
  title: string;
  excerpt: string;
  body: string;
  content_type: string;
  author_name: string;
  author_role: string;
  cover_image_url: string | null;
};

export const listStories = createServerFn({ method: "GET" }).handler(async () => {
  const { DB } = bindings();
  if (!DB) return { stories: [] as CulturalStory[] };

  const result = await DB.prepare(
    `SELECT s.slug, s.destination_slug, d.name AS destination_name, s.title, s.excerpt, s.body,
            s.content_type, s.author_name, s.author_role, s.cover_image_url
     FROM cultural_stories s
     JOIN destinations d ON d.slug = s.destination_slug
     ORDER BY s.created_at DESC`,
  ).all<CulturalStory>();

  return { stories: result.results ?? [] };
});

export const getStory = createServerFn({ method: "GET" })
  .inputValidator(z.object({ slug: z.string().min(1) }))
  .handler(async ({ data }) => {
    const { DB } = bindings();
    if (!DB) return { story: null as CulturalStory | null };

    const story = await DB.prepare(
      `SELECT s.slug, s.destination_slug, d.name AS destination_name, s.title, s.excerpt, s.body,
              s.content_type, s.author_name, s.author_role, s.cover_image_url
       FROM cultural_stories s
       JOIN destinations d ON d.slug = s.destination_slug
       WHERE s.slug = ?`,
    )
      .bind(data.slug)
      .first<CulturalStory>();

    return { story: story ?? null };
  });

export const listStoriesForDestination = createServerFn({ method: "GET" })
  .inputValidator(z.object({ destinationSlug: z.string().min(1) }))
  .handler(async ({ data }) => {
    const { DB } = bindings();
    if (!DB) return { stories: [] as CulturalStory[] };

    const result = await DB.prepare(
      `SELECT slug, destination_slug, title, excerpt, body, content_type, author_name, author_role, cover_image_url
       FROM cultural_stories WHERE destination_slug = ? ORDER BY created_at DESC`,
    )
      .bind(data.destinationSlug)
      .all<CulturalStory>();

    return { stories: result.results ?? [] };
  });
