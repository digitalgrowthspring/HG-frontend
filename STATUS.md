# Heavenly Giggles — Project Status

## Current Phase
**Phase 1.6 — UX Funnel + Booking Prototype (In Progress)**
Core marketing pages are rebuilt locally and aligned to the Heavenly Giggles design system. The current focus is polishing the browse → product → booking funnel, while keeping the first custom booking/calendar flow in place for the eventual payment + availability backend.

## Dev Server
Running at http://localhost:3002
Start with: `cd frontend && npm run dev`

## Next Session Handoff
- First read:
  `STATUS.md`, `CONTEXT.md`, `notebooklm.md`, `WP_TO_NEXTJS_WORKFLOW.md`
- Deployment note:
  because the app lives in `/frontend`, Vercel must use `frontend` as the Root Directory,
  and `frontend/vercel.json` was added to force explicit Next.js detection after Vercel first returned a platform `404: NOT_FOUND`
- Current high-value context:
  local booking and checkout UX are in a good place,
  WooCommerce order handoff from Next.js has been scaffolded and tested successfully against the live Heavenly Giggles domain,
  and the current live-domain setup is acceptable for local integration testing only
- Important infrastructure distinction:
  right now local Next.js can talk to `heavenlygiggles.com` for WP/WooCommerce,
  but before launch WordPress and WooCommerce must move behind `wp.heavenlygiggles.com`
- Important implementation note:
  `frontend/src/lib/wordpress.ts` still has a hardcoded public-domain fallback and must be updated before cutover
- Current process lesson:
  separate these three states clearly:
  `works locally`,
  `works locally against the live backend`,
  `safe after DNS cutover`
- NotebookLM note:
  the notebook exists and the local notebook docs are current,
  but direct NotebookLM MCP access depends on Codex being started with the `notebooklm` MCP configured

## What's Been Done
- [x] Project scaffolded from Digital Growth Spring clone
- [x] DGS-specific pages stripped (wellness, academy, questionnaire)
- [x] Design tokens rebuilt for Heavenly Giggles light/teal-pink brand direction — `globals.css`
- [x] Fonts set — Fredoka (headings) + Nunito (body) via CSS @import
- [x] `src/lib/seo.ts` updated — SITE_NAME, SITE_URL, description
- [x] `src/app/layout.tsx` metadata updated
- [x] `.env.local` created — GTM, WhatsApp, WordPress API base URL
- [x] `node_modules` installed
- [x] Navigation component — HG text logo, links (Rentals, About, Contact), WhatsApp CTA button
- [x] Header refined — larger logo, solid header background, palette-aligned WhatsApp button
- [x] Site-wide wand cursor/trail effect added and tuned
- [x] Footer rebuilt — tighter layout, cleaner quick links, one-line slogan treatment
- [x] Homepage (`src/app/page.tsx`) rebuilt to match live-site flow:
  hero → benefits → fun highlights → planning steps → testimonials → final booking/product section
- [x] Homepage CSS (`home.css`) rebuilt to a cleaner live-inspired marketing layout
- [x] Hero image updated to `little-girl-sitting-on-jumping-castle.webp`
- [x] Hero trust strip fixed to render as 3 columns on desktop
- [x] Hero headline locked to two lines:
  `Kids Jump. You Relax.`
  `We Handle the Rest.`
- [x] Final booking/product cards now use real product photos from live product pages
- [x] Testimonials now use real customer headshots from live site media
- [x] Homepage CRO/UX pass completed:
  stronger CTA copy, tighter hero spacing, darker glass sections for readability, cleaner trust/USP placement
- [x] Terms page lint issue fixed — internal privacy link now uses `next/link`
- [x] `/about-us/` rebuilt in the same visual language as the homepage
- [x] `/contact-us/` rebuilt in the same visual language as the homepage/About page, including delivery cards and map section
- [x] `/privacy-policy/` and `/terms-conditions/` rebuilt with Heavenly Giggles branding and matching legal-page styling
- [x] `/rentals/` page redesigned to match the site system:
  hero, trust bar, product cards, booking/delivery info
