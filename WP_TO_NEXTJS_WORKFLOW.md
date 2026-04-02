# WordPress to Next.js Conversion Workflow

Updated from lessons on Digital Growth Spring and Heavenly Giggles.

This is the repeatable workflow for rebuilding a WordPress site in Next.js while keeping WordPress as the CMS and WooCommerce/backend where needed.

## Core Rule

Preserve the live public URL structure from the start.

Do not change slugs, nesting, or major page paths unless there is an approved redirect plan.

## The Big Infrastructure Rule

There are two distinct phases:

1. Build and test while the live public domain still points to WordPress.
2. Cut over the public domain to Next.js only after WordPress has been moved behind a backend subdomain such as `wp.domain.com`.

This avoids the main migration mistake:

- local and pre-launch testing can safely use the live domain as the backend
- production launch cannot keep using the public domain as the backend once the frontend takes over that domain

## Step-by-Step Workflow

### Step 1. Audit the live site before building

- inventory every public URL
- identify the homepage owner and any nested route patterns
- list plugin-driven functionality
- confirm forms, CRM, analytics, legal pages, and payment flows
- confirm hosting, DNS, CDN, backups, and security stack
- confirm where secrets are stored and who controls DNS/Vercel/GitHub

Deliverable:

- a route map for every live public URL
- a functionality inventory
- a list of integrations and owners

### Step 2. Choose the architecture explicitly

Decide and document:

- `REST` for faster retrofit launches, or `WPGraphQL` for long-term standardization
- which pages will be native Next.js pages
- which standard content pages can use a shared WP-backed shell
- which flows remain WordPress-backed in Phase 1

For WooCommerce projects:

- Next.js should usually own the booking or product UX
- WooCommerce should usually own orders, payment lifecycle, and admin operations

### Step 3. Record the domain plan before any deployment work

Write this down early, even if cutover is weeks away:

- public frontend domain: `domain.com` or `www.domain.com`
- backend WordPress domain: `wp.domain.com`
- canonical domain choice: apex or `www`
- where WooCommerce payment pages will live after cutover

Important:

- before cutover, local development may still point APIs to `https://domain.com/...`
- after cutover, API and backend traffic must point to `https://wp.domain.com/...`

### Step 4. Build locally against the current WordPress site

While the live site still points to WordPress, it is acceptable to use the live domain as the backend for local work:

- `WORDPRESS_API_BASE_URL=https://domain.com/wp-json/wp/v2`
- WooCommerce REST endpoints on `https://domain.com/wp-json/...`
- WooCommerce payment pages on `https://domain.com/checkout/order-pay/...`

This phase is for:

- rebuilding the frontend
- testing content fetches
- testing order creation
- testing payment handoff

Do not confuse this with the final production setup.

### Step 5. Rebuild the critical user journey first

Recommended order:

1. shared layout, navigation, footer
2. homepage or primary landing page
3. key conversion flow such as booking, lead form, or questionnaire
4. checkout or handoff flow
5. standard content pages
6. legal pages
7. analytics and integrations

Rules:

- do not ship dead CTA buttons
- test mobile spacing and header behavior early
- use shared design tokens, not one-off styling values

### Step 6. Wire real integrations locally

Before deployment, confirm:

- GTM is the single analytics entry point if already installed
- forms really submit to CRM or email platform
- WooCommerce order creation works
- payment handoff works
- secrets live in local `.env` files or provider dashboards, never in chat

For WooCommerce:

- create pending orders from Next.js
- pass booking metadata into the WooCommerce order
- use WooCommerce and its gateway for payment flow
- avoid building a separate custom payment stack unless there is a strong reason

### Step 7. Validate the local-to-live backend flow

Before any cutover planning, verify this path:

- local Next.js frontend
- live WordPress or WooCommerce backend
- live order creation or form submission
- live payment handoff if required

This proves the business workflow works before deployment complexity is added.

### Step 8. Prepare the backend split before launch

Before the public domain moves to Next.js:

- create `wp.domain.com`
- add it in the WordPress host or Cloudways domain manager
- issue SSL for `wp.domain.com`
- update WordPress `siteurl` and `home` as needed for the backend plan
- confirm `https://wp.domain.com/wp-json/...` returns valid JSON
- confirm WooCommerce backend paths still work as intended on the backend host

This is the key cutover-prevention step.

Do not launch the Next.js frontend on the public domain until this backend split is working.

### Step 9. Swap environment variables to the backend domain

Before production testing on the deployed frontend, change:

- `WORDPRESS_API_BASE_URL` to `https://wp.domain.com/wp-json/wp/v2`
- WooCommerce API endpoints to `https://wp.domain.com/...` where appropriate
- any hardcoded backend fallbacks in code to the backend host, not the public host

Then deploy again and verify the deployed app is actually using the backend hostname.

### Step 10. Deploy deliberately

Preferred sequence:

1. push code to GitHub
2. import into Vercel
3. add environment variables in Vercel
4. confirm latest deployment is `Ready`
5. attach the production domain in Vercel
6. update DNS in the actual DNS provider
7. wait for SSL
8. run full launch QA

Checks:

- use Vercel as the source of truth for domain targets
- keep mail-related DNS records untouched
- check runtime logs if the deployed site still hits the wrong backend hostname

### Step 11. Run pre-launch QA on the deployed site

Check:

- homepage and key CTAs
- form submissions
- booking or checkout flow
- legal links
- analytics
- metadata and canonicals
- redirects
- mobile layout and header spacing
- backend API calls hit `wp.domain.com`, not the public frontend domain

### Step 12. Cut over and monitor

Once the deployed site is verified:

- point the public domain to Next.js
- confirm SSL and redirects
- confirm the backend remains reachable at `wp.domain.com`
- monitor orders, forms, analytics, and console/runtime errors

## What We Learned to Do Earlier

These items now need to happen earlier in the process, not as launch-week fixes:

- define the backend subdomain plan before deployment work starts
- treat local testing on the live domain as temporary, not final architecture
- verify live order creation before spending time on polish
- remove hardcoded public-domain backend fallbacks before launch
- separate "works locally" from "safe after DNS cutover"

## Quick Default Pattern

For most WP to Next.js conversions, the default pattern should be:

1. audit the live site
2. preserve public URLs
3. build locally against the existing WordPress domain
4. validate real integrations locally
5. create `wp.domain.com`
6. move backend/API assumptions to `wp.domain.com`
7. deploy Next.js
8. test the deployed app against `wp.domain.com`
9. cut over the public domain

## Heavenly Giggles Note

Right now Heavenly Giggles is still in the temporary build/testing phase:

- local frontend
- live WordPress and WooCommerce backend on `heavenlygiggles.com`

Before launch, this must become:

- public frontend on `heavenlygiggles.com`
- backend WordPress and WooCommerce on `wp.heavenlygiggles.com`
