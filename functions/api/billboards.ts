import { Env, DBBillboard } from "./types";
import { ensureBillboardsSchema } from "./billboards-schema";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;

  try {
    await ensureBillboardsSchema(env.DB);

    const result = await env.DB.prepare(
      "SELECT * FROM billboards WHERE is_active = 1 ORDER BY display_order ASC, created_at DESC"
    ).all<DBBillboard>();

    const billboards = (result.results || []).map((b) => ({
      ...b,
      is_active: b.is_active === 1,
      item_ids: b.item_ids_json ? JSON.parse(b.item_ids_json) : [],
    }));

    return new Response(JSON.stringify({ billboards }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message, billboards: [] }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
