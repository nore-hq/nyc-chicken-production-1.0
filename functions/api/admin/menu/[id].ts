import { Env } from "../../types";

export const onRequestPut: PagesFunction<Env> = async (context) => {
  try {
    const id = context.params.id as string;
    const data = await context.request.json() as any;
    
    const {
      name, description, category_id, subcategory, price, prices,
      is_veg, is_spicy, is_best_seller, is_grilled, tag, options, image_url, is_available
    } = data;

    if (!name || !category_id || price === undefined) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const prices_json = prices ? JSON.stringify(prices) : null;
    const options_json = options ? JSON.stringify(options) : null;

    await context.env.DB.prepare(
      `UPDATE menu_items SET 
        name = ?, description = ?, category_id = ?, subcategory = ?, price = ?, 
        prices_json = ?, is_veg = ?, is_spicy = ?, is_best_seller = ?, is_grilled = ?, 
        tag = ?, options_json = ?, image_url = ?, is_available = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`
    ).bind(
      name, description || null, category_id, subcategory || null, price,
      prices_json, is_veg ? 1 : 0, is_spicy ? 1 : 0, is_best_seller ? 1 : 0, is_grilled ? 1 : 0,
      tag || null, options_json, image_url || null, is_available === false ? 0 : 1,
      id
    ).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
};

export const onRequestPatch: PagesFunction<Env> = async (context) => {
  try {
    const id = context.params.id as string;
    const data = await context.request.json() as any;
    
    const updates: string[] = [];
    const bindings: any[] = [];
    
    // Process known fields
    if (data.price !== undefined) {
      updates.push("price = ?");
      bindings.push(data.price);
    }
    if (data.is_available !== undefined) {
      updates.push("is_available = ?");
      bindings.push(data.is_available ? 1 : 0);
    }
    if (data.prices !== undefined) {
      updates.push("prices_json = ?");
      bindings.push(data.prices ? JSON.stringify(data.prices) : null);
    }
    // ... add more if needed

    if (updates.length === 0) {
      return new Response(JSON.stringify({ error: "No valid fields to update" }), { status: 400 });
    }

    updates.push("updated_at = CURRENT_TIMESTAMP");
    bindings.push(id); // for the WHERE clause

    await context.env.DB.prepare(
      `UPDATE menu_items SET ${updates.join(", ")} WHERE id = ?`
    ).bind(...bindings).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  try {
    const id = context.params.id as string;
    await context.env.DB.prepare("DELETE FROM menu_items WHERE id = ?").bind(id).run();
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
};
