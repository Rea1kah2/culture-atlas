-- Auth (greenfield -- no prior user/session system existed) + the tables
-- backing the 3 gated actions (buy a product, apply as Ambassador, reserve
-- an experience). Additive only, same convention as prior migrations.

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  full_name TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY, -- opaque random token; also the session cookie value
  user_id INTEGER NOT NULL REFERENCES users(id),
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- "Buy a product" -- a lightweight order request (no online payment; see
-- design note in marketplace/$slug.tsx), not a real checkout/payment record.
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  product_slug TEXT NOT NULL REFERENCES marketplace_products(slug),
  quantity INTEGER NOT NULL DEFAULT 1,
  shipping_address TEXT NOT NULL,
  note TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- pending | contacted | fulfilled
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- "Reserve Experience" -- a booking request, not a live calendar/slot system.
CREATE TABLE IF NOT EXISTS reservations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  experience_slug TEXT NOT NULL REFERENCES local_experiences(slug),
  preferred_date TEXT NOT NULL,
  participants INTEGER NOT NULL DEFAULT 1,
  contact_note TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- pending | confirmed | completed
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
