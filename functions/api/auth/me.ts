import { Env, JWTPayload } from "../types";
import { parseCookies, verifyToken } from "../lib/crypto";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const cookieHeader = context.request.headers.get("Cookie");
  const cookies = parseCookies(cookieHeader);
  const token = cookies["nyc_admin_session"];

  if (!token) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
  }

  const jwtSecret = context.env.JWT_SECRET || "dev_secret_key_12345";
  const payload = await verifyToken(token, jwtSecret) as JWTPayload | null;

  if (!payload || payload.exp < Math.floor(Date.now() / 1000)) {
    return new Response(JSON.stringify({ error: "Session expired or invalid" }), { status: 401 });
  }

  try {
    const user = await context.env.DB.prepare(
      "SELECT id, username, name FROM admin_users WHERE id = ?"
    ).bind(payload.userId).first();

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 401 });
    }

    return new Response(JSON.stringify({ success: true, user }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
};
