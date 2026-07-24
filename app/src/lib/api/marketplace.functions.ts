import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { bindings } from "../bindings.server";

export type MarketplaceProduct = {
  slug: string;
  destination_slug: string;
  destination_name?: string;
  name: string;
  description: string;
  category: string;
  price_idr: number;
  maker_name: string;
  image_url: string | null;
};

export const listProducts = createServerFn({ method: "GET" })
  .inputValidator(z.object({ category: z.string().optional() }))
  .handler(async ({ data }) => {
    const { DB } = bindings();
    if (!DB) return { products: [] as MarketplaceProduct[] };

    const where = data.category ? "WHERE p.category = ?" : "";
    const result = await DB.prepare(
      `SELECT p.slug, p.destination_slug, d.name AS destination_name, p.name, p.description,
              p.category, p.price_idr, p.maker_name, p.image_url
       FROM marketplace_products p
       JOIN destinations d ON d.slug = p.destination_slug
       ${where}
       ORDER BY p.created_at ASC`,
    )
      .bind(...(data.category ? [data.category] : []))
      .all<MarketplaceProduct>();

    return { products: result.results ?? [] };
  });

export const getProduct = createServerFn({ method: "GET" })
  .inputValidator(z.object({ slug: z.string().min(1) }))
  .handler(async ({ data }) => {
    const { DB } = bindings();
    if (!DB) return { product: null as MarketplaceProduct | null };

    const product = await DB.prepare(
      `SELECT p.slug, p.destination_slug, d.name AS destination_name, p.name, p.description,
              p.category, p.price_idr, p.maker_name, p.image_url
       FROM marketplace_products p
       JOIN destinations d ON d.slug = p.destination_slug
       WHERE p.slug = ?`,
    )
      .bind(data.slug)
      .first<MarketplaceProduct>();

    return { product: product ?? null };
  });

export const listProductsForDestination = createServerFn({ method: "GET" })
  .inputValidator(z.object({ destinationSlug: z.string().min(1) }))
  .handler(async ({ data }) => {
    const { DB } = bindings();
    if (!DB) return { products: [] as MarketplaceProduct[] };

    const result = await DB.prepare(
      `SELECT slug, destination_slug, name, description, category, price_idr, maker_name, image_url
       FROM marketplace_products WHERE destination_slug = ? ORDER BY created_at ASC`,
    )
      .bind(data.destinationSlug)
      .all<MarketplaceProduct>();

    return { products: result.results ?? [] };
  });
