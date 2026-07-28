// Password hashing + session token helpers. Greenfield auth (no prior
// user/session system existed) built on Web Crypto's `crypto.subtle`
// (native to the Workers runtime) rather than a dependency like bcrypt,
// which is CPU-heavy and a poor fit for Workers' per-request CPU-time limit.
// Session records live in D1 (`sessions` table, migrations/0006) rather than
// a signed/stateless cookie, so a session can be revoked server-side (log
// out, or a future "log out everywhere") by deleting its row.

export const SESSION_COOKIE_NAME = "ca_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

const PBKDF2_ITERATIONS = 120_000;

function toHex(bytes: ArrayBuffer | Uint8Array): string {
  return Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function fromHex(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

async function deriveBits(password: string, salt: Uint8Array): Promise<ArrayBuffer> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  return crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: salt as BufferSource, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    keyMaterial,
    256,
  );
}

export async function hashPassword(password: string): Promise<{ hash: string; salt: string }> {
  const saltBytes = crypto.getRandomValues(new Uint8Array(16));
  const bits = await deriveBits(password, saltBytes);
  return { hash: toHex(bits), salt: toHex(saltBytes) };
}

export async function verifyPassword(
  password: string,
  hash: string,
  salt: string,
): Promise<boolean> {
  const bits = await deriveBits(password, fromHex(salt));
  const candidate = toHex(bits);
  // Constant-time-ish comparison: compare fixed-length hex digests fully
  // rather than short-circuiting on the first mismatched character.
  if (candidate.length !== hash.length) return false;
  let diff = 0;
  for (let i = 0; i < candidate.length; i++) {
    diff |= candidate.charCodeAt(i) ^ hash.charCodeAt(i);
  }
  return diff === 0;
}

export function generateSessionToken(): string {
  return crypto.randomUUID() + crypto.randomUUID();
}
