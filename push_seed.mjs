import fs from 'fs';

async function seed() {
  const sql = fs.readFileSync('seed_menu.sql', 'utf-8');
  try {
    const res = await fetch("http://localhost:8788/api/seed", {
      method: "POST",
      body: sql,
    });
    const text = await res.text();
    console.log("STATUS:", res.status);
    console.log("RESPONSE:", text);
  } catch (e) {
    console.log("ERROR:", e.message);
  }
}
seed();
