# Heavenly Giggles — Roadmap

## Naming
- Use `Memory.Wiki.md` for client-vs-task alias resolution.
- Keep the umbrella client/project name distinct from task aliases like dashboards, ports, planners, and runtime folders.


**Agency:** Antigravity
**Last updated:** 2026-11-17

---

## Campaign Status

`🔜 Planned` — on the roadmap, work not started
`🟡 In Progress` — work underway
`🟢 Live` — running

---

## Campaigns

### 🟢 Quotes for clients (live, local-only builder)

**Why:** Customers ask for a quote before booking. A quote lets us agree a price and send a link to pay.

**Done:**
- [x] Branded quote page, printable on one A4 page, with logo (live)
- [x] Quote link carries signed prices and expires after 2 days (live)
- [x] Checkout accepts a quote and prefills the client's details (live)
- [x] Builder creates the quote and the long link on the local machine
- [x] QUOTE_SECRET set in Vercel (Production) and locally

**Next steps:**
- [ ] Sign-in (Supabase) so the builder can run on the live site
- [ ] Save quotes in WooCommerce as pending orders (switch on `WOO_QUOTE_ORDERS` after one approved test order)
- [ ] Hold the weekend for 2 days on quote orders, release when unpaid
- [ ] Short quote links (`/q/<code>`) once quotes are stored online
- [ ] Hide "Change dates" on the quote checkout
- [ ] Automatically cancel expired pending quote orders
- [ ] Decide whether to add EFT bank details to the quote

---

### 🔜 Analytics clean-up

**Why:** GA4 shows events but no page views, because the Stape server container was disabled.

**Next steps:**
- [ ] Confirm the Stape container shows Active
- [ ] Confirm page views in GA4 Realtime and GTM server Preview
- [ ] Stape Free plan renews 15 Dec 2026, decide before then

---

## Notes

- The builder is hidden on the live site until sign-in is built. Quotes go out from the local machine as long links.
- Pushing to `main` deploys straight to the live site. Commit only the files for the work being shipped.
- Stape Free plan allows 10,000 requests a month and does not renew mid-cycle once the limit is hit.