- [x] `rentals.css` rebuilt to the current responsive marketing layout
- [x] Internal product routes created for the 3 rental products:
  `/product/standard-jumping-castle-4m-x-4m`
  `/product/jumping-castle-slide-7m-x-4m`
  `/product/inflatable-water-slide-7m-x-1m`
- [x] Dynamic product page template added at `src/app/product/[slug]/page.tsx`
- [x] Shared product content/data source added at `src/app/rentals/products.ts`
- [x] Standard Jumping Castle product page significantly refined:
  internal product route wired up, product-specific hero copy added, homepage-aligned CTA/spacing treatment applied, white benefits section rebuilt with titled cards, and practical `Additional Info` / `Rental Info` sections added
- [x] First-pass custom booking route added at `src/app/book/[slug]/page.tsx`
- [x] Initial booking helper added at `src/lib/booking.ts`
- [x] Booking page upgraded from native date input to a custom in-page calendar UI
- [x] Booking rules now support:
  weekend-first booking,
  weekday blocking by default,
  holiday exceptions,
  mocked per-product blocked dates,
  immediate availability messaging,
  area + delivery notes capture,
  handoff into checkout via query params
- [x] Checkout shell added at `src/app/checkout/page.tsx` and reads:
  product slug, selected date, area, and notes from the booking step
- [x] Missing checkout stylesheet restored and checkout page converted to server `searchParams`
- [x] Shared rental product data now has an explicit `RentalProduct` type
- [x] Product-page primary CTA now routes to local `/book/[slug]`
- [x] Product-page secondary CTA now points to WhatsApp support
- [x] Homepage, About, Rentals, Contact, and product-page CTA language aligned around:
  `Rent Online Now` + `Speak to Us on WhatsApp`
- [x] Homepage and About hero primary CTAs now scroll to product sections instead of adding an extra page hop
- [x] Homepage/About product-card buttons now act as product-detail links
- [x] Rentals cards now split intent clearly:
  primary = direct to `/book/[slug]`
  secondary = product details
- [x] Product images on homepage, About, and Rentals cards now link through to product detail pages
- [x] Homepage step blocks now use distinct per-row colour treatments
- [x] About page story section significantly refined:
  story-card layout, softer visual tone, improved copy flow, more parent-first narrative
- [x] About page promise panel removed and replaced with repeated product cards
- [x] Contact page hero and “Find Us” CTA blocks now follow the same dual-CTA pattern as the rest of the site
- [x] Booking flow is styled and navigable locally, but is not yet connected to real payment or persisted availability
- [x] Trust bar (USP) icons made glass style (rgba white, backdrop-filter) site-wide — no coloured gradient icons
- [x] About page “Our Story” section redesigned: centred section header + 3-column card grid with coloured top borders, icon badges, and short benefit-led copy
- [x] Checkout page restructured to match site pattern: teal dot-grid hero + white form shell
- [x] Checkout cards set to equal height (align-items: stretch + flex-direction: column on sidebar)
- [x] Checkout wand/stick CSS artefacts removed (diagonal pseudo-element decorations stripped)
- [x] NotebookLM knowledge base created: “HG Migration” notebook with 6 sources covering full project context, status, and conventions
- [x] Mobile optimisation pass completed across all pages:
  - Container padding increased from 1rem → 1.25rem at 600px breakpoint (prevents card shadow clipping at viewport edge)
  - product-info-card min-height (19rem) now resets to 0 at 900px when cards stack
  - checkout-hero padding-top now resets at 600px (matches all other hero sections)
  - Trust bar USP items now left-align (justify-content: flex-start) at 900px on rentals, product, and contact pages
