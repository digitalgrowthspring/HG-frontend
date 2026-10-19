# Heavenlygiggles — Context

## Naming
- Use `Memory.Wiki.md` for client-vs-task alias resolution.
- Keep the umbrella client/project name distinct from task aliases like dashboards, ports, planners, and runtime folders.

## Overview
Heavenly Giggles hires out jumping castles and inflatable water slides in Fourways, Johannesburg, mainly for kids' parties. The website sells rentals by weekend. Parents book by WhatsApp. Phase: live, post-launch refinement.

## Infrastructure
- Domains: heavenlygiggles.com (website), wp.heavenlygiggles.com (WordPress/WooCommerce backend, not public-facing)
- Repos: github.com/digitalgrowthspring/HG-frontend, branch `main`, Vercel Root Directory `frontend/`
- Hosting: Vercel project `hg-frontend` (website), Cloudways (WordPress and WooCommerce)
- Integrations: WhatsApp (+27 82 822 8864) for bookings and checkout, WooCommerce for payment, Google Tag Manager

## Working Conventions
- Primary handoff file: `STATUS.md`
- Permanent decisions log: `DECISIONS.md`
- Notebook pointer: `notebooklm.md`
- Client brief and product/price table: `CLIENT.md`

## Durable Assumptions
- A push to `main` on GitHub deploys to production on Vercel straight away. Test on a branch first.
- The WooCommerce rental plugin has been removed. The rental pages stay, with a date picker that is part of the live site (`frontend/src/components/ProductBookingCard.tsx`).
- Checkout runs through WhatsApp. WooCommerce stays in place so payment still works. Confirm the payment gateway before changing anything in WooCommerce.
- Production matches `main`. The live site was last deployed from commit `6da88fb`.
- Product data is static (3 products). The WooCommerce REST API is auth-gated, so the website does not read products from it.
