import { createServerFn, createServerOnlyFn } from "@tanstack/react-start";
import { getCookie, setCookie, deleteCookie } from "@tanstack/react-start/server";
import { z } from "zod";

import { bindings } from "../bindings.server";
import {
  hashPassword,
  verifyPassword,
  generateSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "../auth.server";

export type SessionUser = { id: number; email: string; fullName: string };

const COOKIE_OPTS = {
  httpOnly: true,
  secure: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_MAX_AGE_SECONDS,
};

async function createSessionCookie(userId: number, DB: NonNullable<ReturnType<typeof bindings>["DB"]>) {
  const token = generateSessionToken();
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000).toISOString();
  await DB.prepare(`INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)`)
    .bind(token, userId, expiresAt)
    .run();
  setCookie(SESSION_COOKIE_NAME, token, COOKIE_OPTS);
}

const registerSchema = z.object({
  fullName: z.string().min(2, "Nama lengkap wajib diisi"),
  email: z.string().email("Masukkan email yang valid"),
  password: z.string().min(8, "Kata sandi minimal 8 karakter"),
});

export const registerUser = createServerFn({ method: "POST" })
  .inputValidator(registerSchema)
  .handler(async ({ data }) => {
    const { DB } = bindings();
    if (!DB) {
      return { ok: false as const, error: "Database tidak aktif di lingkungan ini." };
    }

    const existing = await DB.prepare(`SELECT id FROM users WHERE email = ?`)
      .bind(data.email)
      .first();
    if (existing) {
      return { ok: false as const, error: "Email ini sudah terdaftar. Coba masuk (login)." };
    }

    const { hash, salt } = await hashPassword(data.password);
    const result = await DB.prepare(
      `INSERT INTO users (email, password_hash, password_salt, full_name) VALUES (?, ?, ?, ?)`,
    )
      .bind(data.email, hash, salt, data.fullName)
      .run();

    const userId = result.meta.last_row_id as number;
    await createSessionCookie(userId, DB);
    return { ok: true as const };
  });

const loginSchema = z.object({
  email: z.string().email("Masukkan email yang valid"),
  password: z.string().min(1, "Kata sandi wajib diisi"),
});

export const loginUser = createServerFn({ method: "POST" })
  .inputValidator(loginSchema)
  .handler(async ({ data }) => {
    const { DB } = bindings();
    if (!DB) {
      return { ok: false as const, error: "Database tidak aktif di lingkungan ini." };
    }

    const user = await DB.prepare(
      `SELECT id, password_hash, password_salt FROM users WHERE email = ?`,
    )
      .bind(data.email)
      .first<{ id: number; password_hash: string; password_salt: string }>();

    if (!user || !(await verifyPassword(data.password, user.password_hash, user.password_salt))) {
      return { ok: false as const, error: "Email atau kata sandi salah." };
    }

    await createSessionCookie(user.id, DB);
    return { ok: true as const };
  });

export const logoutUser = createServerFn({ method: "POST" }).handler(async () => {
  const { DB } = bindings();
  const token = getCookie(SESSION_COOKIE_NAME);
  if (token && DB) {
    await DB.prepare(`DELETE FROM sessions WHERE id = ?`).bind(token).run();
  }
  deleteCookie(SESSION_COOKIE_NAME, { path: "/" });
  return { ok: true as const };
});

// Shared server-side session lookup, reused by getCurrentUser (for the root
// route's context) AND by any server function backing a gated action
// (createOrder, createReservation, ...) that must verify the caller is
// actually logged in itself -- the client-side gate (hiding a form/redirecting
// when `context.user` is null) is a UX nicety, not a security boundary; the
// real check has to happen here, since a request can always be sent directly.
export const getSessionUser = createServerOnlyFn(async (): Promise<SessionUser | null> => {
  const { DB } = bindings();
  const token = getCookie(SESSION_COOKIE_NAME);
  if (!token || !DB) return null;

  const row = await DB.prepare(
    `SELECT u.id as id, u.email as email, u.full_name as fullName
     FROM sessions s
     JOIN users u ON u.id = s.user_id
     WHERE s.id = ? AND s.expires_at > datetime('now')`,
  )
    .bind(token)
    .first<SessionUser>();

  return row ?? null;
});

export const getCurrentUser = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ user: SessionUser | null }> => {
    return { user: await getSessionUser() };
  },
);
