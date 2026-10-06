export interface Env {
  DB: D1Database;
  JWT_SECRET?: string;
}

export interface JWTPayload {
  userId: string;
  username: string;
  exp: number;
}

export interface DBCategory {
  id: string;
  name: string;
  icon: string;
  badge: string | null;
  display_order: number;
  is_active: number;
}

export interface DBMenuItem {
  id: string;
  name: string;
  description: string | null;
  category_id: string;
  subcategory: string | null;
  price: number;
  prices_json: string | null;
  is_veg: number;
  is_spicy: number;
  is_best_seller: number;
  is_grilled: number;
  tag: string | null;
  options_json: string | null;
  image_url: string | null;
  is_available: number;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface DBBillboard {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  item_ids_json: string | null;
  discount_percent: number;
  link_url: string | null;
  cta_text: string | null;
  is_active: number;
  display_order: number;
  created_at: string;
  updated_at: string;
}
