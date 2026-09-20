import { Env } from "./types";

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const sql = await context.request.text();
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .map(s => context.env.DB.prepare(s));

    // Batch execute in chunks of 100 to avoid D1 limits
    for (let i = 0; i < statements.length; i += 100) {
      const chunk = statements.slice(i, i + 100);
      await context.env.DB.batch(chunk);
    }
    
    return new Response(JSON.stringify({ success: true, count: statements.length }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
