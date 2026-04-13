# Heavenly Giggles — Status

## Current Phase
**Live — Post-Launch Refinement.** Next.js at heavenlygiggles.com, WordPress/WooCommerce behind wp.heavenlygiggles.com.

## Session Update
- [x] Updated site-wide WhatsApp number to +27 82 822 8864
  - updated `frontend/.env.local`
  - updated hardcoded fallbacks and links in `Navigation.tsx`, `ProductBookingCard.tsx`, `HomePage`, `RentalsPage`, `AboutPage`, `ContactPage`, `TermsPage`, `PrivacyPage`
  - ensured all `wa.me` links use the correct international numeric format without spaces or plus signs
- [x] Consolidated Heavenly Giggles NotebookLM context into a new canonical `Heavenly Giggles Intelligence Hub`
  - merged the unique legacy migration notes from `HG Migration`
  - brought over the live website copy sources from `Heavenly Giggles Web Copy`
  - added the latest local `CLIENT.md`, `CONTEXT.md`, `STATUS.md`, and `DECISIONS.md`
  - repointed `notebooklm.md` to the new master notebook for future sessions
- [x] Replaced the stock read-only Google Drive MCP with a local writable server at `/Users/test/Documents/Antigravity/.BOH/google-drive-mcp/server.mjs`
- [x] Updated both workspace and client `.mcp.json` files to point at the writable server
- [x] Refreshed shared Google auth so `~/.antigravity/google/token.json` now has full `https://www.googleapis.com/auth/drive` scope
- [x] Verified the new Drive MCP server starts successfully with the refreshed token
- [x] Confirmed `~/.zshrc` auto-links new Antigravity folders to the shared root `.mcp.json`, which now includes `notebooklm` plus writable `gdrive`
- [x] Audited existing Antigravity project roots and `_Lab` subprojects; all active project folders now resolve `.mcp.json` back to the shared root config, including `_Lab/` itself
- [x] Updated shared agency rules so all agents now treat context-pressure like session end:
  sync `STATUS.md` every session / near-full context,
  sync `CONTEXT.md` only when durable project context changes materially,
  and record pending NotebookLM sync in `notebooklm.md` when MCP is unavailable
- [x] Implemented the memory rules into onboarding and local project files:
  `bootstrap_client.py` now generates the new NotebookLM handoff guidance,
  and this project's `AGENTS.md` / `notebooklm.md` now spell out the `STATUS.md` vs `CONTEXT.md` sync behavior
- [x] Remaining client Drive folder IDs were created/fetched and written into `.env` for:
  `DigitalGrowthSpring`, `Heavenlygiggles`, `Stacks`, and `ThomKight`
- [x] Added an automatic shell-exit handoff hook in `~/.zshrc`:
  real Antigravity project folders now auto-prepare `.tmp/notebook_sync/`
  and refresh project readiness state on shell exit
- [x] Cleaned messy client roots so they match the new project standard better:
  `DigitalGrowthSpring` loose scripts moved into `tools/`,
  loose images moved into `resources/images/`,
  and `ReadOverThis` deliverables, logos, and build script moved into
  `Deliverables/`, `resources/images/`, and `tools/` respectively
- [x] Applied the same root cleanup standard to messy `_Lab` projects:
  `CFS Revive` UI assets moved into `ui/`,
  `Weekly Reporting` dashboards moved into `Deliverables/` and raw exports into `data/raw/`,
  `LinkedIn Revenue Data` imports/samples/reports/debug scripts moved into
  `data/imports/`, `data/samples/`, `reports/`, and `tools/debug/`,
  and the affected Python paths were updated and compile-checked
- [x] Finished a client-wide subfolder cleanup pass:
  `DigitalGrowthSpring` frontend stray asset moved out of app root,
  `Heavenlygiggles` frontend loose images moved into `frontend/public/media/`
  with the About page updated to use the public asset path,
  and stray `.DS_Store` files were removed across all client folders
