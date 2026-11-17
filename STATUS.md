# Heavenlygiggles — STATUS

## Naming
- Use `Memory.Wiki.md` for client-vs-task alias resolution.
- Keep the umbrella client/project name distinct from task aliases like dashboards, ports, planners, and runtime folders.

## Current Phase
Live — Post-Launch Refinement. Notebook ID: 93d6f14e-5cfa-428b-9b3e-0412ac1c28f5

## Current Objective
Redesign the public site locally (homepage, rentals, product pages) and get your sign-off before committing or pushing.

## Current State (2026-11-06)
- Live on `main` at `b42bc40`. Vercel build passed.
- **Contact details:** WhatsApp +27 82 771 3949 and ryan@heavenlygiggles.com are live. `NEXT_PUBLIC_WHATSAPP` is updated in Vercel.
- **Product images fixed:** `wp.heavenlygiggles.com` returned 526. A Let's Encrypt certificate is installed in Cloudways (expires 2027-02-04).
- **Payment 404 fixed, not proven with a real payment:** a `template_redirect` block at the bottom of the Thrive theme's `functions.php` sent every WordPress page to the main site, including `/checkout/order-pay/`. It now exempts `order-pay` and `order-received`. The Cloudways rewrite rule on `/` was deleted because it also caught PayFast's `/?wc-api=` address and WordPress's save check.
- **Checkout:** `/api/checkout` now uses WooCommerce's `payment_url`, with the order ID in the fallback path. New orders show hire dates on the order line and in the customer note.
- **Double-booking fix is local only, uncommitted:** `frontend/src/lib/bookedDates.ts`, `lib/useBookedDates.ts`, `app/api/availability/route.ts`, plus edits to the checkout route, `ProductBookingCard`, `RentalQuickBook` and `book/[slug]/page.tsx`. It blocks paid orders only. Tested against live orders, typecheck and lint clean, calendar not yet seen in a screenshot. Until it ships, every future date shows as available.
- Rental Products (Kestrel) is still active in WordPress. Our orders are fee lines, so they do not reach it.

## Open
- Run a test booking through to PayFast. Test the payment link on #1141 first. Confirm a paid order leaves Pending.
- **Alice:** #1135-#1137, water slide for 6-9 Nov (this weekend), never paid because of the fault. Contact her first thing.
- **Sarah Da Silva:** #1139, #1140, #1142. Send a payment link with her 10% discount. Lower the fee on the order, because coupons do not apply to fee lines. Check her date first, it may clash with Alice's. Pending water slide dates are 6-9 Nov and 4-7 Dec.
- **Richard Woodland:** #1131-#1133, Standard Castle 4-7 Sep, date passed. Cancel and apologise.
- Cancel the duplicate orders.
- Remove `169.1.176.5` from the Cloudways allow list.
- Decide on pushing the double-booking fix. Bookings calendar page parked by Ryan.
- Later: move the redirect out of the theme file, and decide what happens to Rental Products.

## Quotes (2026-11-17)
- Live on `main` at `77a04d9`: branded quote page (one A4 page when printed, logo, no site header), checkout accepts a quote and prefills the client's details, and the quote links work on heavenlygiggles.com.
- The quote builder is local only (`localhost:4002/quote`). It is hidden on the live site, so `heavenlygiggles.com/quote` returns 404 on purpose, until sign-in is built.
- Quotes go out as the long link. The date is not held until payment, and the link expires after 2 days.
- Not built or switched on: WooCommerce quote orders (`WOO_QUOTE_ORDERS` is off), the 2-day date hold, short `/q/` links, and sign-in.
- Secret: `QUOTE_SECRET` is set in Vercel (Production) and in the local env file. Its value is not recorded here.
- Open questions: hide "Change dates" on quote checkout; add EFT bank details to the quote if EFT is taken.
- Full list in `ROADMAP.md`.

## Analytics (2026-11-15)
- GA4 shows events but no page views. Cause: the Stape server container (GTM-NJC4VDKH) was Disabled because the Free plan had expired. Renewed on 2026-11-15, now Updating on the Free monthly plan (301 of 10,000 requests, valid till 15 Dec 2026).
- **Not yet verified:** page views reaching GA4 again. Next: confirm the container shows Active, then check GA4 Realtime and the GTM server Preview for `page_view`.
- Details in `CONTEXT.md` under Durable Assumptions.

## Active Decisions
- The wand cursor (yellow line) stays.
- Logo, header and heading changes apply site-wide.

## Blockers
- Nothing committed or pushed until you sign off the whole site.
- Gemini is also editing `src/app/rentals/`; it may overwrite parts of it.

## Exact Next Step
- Test the payment link on #1141, then message Alice and Sarah.
- Site redesign: decide the Standard castle headline ("They Bounce. You Relax." or keep current), then apply or skip the suggested product intro copy.
- Check the booking wording ("pay securely online", "We confirm every booking on WhatsApp") matches the real process.
- Once no agent is editing: one `npm run build`, one test booking, then commit in stages and push.

## Session Summary (2026-11-08, local, uncommitted)

- **Homepage:** redesigned locally. Section order: hero, trust strip, rentals, benefits (teal band, six cards), how it works, photos, reviews, final CTA. Last pushed commit is still `55eba41`.
- **Rentals:** rebuilt on the homepage styles. Gemini is also working in `src/app/rentals/` and may overwrite parts of it.
- **Product pages:** template rebuilt. Each page shows its own headline, intro, six benefits from product data, reviews, a teal benefits band, and a hero with a date picker and WhatsApp side by side. The calendar opens over the content. The closing CTA is removed on product pages only.
- **Water slide headline:** "They Slide. You Unwind." is applied.
- **Standard castle headline:** still "They Get to Bounce. You Get to Chill." The change to "They Bounce. You Relax." was rejected mid-edit and not applied.
- **Open copy:** the suggested product intros were pasted but not applied. The "From R700/R800/R900" lines stay as they are.
- **Open decision:** the wand cursor (yellow line) stays, per your call.
- **Not done:** nothing is committed or pushed. Waiting for sign-off on the whole site.
- **Shared files:** `home.css` and `globals.css` affect every page. Logo, header and heading changes are site-wide.
