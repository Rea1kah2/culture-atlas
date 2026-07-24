import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { bindings } from "../bindings.server";

const applicationSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  region: z.string().min(2, "Region or village is required"),
  age: z.coerce.number().int().min(15).max(30).optional(),
  motivation: z.string().min(30, "Tell us more, at least 30 characters"),
  portfolioUrl: z.string().url("Enter a valid link").optional().or(z.literal("")),
});

export const submitAmbassadorApplication = createServerFn({ method: "POST" })
  .inputValidator(applicationSchema)
  .handler(async ({ data }) => {
    const { DB } = bindings();
    if (!DB) {
      return { ok: false as const, error: "The database isn't active in this environment yet." };
    }

    await DB.prepare(
      `INSERT INTO ambassador_applications (full_name, email, region, age, motivation, portfolio_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )
      .bind(
        data.fullName,
        data.email,
        data.region,
        data.age ?? null,
        data.motivation,
        data.portfolioUrl || null,
      )
      .run();

    return { ok: true as const };
  });
