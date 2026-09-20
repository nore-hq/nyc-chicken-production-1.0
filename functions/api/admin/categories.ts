import { Env, DBCategory } from "../types";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const categoriesResult = await context.env.DB.prepare(
      "SELECT * FROM categories ORDER BY display_order ASC"
    ).all<DBCategory>();
    
    return new Response(JSON.stringify({ categories: categoriesResult.results }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const data = await context.request.json() as any;
    const { id, name, icon, badge, display_order, is_active } = data;

    if (!id || !name || !icon) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // Upsert logic using INSERT OR REPLACE
    await context.env.DB.prepare(
      `INSERT OR REPLACE INTO categories (id, name, icon, badge, display_order, is_active) 
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(
      id, name, icon, badge || null, display_order || 0, is_active === false ? 0 : 1
    ).run();

    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
};
