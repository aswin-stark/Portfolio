<div align="center">

# 🌿 LNTNC — Love and Tender Natural Care

**Handcrafted natural skincare, from Namakkal to your doorstep.**

[![GitHub](https://img.shields.io/badge/GitHub-vishnukarthik29%2FLTNC-181717?style=for-the-badge&logo=github)](https://github.com/vishnukarthik29/LTNC)
[![Instagram](https://img.shields.io/badge/Instagram-LTNATURALCARE-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/LTNATURALCARE3103)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Chat-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/918438939103)

</div>

---

## 🚀 About This Project

A full e-commerce platform for **LNTNC**, a natural skincare brand selling handcrafted, small-batch soaps, shampoos, and body care. Built on **Medusa v2** for commerce (products, cart, checkout, orders) with a custom **Next.js** storefront on top — payments via **Razorpay**, with optional Google OAuth for both customers and admins.

---

## 🖥️ What's Inside

| App | Description |
|---|---|
| **`lntnc-backend/`** | Medusa v2 commerce engine — products, regions, pricing, orders, admin dashboard |
| **`lntnc-storefront/`** | Customer-facing Next.js storefront — animated hero, product browsing, cart & checkout |
| **`lntnc-catalogue.json`** | The real LNTNC product catalogue (categories, products, variants, INR pricing) |
| **`seed-lntnc.ts`** | Medusa CLI script that seeds the catalogue above into a fresh backend |
| **`lntnc-medusa-build-guide.md`** | The full step-by-step build & configuration reference for this project |

`lntnc-backend` and `lntnc-storefront` are independent apps with their own `package.json` — not a single workspace, so each is installed and run separately.

---

## 🛠️ Tech Stack

![Medusa](https://img.shields.io/badge/Medusa_v2-000000?style=for-the-badge&logo=medusajs&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=white)

---

## ✨ Storefront Highlights

- 🎬 **Animated hero** — a rotating background slideshow built from real catalogue photography, floating soap-bubble & fish ambience, staggered text entrance
- 🛍️ **"New Arrivals" carousel** — swiper-style, 2×3 slides on desktop with fish-shaped nav arrows, one product per screen on mobile
- 🎉 **Confetti-on-hover product cards** — a little party-popper burst on every product tile
- 🪷 **"What We Stand For"** — an illustrated flat-lay of the brand's values (stone, leaf, ceramic tile, kraft tag, wax seal)
- 🏷️ **Admin-driven badges** — "New" / "Bestseller" / "Pre-order" tags set from Admin metadata, no backend changes needed
- 💳 **Razorpay checkout** with optional Google OAuth login for customers and admins
- 📱 Fully responsive across mobile, tablet, and desktop

---

## 📋 Requirements

| Requirement | Notes |
|---|---|
| Node.js **20+** | developed/tested on Node 22 |
| npm **10+** | backend uses npm; storefront uses **Yarn 4** (`packageManager: yarn@4.12.0`) |
| PostgreSQL **15+** | one database for the backend (e.g. `lntnc_backend`) |
| Redis | used by Medusa's event bus/workflow engine — optional for local dev, required for a production-like setup |
| Razorpay account | test-mode API keys for the payment provider |
| Google Cloud OAuth client | only needed for "Sign in with Google" |

---

## 📦 Getting Started

### 1. Run the backend

```bash
cd lntnc-backend
npm install

cd apps/backend
cp .env.template .env
```

Fill in `.env` (see `lntnc-medusa-build-guide.md` Part J for the full checklist):

- `DATABASE_URL` — e.g. `postgresql://<user>:<password>@localhost:5432/lntnc_backend`
- `JWT_SECRET`, `COOKIE_SECRET` — any random strings for local dev
- `REDIS_URL` — e.g. `redis://localhost:6379`
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` (only if using Google login)

```bash
npx medusa db:migrate
npx medusa user -e admin@lntnc.com -p <temporary-password>

cd ../..
npm run dev              # turbo dev — starts the backend
```

- Admin dashboard: `http://localhost:9000/app`
- Store API: `http://localhost:9000/store/products`

#### Seed the LNTNC catalogue

```bash
cd apps/backend

# 1. Base demo seed (creates default Sales Channel, Stock Location, Region) — required first
npx medusa exec ./src/scripts/seed.ts

# 2. Copy in the LNTNC catalogue assets
#    lntnc-catalogue.json -> src/scripts/data/lntnc-catalogue.json
#    seed-lntnc.ts        -> src/scripts/seed-lntnc.ts

# 3. Run the LNTNC seed
npx medusa exec ./src/scripts/seed-lntnc.ts
```

> Make sure INR is enabled as a store currency (Admin → Settings → Store) before running the LNTNC seed — see `lntnc-medusa-build-guide.md` Part F/G.

### 2. Run the storefront

```bash
cd lntnc-storefront
cp .env.template .env.local   # already present; edit as needed
```

Fill in `.env.local`:

- `MEDUSA_BACKEND_URL` — `http://localhost:9000`
- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` — publishable API key generated from the backend admin
- `NEXT_PUBLIC_BASE_URL` — `http://localhost:8000`
- `NEXT_PUBLIC_DEFAULT_REGION` — `in` for India
- `NEXT_PUBLIC_STRIPE_KEY` — leave blank unless Stripe is enabled

```bash
yarn install
yarn dev
```

Storefront runs at `http://localhost:8000` — confirm it loads and lists products before customizing anything (this validates the backend connection). See [`lntnc-storefront/README.md`](lntnc-storefront/README.md) for storefront-specific structure and customization notes.

---

## 🔌 Ports Summary

| App | URL |
|---|---|
| Backend (Store API) | `http://localhost:9000` |
| Backend (Admin) | `http://localhost:9000/app` |
| Storefront | `http://localhost:8000` |

---

## 📁 Repository Structure

```
LNTNC/
├── lntnc-backend/               Medusa v2 backend (Turborepo wrapper)
│   └── apps/backend/            the actual Medusa app (config, .env, src/)
├── lntnc-storefront/            Next.js storefront (Medusa's official starter, customized)
├── lntnc-catalogue.json         LNTNC product catalogue (categories/products/variants, INR pricing)
├── seed-lntnc.ts                 Medusa v2 CLI script that seeds the catalogue above
└── lntnc-medusa-build-guide.md   Full build/reference guide for this project
```

---

## 🌐 Getting This Into Git

- `lntnc-storefront/` has its own local git history; the whole repo now shares a single remote (`origin` → this GitHub repo).
- `.gitignore` in `lntnc-backend` excludes `node_modules`, `.env`, `.medusa`, build output, etc. **Never commit the `.env` file** — it holds live Razorpay/Google secrets. Only `.env.template` should go into git.

---

## 📚 More Detail

See [`lntnc-medusa-build-guide.md`](lntnc-medusa-build-guide.md) for the full step-by-step plan — Google OAuth for customers and admin, Razorpay setup, region/currency/tax config, catalogue seed internals, and storefront branding.

---

<div align="center">

Handcrafted with 🌿 for **LNTNC**

</div>
