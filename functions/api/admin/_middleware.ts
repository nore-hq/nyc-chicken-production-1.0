import { Env, JWTPayload } from "../types";
import { parseCookies, verifyToken } from "../lib/crypto";

export const onRequest: PagesFunction<Env> = async (context) => {
  const cookieHeader = context.request.headers.get("Cookie");
  const cookies = parseCookies(cookieHeader);
  const token = cookies["nyc_admin_session"];

  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const jwtSecret = context.env.JWT_SECRET || "dev_secret_key_12345";
  const payload = await verifyToken(token, jwtSecret) as JWTPayload | null;

  if (!payload || payload.exp < Math.floor(Date.now() / 1000)) {
    return new Response(JSON.stringify({ error: "Session expired or invalid" }), { status: 401 });
  }

  // Pass user to the context data for downstream handlers
  context.data = { ...context.data, user: payload };

  return await context.next();
};
