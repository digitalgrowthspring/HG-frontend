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
- Booking and checkout UX have been significantly refined locally and are in a solid prototype state
- WooCommerce order creation from the local Next.js checkout has been tested successfully against the live Heavenly Giggles domain
- Current local integration setup is:
  local Next.js frontend + live Heavenly Giggles WordPress/WooCommerce backend
- Before public launch, WordPress and WooCommerce still need to move behind `wp.heavenlygiggles.com`
- Updated migration-process learnings are captured in `WP_TO_NEXTJS_WORKFLOW.md`
- For a fresh Codex session, read:
  `STATUS.md`, `CONTEXT.md`, `notebooklm.md`, `WP_TO_NEXTJS_WORKFLOW.md`
