# next-ecommerce — Ready-to-push skeleton

This repository is a starter skeleton for the e-commerce single-page app requested.

## What is included
- Next.js app (API routes under `pages/api/`)
- JWT auth (httpOnly cookie)
- Items CRUD with filters
- Cart APIs (server-side cart persisted per user; guest cart persisted in browser)
- Simple React pages for signup/login/shop/cart

## How to use (locally)
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env.local` with:
   ```
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<a-long-secret>
   NEXT_PUBLIC_APP_NAME=ShopMate
   ```
3. Run dev:
   ```bash
   npm run dev
   ```
4. Seed sample items (optional):
   ```bash
   npm run seed
   ```

## How to push to GitHub & Deploy (quick)
1. Create a repo on GitHub (via website).
2. Locally:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In Vercel: Import the GitHub repo and set environment variables.

