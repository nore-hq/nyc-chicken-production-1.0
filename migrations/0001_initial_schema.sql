-- 0001_initial_schema.sql

CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  badge TEXT,
  display_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS menu_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category_id TEXT NOT NULL REFERENCES categories(id),
  subcategory TEXT,
  price REAL NOT NULL,
  prices_json TEXT, -- For variant pricing e.g. [{"label":"Regular", "price": 129}]
  is_veg INTEGER DEFAULT 0,
  is_spicy INTEGER DEFAULT 0,
  is_best_seller INTEGER DEFAULT 0,
  is_grilled INTEGER DEFAULT 0,
  tag TEXT,
  options_json TEXT,
  image_url TEXT,
  is_available INTEGER DEFAULT 1,
  display_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admin_users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  name TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