- [x] Backfilled missing client standard files across active client folders:
  created `client_config.py` for `DigitalGrowthSpring`, `Heavenlygiggles`,
  `ReadOverThis`, and `Stacks`,
  created `brand-identity.md` / `brand-kit.json` for
  `DigitalGrowthSpring`, `Heavenlygiggles`, and `ReadOverThis`,
  added supporting `resources/design-tokens.json`, `resources/tech-stack.md`,
  and `resources/voice-tone.md` where those brand packages were missing,
  and replaced the placeholder `ReadOverThis/CLIENT.md` with live-site-derived details
- [x] Tightened the remaining client config gaps:
  removed old onboarding placeholders from `Flourish/client_config.py` and
  `ThomKight/client_config.py`,
  added confirmed NotebookLM IDs/URLs into every `client_config.py`,
  and verified all six `client_config.py` files compile cleanly
- [x] Added per-client Google Drive scope guardrails to the shared Drive MCP:
  the server now auto-reads `PPC/.env` for `DRIVE_FOLDER_ID` from the current
  Antigravity project folder and restricts Drive reads/writes to that client
  folder subtree instead of the full shared Drive root
- [x] Backfilled the missing Flourish Google Drive folder ID so scoped Drive
  mode now applies there too (`1KJmSXF4NSoF1bwqxsnNdLE9Pes2W-yRV`)
- [x] Added the next-gen ops layer:
  `start_session.py` for session-start self-checks,
  `reconcile_project.py` for config/memory consistency checks,
  automatic `project_manifest.json` generation via project/workspace checks,
  `ARCHIVE.md` rules backfilled across client and lab projects,
  workspace-level archive guidance in `_Ops/ARCHIVE_RULES.md`,
  local Drive write audit logs in `_Ops/logs/drive-actions/`,
  and a `~/.zshrc` startup hook that runs the session-start check when entering
  a real Antigravity project folder
- [x] Verified the upgraded ops layer:
  all updated Python scripts compile,
  the Drive MCP server passes syntax check,
  and the stricter workspace-wide readiness/reconciliation check now passes cleanly
- [x] Resolved Lighthouse performance issues related to LCP and CLS
  - Moved GTM injection to the top of `<body>` out of `<head>`
  - Removed slow `@import` rule for Google Fonts from all CSS files and implemented `next/font/google` CSS Variables with `display="swap"` to completely eliminate font CDNs on the client
  - Added `fetchPriority="high"` to all Hero images site-wide (Home, Rentals, About, Book views)
  - Locked maximum render `sizes` on the Header Logo and Home Hero Image to prevent Next.js from trying to serve aggressively large intrinsic assets
- [x] Investigated Digital Growth Spring mobile PSI weakness and applied the first focused fixes there
  - Replaced the above-the-fold wellness-page YouTube iframe with a click-to-play poster so the embed loads only after interaction
  - Added explicit high-priority, right-sized loading behavior for the DGS navigation logo
  - Generated a smaller dedicated `frontend/public/logo-nav.png` asset and switched the DGS header to use it
  - Left the next likely bottleneck identified as GTM / third-party tag impact if mobile PSI remains weak after deploy

## Dev Server
`cd frontend && npm run dev` → localhost:3002

## Next Up
- [ ] Restart Codex/Claude sessions so the updated writable GDrive MCP config is reloaded
- [ ] Make NotebookLM sync fully agent-triggerable, not just auto-prepared on shell exit
- [ ] Reload shell sessions so the new `~/.zshrc` startup self-check hook is active everywhere
- [ ] End-to-end live payment test on deployed domain
- [ ] Write confirmed dates back on successful payment (auto-block availability)
- [ ] Final CTA/copy consistency pass across all pages
- [ ] SEO pass
- [x] Corrected canonical NotebookLM hub pointer (ID: 93d6f14e-5cfa-428b-9b3e-0412ac1c28f5).
- [x] Upgraded Gamma MCP to v1.0 with polling and auto-export support.
- [x] Implemented `gamma_to_drive.py` bridge for automated asset sync.
- [x] Enforced Human-First Interruption Policy across `AGENTS.md` and `GEMINI.md`.
