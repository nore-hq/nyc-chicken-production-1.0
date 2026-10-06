import { Env, DBBillboard } from "../../types";
import { ensureBillboardsSchema } from "../../billboards-schema";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    await ensureBillboardsSchema(context.env.DB);

    const result = await context.env.DB.prepare(
      "SELECT * FROM billboards ORDER BY display_order ASC, created_at DESC"
    ).all<DBBillboard>();

    const billboards = (result.results || []).map((b) => ({
      ...b,
      is_active: b.is_active === 1,
      item_ids: b.item_ids_json ? JSON.parse(b.item_ids_json) : [],
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
    await ensureBillboardsSchema(context.env.DB);

    const data = (await context.request.json()) as {
      id?: string;
      title?: string;
      subtitle?: string | null;
      image_url?: string;
      item_ids?: unknown;
      discount_percent?: number;
      link_url?: string | null;
      cta_text?: string | null;
      is_active?: boolean;
      display_order?: number;
    };
    const {
      id,
      title,
      subtitle,
      image_url,
      item_ids,
      link_url,
      cta_text,
      is_active,
      display_order,
    } = data;

    if (!title?.trim() || !image_url?.trim()) {
      return new Response(
        JSON.stringify({ error: "Title and Image are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const itemIds = Array.isArray(item_ids)
      ? item_ids.filter((itemId): itemId is string => typeof itemId === "string")
      : [];
    if (itemIds.length === 0) {
      return new Response(
        JSON.stringify({ error: "At least one menu dish is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const discountPercent = data.discount_percent ?? 0;
    if (!Number.isFinite(discountPercent) || discountPercent < 0 || discountPercent > 100) {
      return new Response(
        JSON.stringify({ error: "Discount must be between 0 and 100 percent" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const billboardId = id || `bb_${Date.now()}`;
    const activeVal = is_active === false ? 0 : 1;
    const orderVal = typeof display_order === "number" ? display_order : 0;
    const ctaVal = cta_text?.trim() || "Claim Offer";

    await context.env.DB.prepare(
      `INSERT INTO billboards 
      (id, title, subtitle, image_url, item_ids_json, discount_percent, link_url, cta_text, is_active, display_order, updated_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`
    )
      .bind(
        billboardId,
        title.trim(),
        subtitle?.trim() || null,
        image_url.trim(),
        JSON.stringify(itemIds),
        discountPercent,
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
