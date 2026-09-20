import { Env, DBMenuItem, DBCategory } from "./types";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;
  
  try {
    const categoriesResult = await env.DB.prepare(
      "SELECT * FROM categories WHERE is_active = 1 ORDER BY display_order ASC"
    ).all<DBCategory>();
    
    const itemsResult = await env.DB.prepare(
      "SELECT * FROM menu_items ORDER BY display_order ASC"
    ).all<DBMenuItem>();
    
    // Parse JSON fields
    const items = itemsResult.results.map(item => ({
      ...item,
      is_veg: item.is_veg === 1,
      is_spicy: item.is_spicy === 1,
      is_best_seller: item.is_best_seller === 1,
      is_grilled: item.is_grilled === 1,
      is_available: item.is_available === 1,
      prices: item.prices_json ? JSON.parse(item.prices_json) : undefined,
      options: item.options_json ? JSON.parse(item.options_json) : undefined
    }));

    return new Response(JSON.stringify({
      categories: categoriesResult.results,
      items
    }), {
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
