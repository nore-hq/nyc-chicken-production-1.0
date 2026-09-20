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
  prices_json TEXT, 
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

INSERT OR REPLACE INTO admin_users (id, username, password_hash, salt, name)
VALUES ('admin_1', 'nycadmin@nyc.com', '20e7df12fabce1cdfa43d2069dde39c03cd564c0c0f0e4a3b07b2f425820b657', 'ab2587a7a9c924c56420f67f4e625797', 'Restaurant Manager');
