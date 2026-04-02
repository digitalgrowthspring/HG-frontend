# Heavenly Giggles — Full Project Context

> Read STATUS.md first to see where the build is up to.

## Fresh Session Read Order
If this is a new Codex session, read these first:
- `STATUS.md`
- `CONTEXT.md`
- `notebooklm.md`
- `WP_TO_NEXTJS_WORKFLOW.md`

## What This Project Is
Rebuilding https://heavenlygiggles.com from WordPress + WooCommerce + Thrive Themes into a headless Next.js frontend. The existing WordPress site stays live and untouched during the build — we work locally until the new site is ready to go live.

## Project Folder Structure
```
/Users/test/Documents/Antigravity/Heavenlygiggles/
├── frontend/          ← Next.js app (this is what you work in)
│   ├── src/
│   │   ├── app/       ← pages, layout, globals.css
│   │   ├── components/ ← Navigation, LegalShell
│   │   └── lib/       ← seo.ts, wordpress.ts
│   ├── .env.local     ← GTM ID, WhatsApp, WP API URL
│   └── package.json
├── CONTEXT.md         ← this file
└── STATUS.md          ← current build progress
```

## Skills to Read
Before working, check these agency skills:
- `/Users/test/Documents/Antigravity/.BOH/wp-to-nextjs/SKILL.md`
- `/Users/test/Documents/Antigravity/.BOH/wp-thrive-to-nextjs/SKILL.md`

Also note the emerging agency process:
- if a brand-new client folder has not been created yet, the workflow should begin with the onboarding skill / client setup
- brand colours, core identity, hosting stack, GTM/GA4, and domain ownership should be confirmed before the migration workflow begins

## The Business
**Heavenly Giggles** — jumping castle & inflatable rentals, Fourways, Johannesburg, South Africa.

- 3 products: Standard Castle (R700), Castle + Slide (R900), Water Slide (R800) — all per weekend
- Rental period: Friday pickup → Monday return (weekends only)
- Free delivery to Fourways, R120 flat fee rest of JHB
- One booking per castle per date (no double bookings)
- **WhatsApp: 0828828864**
- Email: shaney@heavenlygiggles.com
- Address: 39 A Albatross, Fourways, Johannesburg

## Brand Positioning
"The Disney of jumping castles" — premium, magical, trustworthy.

**The insight:** Customers weren't booking online because of trust issues. The site needs to make tired parents feel confident enough to WhatsApp and confirm. The calendar and payment flow exists but was barely used — deferred to Phase 2.

**Current strategy update:** we are now intentionally nudging users toward the online flow again, but with a softer funnel:
- marketing hero buttons can scroll users down to product sections first
- browse sections mainly push into product detail pages
- product pages carry the true online booking CTA
- WhatsApp remains the human-support path throughout

**Dual audience:**
- Kids see: colour, magic, fun
- Parents read: easy, stress-free, trusted, reliable

**Hero headline (keep this):** "Kids Jump. You Relax. We Handle the Rest."

## Design System
This is a **light site** (warm white base) — the opposite of the dark Digital Growth Spring theme.

| Token | Value | Use |
|---|---|---|
| `--bg-primary` | `#fffbf5` | Warm white — page background |
| `--bg-secondary` | `#fdf4e7` | Cream — alternate sections |
| `--bg-purple` | `#f5f0ff` | Lavender — accent sections |
| `--accent` | `#7c3aed` | Royal purple — primary brand, headings |
| `--accent-gold` | `#f59e0b` | Sunshine gold — warmth, highlights |
| `--accent-pink` | `#f43f5e` | Coral pink — CTAs, energy |
| `--accent-teal` | `#0d9488` | Teal — trust signals |
| `--text-primary` | `#1c1917` | Near-black |
| `--text-secondary` | `#6b5e7a` | Muted purple-grey |

**Fonts:** Fredoka (headings) + Nunito (body) — loaded via `@import` in `globals.css`. Do NOT use `next/font/google`.

**Rule:** Never hardcode hex values in component CSS. Always use `var(--token-name)`.

