# Heavenly Giggles — NotebookLM Intelligence Hub

- **Notebook:** HG Migration
- **Notebook ID:** 3c6aa6f3-6b7f-46a9-b9f2-e9a2fc04a5d9
- **URL:** https://notebooklm.google.com/notebook/3c6aa6f3-6b7f-46a9-b9f2-e9a2fc04a5d9
- **Last updated:** 2026-04-02

## Sources Added

1. **Project Overview — Business, Products & Brand** — business model, 3 SKUs, pricing, brand positioning, hero line, dual audience
2. **Tech Stack & Design System** — Next.js 16.2.1, vanilla CSS, design tokens, card/button patterns, font rules
3. **Pages — Build Status & Structure** — all pages, build status, component list, Phase 2 deferred items
4. **Agency Context, Conventions & What NOT to Do** — section patterns, trustbar rules, mobile breakpoints, hard rules
5. **STATUS.md — Current Build Progress & Decisions** — full checklist of what's done, what's next, booking flow architecture, key decisions
6. **CONTEXT.md — Full Project Context & Infrastructure** — folder structure, live site copy, CTA pattern, deployment plan, environment variables

## Notes
Created 2026-04-02 to give every session full project context without re-reading all files.
Update this notebook whenever significant decisions are made (new pages, design changes, deferred items resolved).

## Latest Handoff Notes
- The public site is now live on Next.js at `https://heavenlygiggles.com`
- WordPress and WooCommerce are now live on `https://wp.heavenlygiggles.com`
- Vercel deploys from GitHub repo `digitalgrowthspring/HG-frontend` with `frontend` as the Root Directory
- `frontend/vercel.json` was added after Vercel initially returned a platform `404: NOT_FOUND`
- Checkout now creates WooCommerce orders on the backend host and hands off into PayFast through WooCommerce
- Post-launch cleanup still needed:
  sever the public-facing old WordPress frontend on `https://wp.heavenlygiggles.com/`
  while keeping admin, API, media, and WooCommerce payment/order routes working
- Updated migration-process learnings are captured in `WP_TO_NEXTJS_WORKFLOW.md`
- For a fresh Codex session, read:
  `STATUS.md`, `CONTEXT.md`, `notebooklm.md`, `WP_TO_NEXTJS_WORKFLOW.md`
