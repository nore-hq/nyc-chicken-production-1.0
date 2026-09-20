import fs from 'fs';
import { MENU_CATEGORIES, MENU_ITEMS } from './src/data/menuData';

let sql = '';

// Seed Categories
for (const cat of MENU_CATEGORIES) {
  sql += `INSERT OR REPLACE INTO categories (id, name, icon, badge) VALUES ('${cat.id}', '${cat.name.replace(/'/g, "''")}', '${cat.icon}', ${cat.badge ? `'${cat.badge}'` : 'NULL'});\n`;
}

// Seed Items
for (const item of MENU_ITEMS) {
  const pricesJson = item.prices ? `'${JSON.stringify(item.prices)}'` : 'NULL';
  const optionsJson = item.options ? `'${JSON.stringify(item.options)}'` : 'NULL';
  const isVeg = item.isVeg ? 1 : 0;
  const isSpicy = item.isSpicy ? 1 : 0;
  const isBestSeller = item.isBestSeller ? 1 : 0;
  const isGrilled = item.isGrilled ? 1 : 0;
  const isAvailable = item.isAvailable !== false ? 1 : 0;
  
  sql += `INSERT OR REPLACE INTO menu_items (id, name, description, category_id, subcategory, price, prices_json, is_veg, is_spicy, is_best_seller, is_grilled, tag, options_json, image_url, is_available) VALUES ('${item.id}', '${item.name.replace(/'/g, "''")}', ${item.description ? `'${item.description.replace(/'/g, "''")}'` : 'NULL'}, '${item.category}', ${item.subcategory ? `'${item.subcategory.replace(/'/g, "''")}'` : 'NULL'}, ${item.price}, ${pricesJson}, ${isVeg}, ${isSpicy}, ${isBestSeller}, ${isGrilled}, ${item.tag ? `'${item.tag}'` : 'NULL'}, ${optionsJson}, ${item.image ? `'${item.image}'` : 'NULL'}, ${isAvailable});\n`;
}

fs.writeFileSync('seed_menu.sql', sql);
console.log('Generated seed_menu.sql');
