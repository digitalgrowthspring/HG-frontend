# Heavenly Giggles — NotebookLM Intelligence Hub

- **Notebook:** Heavenly Giggles Intelligence Hub
- **Notebook ID:** 93d6f14e-5cfa-428b-9b3e-0412ac1c28f5
- **URL:** https://notebooklm.google.com/notebook/93d6f14e-5cfa-428b-9b3e-0412ac1c28f5
- **Last updated:** 2026-04-03

## Sources Added
- **Project Overview — Business, Products & Brand**
- **Tech Stack & Design System**
- **Pages — Build Status & Structure**
- **Agency Context, Conventions & What NOT to Do**
- **Workspace Session Summary — 2026-04-03**
- **CLIENT.md — Brand & Tech Stack**
- **CONTEXT.md — Full Project Context & Infrastructure**
- **STATUS.md — Current Phase & Next Steps**
- **DECISIONS.md — Permanent Decisions Log**
- https://heavenlygiggles.com/
- https://heavenlygiggles.com/rentals/
- https://heavenlygiggles.com/about-us/
- https://heavenlygiggles.com/contact-us/

## Notes
Created a canonical master hub on 2026-04-03 by consolidating the older `HG Migration` and `Heavenly Giggles Web Copy` notebooks.
Update `STATUS.md` in this notebook at the end of every meaningful session.
Only replace `CONTEXT.md` when durable project context changes materially.
If context pressure is high, treat it like session end and sync before continuing in a fresh session.

## Latest Handoff Notes
- The public site is now live on Next.js at `https://heavenlygiggles.com`
- WordPress and WooCommerce are now live on `https://wp.heavenlygiggles.com`
- Vercel deploys from GitHub repo `digitalgrowthspring/HG-frontend` with `frontend` as the Root Directory
- `frontend/vercel.json` was added after Vercel initially returned a platform `404: NOT_FOUND`
- Checkout now creates WooCommerce orders on the backend host and hands off into PayFast through WooCommerce
- 2026-04-03: local MCP config was updated to use the new writable Google Drive MCP server and the shared Google token was refreshed to full Drive scope
- Post-launch cleanup still needed:
  sever the public-facing old WordPress frontend on `https://wp.heavenlygiggles.com/`
  while keeping admin, API, media, and WooCommerce payment/order routes working
- Updated migration-process learnings are captured in `WP_TO_NEXTJS_WORKFLOW.md`
- For a fresh Codex session, read:
  `STATUS.md`, `CONTEXT.md`, `notebooklm.md`, `WP_TO_NEXTJS_WORKFLOW.md`
- Legacy notebooks retained for reference:
  `HG Migration` — https://notebooklm.google.com/notebook/3c6aa6f3-6b7f-46a9-b9f2-e9a2fc04a5d9
  `Heavenly Giggles Web Copy` — https://notebooklm.google.com/notebook/f81ef019-ba42-44f9-b83d-5266f500781d
