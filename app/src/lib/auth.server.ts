// Password hashing + session token helpers, built on Web Crypto's
// `crypto.subtle` (native to the Workers runtime) rather than a dependency
// like bcrypt, which is CPU-heavy and a poor fit for Workers.
//
// ITERATION COUNT IS CONSTRAINED BY THE PLATFORM, NOT BY PREFERENCE.
// The Workers FREE plan allows only 10ms of CPU per request. PBKDF2 at the
// ~120k iterations you'd normally want costs ~94ms of CPU on its own, which
// silently killed every registration attempt (the Worker was terminated
// mid-hash, surfacing to the user as a generic "something went wrong").
// Measured cost is ~1ms per 1,000 iterations, so this is tuned to leave
// clear headroom for the rest of the request (RPC deserialization, D1 round
// trips, cookie serialization) rather than spending the whole budget here.
//
// To compensate for the low iteration count, the PBKDF2 output is then
// HMAC'd with a server-side secret ("pepper") that lives in a Cloudflare
// secret, NOT in the database. Cost is microseconds, but it means a database
// leak alone is not enough to brute-force passwords offline: an attacker
// would also have to steal the pepper, which never appears in any row.
// If this app ever moves to the Workers Paid plan (30s CPU), raise
// PBKDF2_ITERATIONS substantially and keep the pepper as defence in depth.

export const SESSION_COOKIE_NAME = "ca_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

const PBKDF2_ITERATIONS = 3_000;

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

// HMAC the derived bits with the server-held pepper. Keyed with the pepper,
// so the result cannot be recomputed from database contents alone.
async function applyPepper(derived: ArrayBuffer, pepper: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(pepper),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, derived);
  return toHex(signature);
}

export async function hashPassword(
  password: string,
  pepper: string,
): Promise<{ hash: string; salt: string }> {
  const saltBytes = crypto.getRandomValues(new Uint8Array(16));
  const derived = await deriveBits(password, saltBytes);
  return { hash: await applyPepper(derived, pepper), salt: toHex(saltBytes) };
}

export async function verifyPassword(
  password: string,
  hash: string,
  salt: string,
  pepper: string,
): Promise<boolean> {
  const derived = await deriveBits(password, fromHex(salt));
  const candidate = await applyPepper(derived, pepper);
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
