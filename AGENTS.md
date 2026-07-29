# Heavenly Giggles — Agent Context

## Naming
- Use `Memory.Wiki.md` for client-vs-task alias resolution.
- Keep the umbrella client/project name distinct from task aliases like dashboards, ports, planners, and runtime folders.


> Part of **Antigravity**. Read `../AGENTS.md` for the full framework before starting any work here.

## This Folder
Client: Heavenly Giggles — jumping castle hire, Fourways. Live Next.js site, WooCommerce backend.
## Naming
- Treat this folder as the client/project umbrella.
- Use `Memory.Wiki.md` to resolve client-vs-task aliases.
- If a runtime, dashboard, port, or planner folder is task-specific, treat it as a task alias under this umbrella.

## Start Here
1. Read `../AGENTS.md` — workspace framework, conventions, and NotebookLM standard
2. Read the context files listed below
3. Check `../.BOH/` for a relevant skill before starting any task
4. Never ask the user to explain the system — it is documented in `../AGENTS.md`

## Context Files
- `CONTEXT.md — full project context, stack, infrastructure`
- `STATUS.md — current state and next steps (read before any work)`
- `notebooklm.md — NotebookLM notebook pointer (HG Migration notebook)`

## Session End
- Update `STATUS.md` (or the primary status file) with what was done and what's next
- Sync the updated status to the client's NotebookLM notebook

## Context Pressure
- If the agent is nearing the end of its usable context window, treat it like session end
- Update `STATUS.md` before context is lost
- Sync `STATUS.md` to NotebookLM if MCP is available
- Sync `CONTEXT.md` only if durable project context changed materially
- If NotebookLM MCP is unavailable, note pending sync in `notebooklm.md`
