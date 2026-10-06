export async function ensureBillboardsSchema(db: D1Database): Promise<void> {
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS billboards (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      subtitle TEXT,
      image_url TEXT NOT NULL,
      item_ids_json TEXT,
      discount_percent REAL DEFAULT 0,
      link_url TEXT,
      cta_text TEXT DEFAULT 'Claim Offer',
      is_active INTEGER DEFAULT 1,
      display_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  const columns = await db.prepare("PRAGMA table_info(billboards)").all<{ name: string }>();
  const columnNames = new Set(columns.results?.map(column => column.name) || []);
  const missingColumns = [
    ["item_ids_json", "TEXT"],
    ["discount_percent", "REAL DEFAULT 0"],
  ] as const;

  for (const [name, definition] of missingColumns) {
    if (columnNames.has(name)) continue;
    try {
      await db.prepare(`ALTER TABLE billboards ADD COLUMN ${name} ${definition}`).run();
    } catch (error) {
      if (!(error instanceof Error) || !error.message.includes("duplicate column name")) {
        throw error;
      }
    }
  }
}
