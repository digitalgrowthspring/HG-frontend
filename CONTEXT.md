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
- Integrations: WhatsApp (+27 82 771 3949) for bookings, PayFast through WooCommerce for payment, Google Tag Manager (web container GTM-NFFQ5DJC, GA4 G-R86E69FCTS), server-side GTM (container GTM-NJC4VDKH, hosted on Stape, container `hbipztpo`)

## Working Conventions
- Primary handoff file: `STATUS.md`
- Permanent decisions log: `DECISIONS.md`
- Notebook pointer: `notebooklm.md`
- Client brief and product/price table: `CLIENT.md`

## Durable Assumptions
- A push to `main` on GitHub deploys to production on Vercel straight away. Test on a branch first.
- The site no longer uses the WooCommerce rental plugin, but Rental Products is still installed and active in WordPress. The rental pages stay, with a date picker that is part of the live site (`frontend/src/components/ProductBookingCard.tsx`).
- Bookings are confirmed on WhatsApp. Payment is PayFast through WooCommerce, so WooCommerce must stay in place for payment to work.
- Production matches `main`. Deploy by git push. The Vercel CLI upload fails here because of untracked local symlinks, and running it writes files into the repo.
- WordPress front-end pages redirect to the main site from a `template_redirect` block at the bottom of the Thrive theme's `functions.php`. `order-pay` and `order-received` are exempt and must stay exempt or payment breaks. A theme update would overwrite this block.
- Saving PHP in the WordPress file editor can trip the Imunify360 firewall on Cloudways. It logs under Application Security → Incidents and then challenges that IP. Allow the IP for the edit, then remove it.
- Booking dates are stored in hidden `_hg_booking_*` order fields. The hire is a fee line, so WooCommerce coupons do not discount it. Lower the fee on the order instead.
- Product data is static (3 products). The WooCommerce REST API is auth-gated, so the website does not read products from it.
- **Analytics depends on Stape. If GA4 shows no page views, check Stape first.** The GA4 tag in the web container sends hits to the server container (`server_container_url` = `{{Server URL}}`). When the Stape container is Disabled, page views stop reaching GA4 while some events still arrive. This happened on 2026-11-15: the Stape Free plan's "valid till" date (6 Feb 2026) had passed and the container showed Disabled. It was renewed the same day (Free monthly plan, valid till 15 Dec 2026). The Free plan allows 10,000 requests a month and does not renew mid-cycle once that is hit, so watch usage on the container page.
- **Renewal:** the Stape Free plan's validity runs to 15 Dec 2026. Before that date, confirm the container is Active. If it is not renewed, either upgrade or remove the server URL from the GA4 tag and publish.
