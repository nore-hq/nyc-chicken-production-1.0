import { Env, DBMenuItem } from "../../types";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const itemsResult = await context.env.DB.prepare(
      "SELECT * FROM menu_items ORDER BY display_order ASC"
    ).all<DBMenuItem>();
    
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

    return new Response(JSON.stringify({ items }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const data = await context.request.json() as any;
    const {
      id, name, description, category_id, subcategory, price, prices,
      is_veg, is_spicy, is_best_seller, is_grilled, tag, options, image_url, is_available
    } = data;

    if (!id || !name || !category_id || price === undefined) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const prices_json = prices ? JSON.stringify(prices) : null;
    const options_json = options ? JSON.stringify(options) : null;

    const result = await context.env.DB.prepare(
      `INSERT INTO menu_items 
      (id, name, description, category_id, subcategory, price, prices_json, is_veg, is_spicy, is_best_seller, is_grilled, tag, options_json, image_url, is_available, updated_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`
    ).bind(
      id, name, description || null, category_id, subcategory || null, price, prices_json,
      is_veg ? 1 : 0, is_spicy ? 1 : 0, is_best_seller ? 1 : 0, is_grilled ? 1 : 0,
      tag || null, options_json, image_url || null, is_available === false ? 0 : 1
    ).run();

    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
};
