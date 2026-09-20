import { Env } from "../types";

export const onRequestPost: PagesFunction<Env> = async () => {
  const cookieString = `nyc_admin_session=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": cookieString
    }
  });
};
