import { Env, DBBillboard } from "./types";

const CREATE_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS billboards (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  link_url TEXT,
  cta_text TEXT DEFAULT 'Claim Offer',
  is_active INTEGER DEFAULT 1,
  display_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`;

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;

  try {
    // Ensure table exists safely without touching existing data
    await env.DB.prepare(CREATE_TABLE_SQL).run();

    const result = await env.DB.prepare(
      "SELECT * FROM billboards WHERE is_active = 1 ORDER BY display_order ASC, created_at DESC"
    ).all<DBBillboard>();

    const billboards = (result.results || []).map((b) => ({
      ...b,
      is_active: b.is_active === 1,
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
