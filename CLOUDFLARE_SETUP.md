# NYC Chicken - Cloudflare D1 & Pages Setup Guide

This guide explains how to set up the NYC Chicken website on Cloudflare, including the D1 SQL Database, backend API, and the admin management dashboard.

## 1. Initial Setup (Local Development)

First, make sure you have the required dependencies installed:
```bash
npm install
```

### Create the Local Database
Create your initial local database and run the schema and seed scripts:
```bash
npm run db:migrate:local
```
This will:
1. Create the local SQLite database in `.wrangler/state/v3/d1`.
2. Generate all the necessary tables (categories, menu_items, admin_users).
3. Pre-populate all ~80 menu items and 12 categories from the existing menu data!
4. Create the default admin user.

**Default Admin Credentials**:
- Username: `admin`
- Password: `nycChicken@2026!`

### Run the Application Locally
Run the Cloudflare Pages development server (this automatically serves both your frontend and the API functions):
```bash
npm run build
npm run pages:dev
```
Your app will be available at `http://localhost:8788`.
- Visit `http://localhost:8788` for the public site.
- Visit `http://localhost:8788/admin/login` for the admin portal.

---

## 2. Deploying to Cloudflare Production

### A. Authenticate with Cloudflare
```bash
npx wrangler login
```

### B. Create the Production D1 Database
Create the database on Cloudflare's servers:
```bash
npm run db:create
```
This command will output a `database_id` (e.g., `xxxx-xxxx-xxxx-xxxx`).

### C. Update wrangler.jsonc
Open `wrangler.jsonc` and replace `YOUR_DATABASE_ID_HERE` with the ID you just received:
```jsonc
"d1_databases": [
  {
    "binding": "DB",
    "database_name": "nyc-chicken-db",
    "database_id": "xxxx-xxxx-xxxx-xxxx"
  }
]
```

### D. Run Remote Migrations
Push the database schema and seed data to your live production database:
```bash
npm run db:migrate:remote
```

### E. Change JWT Secret (Important!)
In `wrangler.jsonc`, update the `JWT_SECRET` under `"vars"` to a secure, random string (like a long password) to ensure your admin sessions are secure.

### F. Deploy to Cloudflare Pages
Deploy both the frontend and the serverless functions in one command:
```bash
npm run pages:deploy
```
*(Alternatively, connect your GitHub repository directly in the Cloudflare Dashboard and it will auto-deploy on every push!)*

---

## 3. How to Manage the Menu

Once deployed, the manager can visit `https://yourdomain.com/admin/login`.

1. **Change Prices**: Click on any price in the table, type the new price, and press Enter or click outside. It saves instantly!
2. **Toggle Stock**: Click the green/red switch to instantly mark an item as "Out of Stock". The public website will immediately show a "Sold Out" badge.
3. **Add Items**: Click the "+ Add Item" button to add new seasonal items or combos.

The public website fetches this data on every load, meaning your customers always see the most up-to-date prices with zero layout shifting or lag.
