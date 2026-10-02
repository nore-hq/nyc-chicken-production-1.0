import { Env } from "../../types";

export const onRequestPut: PagesFunction<Env> = async (context) => {
  try {
    const id = context.params.id as string;
    const data = (await context.request.json()) as any;

    const {
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

    const activeVal = is_active === false ? 0 : 1;
    const orderVal = typeof display_order === "number" ? display_order : 0;
    const ctaVal = cta_text?.trim() || "Claim Offer";

    await context.env.DB.prepare(
      `UPDATE billboards SET 
        title = ?, 
        subtitle = ?, 
        image_url = ?, 
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
    const id = context.params.id as string;
    const data = (await context.request.json()) as any;

    const updates: string[] = [];
    const bindings: any[] = [];

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
