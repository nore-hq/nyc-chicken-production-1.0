import { Env } from "../../types";
import { ensureBillboardsSchema } from "../../billboards-schema";

export const onRequestPut: PagesFunction<Env> = async (context) => {
  try {
    await ensureBillboardsSchema(context.env.DB);
    const id = context.params.id as string;
    const data = (await context.request.json()) as {
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

    const activeVal = is_active === false ? 0 : 1;
    const orderVal = typeof display_order === "number" ? display_order : 0;
    const ctaVal = cta_text?.trim() || "Claim Offer";

    await context.env.DB.prepare(
      `UPDATE billboards SET 
        title = ?, 
        subtitle = ?, 
        image_url = ?, 
        item_ids_json = ?,
        discount_percent = ?,
        link_url = ?, 
        cta_text = ?, 
        is_active = ?, 
        display_order = ?, 
        updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?`
    )
      .bind(
        title.trim(),
        subtitle?.trim() || null,
        image_url.trim(),
        JSON.stringify(itemIds),
        discountPercent,
        link_url?.trim() || null,
        ctaVal,
        activeVal,
        orderVal,
        id
      )
      .run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const onRequestPatch: PagesFunction<Env> = async (context) => {
  try {
    await ensureBillboardsSchema(context.env.DB);
    const id = context.params.id as string;
    const data = (await context.request.json()) as {
      is_active?: boolean;
      display_order?: number;
    };

    const updates: string[] = [];
    const bindings: (string | number)[] = [];

    if (data.is_active !== undefined) {
      updates.push("is_active = ?");
      bindings.push(data.is_active ? 1 : 0);
    }

    if (data.display_order !== undefined) {
      updates.push("display_order = ?");
      bindings.push(Number(data.display_order));
    }

    if (updates.length === 0) {
      return new Response(JSON.stringify({ error: "No valid fields to update" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    updates.push("updated_at = CURRENT_TIMESTAMP");
    bindings.push(id);

    await context.env.DB.prepare(
      `UPDATE billboards SET ${updates.join(", ")} WHERE id = ?`
    )
      .bind(...bindings)
      .run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  try {
    await ensureBillboardsSchema(context.env.DB);
    const id = context.params.id as string;
    await context.env.DB.prepare("DELETE FROM billboards WHERE id = ?")
      .bind(id)
      .run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
