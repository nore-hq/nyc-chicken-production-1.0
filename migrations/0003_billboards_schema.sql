-- 0003_billboards_schema.sql

CREATE TABLE IF NOT EXISTS billboards (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  item_ids_json TEXT,
  discount_percent REAL DEFAULT 0,
  link_url TEXT,
  cta_text TEXT DEFAULT 'Claim Offer',
  is_active INTEGER DEFAULT 1,
  display_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