## Pages / Current State
| Route | File | Status |
|---|---|---|
| `/` | `src/app/page.tsx` | Built and actively refined |
| `/rentals/` | `src/app/rentals/page.tsx` | Built and actively refined |
| `/about-us/` | `src/app/about-us/page.tsx` | Built and actively refined |
| `/contact-us/` | `src/app/contact-us/page.tsx` | Built and actively refined |
| `/privacy-policy/` | `src/app/privacy-policy/page.tsx` | Built |
| `/terms-conditions/` | `src/app/terms-conditions/page.tsx` | Built |
| `/product/[slug]` | `src/app/product/[slug]/page.tsx` | Built |
| `/book/[slug]` | `src/app/book/[slug]/page.tsx` | Prototype built |
| `/checkout` | `src/app/checkout/page.tsx` | Shell built |

## Existing Live Site Copy
All copy has been extracted from the live site. Key content:

**Homepage sections:**
- Hero: "Kids Jump. You Relax. We Handle the Rest."
- Sub: "They'll jump, laugh, and burn off all that energy – leaving you to soak in the quiet victory."
- Pricing from: R700 for the whole weekend
- 6 benefit cards (chaos to calm section)
- 3 testimonials (Michelle, Marilu, Chante — all Fourways)
- 3-step how it works: Choose → Fun Begins → Enjoy Your Day
- Trust strip: Free Delivery to Fourways / Secure Payment / SABS Quality Check

**About page:** Parent-written, relatable, funny — tone is "we're parents too, we get it"

**Contact page:** WhatsApp + form, lists delivery pricing, operating hours

## Current Funnel / CTA Pattern
- Primary CTA language across key pages:
  `Rent Online Now`
- Secondary CTA language across key pages:
  `Speak to Us on WhatsApp`
- Homepage hero:
  primary CTA scrolls to the homepage product section
- About hero:
  primary CTA scrolls to the About page product section
- Homepage/About product cards:
  images + CTA go to product detail pages
- Rentals page cards:
  primary CTA goes directly to `/book/[slug]`
  secondary CTA goes to product detail pages
- Product pages:
  primary CTA goes directly to `/book/[slug]`
  secondary CTA goes to WhatsApp

## Booking Flow Snapshot
- Booking UI lives at:
  `src/app/book/[slug]/page.tsx`
- Calendar is custom-built in-page, not native-only anymore
- Current date rules:
  weekends selectable by default,
  weekdays blocked by default,
  holiday exceptions allowed,
  additional hard-coded blocked dates per product still apply
- Checkout shell lives at:
  `src/app/checkout/page.tsx`
- Important:
  availability is still mocked locally and booking is not yet persisted

## Tech Rules
- **No Tailwind** — vanilla CSS only
- **No `next/font/google`** — fonts via CSS @import
- Prefer shared tokens in `globals.css`, but the current codebase already includes page-level hardcoded values in several CSS files; do not assume token purity
- The site no longer treats WhatsApp as the only primary CTA:
  online rental is now actively promoted, with WhatsApp as the support path
- **WooCommerce REST API is auth-gated** — if no API keys available, use static product data
- Real booking persistence/payment still deferred beyond the current prototype phase

## Environment Variables (.env.local)
```
WORDPRESS_API_BASE_URL=https://heavenlygiggles.com/wp-json/wp/v2
NEXT_PUBLIC_GTM_ID=GTM-NFFQ5DJC
NEXT_PUBLIC_WHATSAPP=27828828864
```

WooCommerce handoff is also now scaffolded locally with env vars for:
- `WOOCOMMERCE_API_URL`
- `WOOCOMMERCE_CHECKOUT_URL`
- `WOOCOMMERCE_CONSUMER_KEY`
- `WOOCOMMERCE_CONSUMER_SECRET`

Local integration has already been tested successfully against the live Heavenly Giggles WooCommerce backend.

## Infrastructure (for when deployment comes)
- Same stack as Digital Growth Spring: GitHub → Vercel → Cloudflare
- WordPress stays on Cloudways
- Will need `wp.heavenlygiggles.com` subdomain created before DNS cutover
- WordPress `siteurl` must be updated to wp subdomain BEFORE cutting DNS over
- PayFast is the payment gateway (for Phase 2)

Important distinction:
- current local testing can safely use the live public domain as the backend while WordPress still owns that domain
- deployed production cannot keep using the public domain for backend/API assumptions once Next.js takes over the frontend domain
- this distinction is captured in `WP_TO_NEXTJS_WORKFLOW.md`

## What NOT to Do
- Do not touch the live WordPress site during local build
- Do not reintroduce the old rental plugin flow
- Do not set up GitHub/Vercel yet — local first, deploy when site is ready
- Do not add features not on the original site without checking with the user
