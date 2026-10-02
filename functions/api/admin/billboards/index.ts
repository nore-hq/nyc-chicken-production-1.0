import { Env, DBBillboard } from "../../types";

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
  try {
    await context.env.DB.prepare(CREATE_TABLE_SQL).run();

    const result = await context.env.DB.prepare(
      "SELECT * FROM billboards ORDER BY display_order ASC, created_at DESC"
    ).all<DBBillboard>();

    const billboards = (result.results || []).map((b) => ({
      ...b,
      is_active: b.is_active === 1,
    }));

    return new Response(JSON.stringify({ billboards }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    await context.env.DB.prepare(CREATE_TABLE_SQL).run();

    const data = (await context.request.json()) as any;
    const {
      id,
      title,
      subtitle,
      image_url,
      link_url,
      cta_text,
      is_active,
      display_order,
    } = data;

    if (!title || !image_url) {
      return new Response(
        JSON.stringify({ error: "Title and Image are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const billboardId = id || `bb_${Date.now()}`;
    const activeVal = is_active === false ? 0 : 1;
    const orderVal = typeof display_order === "number" ? display_order : 0;
    const ctaVal = cta_text?.trim() || "Claim Offer";

    await context.env.DB.prepare(
      `INSERT INTO billboards 
      (id, title, subtitle, image_url, link_url, cta_text, is_active, display_order, updated_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`
    )
      .bind(
        billboardId,
        title.trim(),
        subtitle?.trim() || null,
        image_url.trim(),
        link_url?.trim() || null,
        ctaVal,
        activeVal,
        orderVal
      )
      .run();

    return new Response(
      JSON.stringify({ success: true, id: billboardId }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
