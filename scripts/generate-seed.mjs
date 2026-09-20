import fs from "fs";
import path from "path";
import crypto from "crypto";

// We'll read the compiled JS or use regex to extract the JSON-like structures
const menuDataPath = path.join(process.cwd(), "src/data/menuData.ts");
const menuDataContent = fs.readFileSync(menuDataPath, "utf-8");

// A bit of a hacky but effective way to extract the arrays without a full TS compiler
function extractArray(name) {
  const startIndex = menuDataContent.indexOf(`export const ${name}`);
  if (startIndex === -1) return [];
  const startBracket = menuDataContent.indexOf("[", startIndex);
  let depth = 0;
  let endIndex = -1;
  for (let i = startBracket; i < menuDataContent.length; i++) {
    if (menuDataContent[i] === "[") depth++;
    if (menuDataContent[i] === "]") depth--;
    if (depth === 0) {
      endIndex = i;
      break;
    }
  }
  const arrayStr = menuDataContent.substring(startBracket, endIndex + 1);
  // Evaluate it safely using Function
  try {
    const fn = new Function(`return ${arrayStr}`);
    return fn();
  } catch (e) {
    // If it has TS types inside, we might need a regex cleaner
    // Replace simple type assertions or comments if needed
    let cleanStr = arrayStr.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "");
    const fn = new Function(`return ${cleanStr}`);
    return fn();
  }
}

let categories = [];
let items = [];
try {
  // Let's try to parse using regex or simple eval. 
  // Wait, menuData.ts has clean object literals.
  categories = extractArray("MENU_CATEGORIES");
  items = extractArray("MENU_ITEMS");
} catch(e) {
  console.log("Failed to parse menuData.ts directly. Using fallback data or manual mode.", e);
  process.exit(1);
}

// Generate Admin Password Hash
// For seed, we'll create user 'admin' with password 'nycChicken@2026!'
const password = "nycChicken@2026!";
const saltBytes = crypto.randomBytes(16);
const salt = saltBytes.toString('hex');
// PBKDF2 parameters matching our crypto util (100000 iterations, SHA-256)
crypto.pbkdf2(password, saltBytes, 100000, 32, 'sha256', (err, derivedKey) => {
  if (err) throw err;
  const hash = derivedKey.toString('hex');
  
  let sql = `-- 0002_seed_menu_data.sql\n\n`;
  sql += `-- Insert default admin (admin / ${password})\n`;
  sql += `INSERT INTO admin_users (id, username, password_hash, salt, name) VALUES ('admin_1', 'admin', '${hash}', '${salt}', 'Restaurant Manager');\n\n`;
  
  sql += `-- Insert Categories\n`;
  categories.forEach((c, idx) => {
    sql += `INSERT INTO categories (id, name, icon, badge, display_order, is_active) VALUES ('${c.id}', '${c.name.replace(/'/g, "''")}', '${c.icon}', ${c.badge ? "'" + c.badge.replace(/'/g, "''") + "'" : 'NULL'}, ${idx * 10}, 1);\n`;
  });
  
  sql += `\n-- Insert Menu Items\n`;
  items.forEach((item, idx) => {
    const desc = item.description ? `'${item.description.replace(/'/g, "''")}'` : 'NULL';
    const subcat = item.subcategory ? `'${item.subcategory.replace(/'/g, "''")}'` : 'NULL';
    const pricesJson = item.prices ? `'${JSON.stringify(item.prices).replace(/'/g, "''")}'` : 'NULL';
    const tag = item.tag ? `'${item.tag.replace(/'/g, "''")}'` : 'NULL';
    const optionsJson = item.options ? `'${JSON.stringify(item.options).replace(/'/g, "''")}'` : 'NULL';
    const imgUrl = item.image ? `'${item.image.replace(/'/g, "''")}'` : 'NULL';
    
    sql += `INSERT INTO menu_items (id, name, description, category_id, subcategory, price, prices_json, is_veg, is_spicy, is_best_seller, is_grilled, tag, options_json, image_url, display_order) VALUES ('${item.id}', '${item.name.replace(/'/g, "''")}', ${desc}, '${item.category}', ${subcat}, ${item.price}, ${pricesJson}, ${item.isVeg ? 1 : 0}, ${item.isSpicy ? 1 : 0}, ${item.isBestSeller ? 1 : 0}, ${item.isGrilled ? 1 : 0}, ${tag}, ${optionsJson}, ${imgUrl}, ${idx * 10});\n`;
  });
  
  fs.writeFileSync(path.join(process.cwd(), "migrations/0002_seed_menu_data.sql"), sql);
  console.log("Successfully generated migrations/0002_seed_menu_data.sql!");
});
