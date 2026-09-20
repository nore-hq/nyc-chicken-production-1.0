import { Env, JWTPayload } from "../types";
import { verifyPassword, signToken } from "../lib/crypto";

const jsonHeaders = { "Content-Type": "application/json" };

async function ensureDB(db: any) {
  try {
    await db.prepare("SELECT 1 FROM admin_users LIMIT 1").first();
  } catch {
    // Tables don't exist yet — create them
    await db.batch([
      db.prepare(`CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY, name TEXT NOT NULL, icon TEXT NOT NULL, badge TEXT,
        display_order INTEGER DEFAULT 0, is_active INTEGER DEFAULT 1
      )`),
      db.prepare(`CREATE TABLE IF NOT EXISTS menu_items (
        id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT,
        category_id TEXT NOT NULL REFERENCES categories(id), subcategory TEXT,
        price REAL NOT NULL, prices_json TEXT, is_veg INTEGER DEFAULT 0,
        is_spicy INTEGER DEFAULT 0, is_best_seller INTEGER DEFAULT 0,
        is_grilled INTEGER DEFAULT 0, tag TEXT, options_json TEXT, image_url TEXT,
        is_available INTEGER DEFAULT 1, display_order INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      )`),
      db.prepare(`CREATE TABLE IF NOT EXISTS admin_users (
        id TEXT PRIMARY KEY, username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL, salt TEXT NOT NULL, name TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )`),
      db.prepare(`INSERT OR REPLACE INTO admin_users (id, username, password_hash, salt, name)
        VALUES ('admin_1', 'nycadmin@nyc.com', '20e7df12fabce1cdfa43d2069dde39c03cd564c0c0f0e4a3b07b2f425820b657', 'ab2587a7a9c924c56420f67f4e625797', 'Restaurant Manager')`)
    ]);
  }
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = await context.request.json() as { username?: string; password?: string };
    let { username, password } = body;
    
    if (!username || !password) {
      return new Response(JSON.stringify({ error: "Missing username or password" }), { status: 400, headers: jsonHeaders });
    }

    username = username.trim().toLowerCase();
    password = password.trim();

    // Auto-initialize DB if needed
    await ensureDB(context.env.DB);

    const userResult = await context.env.DB.prepare(
      "SELECT id, username, password_hash, salt, name FROM admin_users WHERE LOWER(username) = ?"
    ).bind(username).first<{ id: string, username: string, password_hash: string, salt: string, name: string }>();

    if (!userResult) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401, headers: jsonHeaders });
    }

    const isValid = await verifyPassword(password, userResult.salt, userResult.password_hash);
    if (!isValid) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401, headers: jsonHeaders });
    }

    const jwtSecret = context.env.JWT_SECRET || "dev_secret_key_12345";
    
    const payload: JWTPayload = {
      userId: userResult.id,
      username: userResult.username,
      exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days
    };
    
    const token = await signToken(payload, jwtSecret);
    
    const cookieString = `nyc_admin_session=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${7 * 24 * 60 * 60}`;
    
    return new Response(JSON.stringify({ 
      success: true, 
      user: { id: userResult.id, username: userResult.username, name: userResult.name }
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": cookieString
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500, headers: jsonHeaders });
  }
};