- [x] `next.config.ts` — remotePatterns for heavenlygiggles.com images
- [x] `sitemap.ts` updated to HG routes and internal product URLs
- [x] WP page fallback (`[slug]/page.tsx`) — stripped of DGS dependencies
- [x] `CONTEXT.md` written for new agent onboarding
- [x] WooCommerce checkout handoff scaffolded in Next.js:
  checkout form component, server-side validation, WooCommerce-ready API route, and env placeholders for order creation + payment redirect
- [x] WooCommerce live-domain handoff verified locally:
  Next.js checkout can create a pending WooCommerce order on the live site and return a valid `order-pay` URL
- [x] Reusable migration workflow added:
  `WP_TO_NEXTJS_WORKFLOW.md` now captures the updated WP → Next.js process, including onboarding/brand context and the backend subdomain split lesson

## What's Next (in order)
- [ ] Decide booking model clearly in code and copy:
  single event/delivery date vs explicit weekend rental span shown in the booking UI
- [ ] Move blocked dates from hard-coded mock data to a real persistence layer / backend source of truth
- [ ] Validate the booking step and checkout step end-to-end so users cannot reach checkout with invalid or missing booking data
- [ ] Connect the new checkout handoff to real WooCommerce credentials/endpoints and verify PayFast redirect
- [ ] On successful booking/payment, write back confirmed dates so availability blocks out automatically
- [ ] Decide the final WooCommerce/WordPress backend URL pattern for launch:
  current live-domain testing is fine locally, but deployed production must use `wp.heavenlygiggles.com`
- [ ] Final CTA/copy consistency pass across homepage/About/Rentals/Contact/Product pages
- [ ] Once booking flow is stable, resume final consistency/SEO pass
- [ ] GitHub repo → Vercel deploy

## Deferred (Phase 2)
- PayFast payment integration
- WooCommerce API keys — for product images/data (static data used for now)
- Mailchimp tagging on enquiry

## Booking Flow Snapshot
- Main product CTA is now routed into the local booking flow:
  `src/app/product/[slug]/page.tsx` sends the primary CTA to `/book/[slug]`
- The local booking route is:
  `src/app/book/[slug]/page.tsx`
- The booking helper/source of truth is currently:
  `src/lib/booking.ts`
- Current availability behavior:
  weekends are bookable by default, weekdays are blocked unless listed as holiday exceptions, and hard-coded blocked dates are still checked client-side only
- Current checkout behavior:
  `src/app/checkout/page.tsx` now uses a real checkout form and API handoff, but successful payment and booking persistence are still not connected end-to-end
- Important limitation:
  a date can look available in the UI, but nothing is actually locked or reserved until a real backend/payment integration is added
- Design direction:
  custom booking flow, no rental plugin reintroduced
- Recommended implementation order:
  1. define/store real availability
  2. connect booking submission/payment
  3. block out confirmed dates automatically
  4. tighten booking validation and status states
  5. smooth the mobile UX once real data is in

## Key Decisions Made
- Site CTA pattern is now:
  primary = `Rent Online Now`
  secondary = `Speak to Us on WhatsApp`
- Homepage/About hero primary CTA should reduce friction by scrolling to products before deeper page hops
- No Tailwind — vanilla CSS only, all values via tokens in globals.css
- Homepage direction reset away from heavy app-like / dark UI experiments
- Current direction follows the live-site structure first, with only subtle visual polish layered on
- Static product data (3 SKUs) — WooCommerce REST API is auth-gated, defer until keys available
- Rental plugin (WCRP) stripped — custom calendar from scratch in Phase 2
- 3 products: Standard Castle R700, Castle & Slide R900, Water Slide R800
- Product pages are being rebuilt as internal Next.js pages styled to match the core site, rather than relying on old WordPress product-page patterns
- Product-page refinement is being done one SKU at a time, starting with Standard Jumping Castle before applying the same structure to the other products
- Booking flow has now started locally, but availability is still mocked and checkout is still non-persistent
- Browse flow now intentionally distinguishes:
  marketing browse sections → product detail pages,
  product pages → booking flow,
  Rentals page → direct booking shortcut plus detail fallback
