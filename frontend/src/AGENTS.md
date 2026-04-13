# [Project Name] — Agent Context
> Part of Antigravity. Read `../AGENCY.md` for the full framework before starting any work here.

## This Folder
[One-line description of this project or client]

## Start Here
1. Read `../AGENCY.md`
2. Read the context files listed below
3. Check `../.BOH/` for a relevant skill
4. Never ask the user to explain the system

## Context Files
- `CLIENT.md` — brand identity, services, campaign structure, key decisions
- `STATUS.md` — current phase, active to-do, key decisions
- `notebooklm.md` — NotebookLM notebook ID and sources list

## Session End
- Update `STATUS.md` with completed work and next steps
- Sync updated STATUS.md to the NotebookLM notebook
- Use `python3 _Ops/scripts/close_session.py [path]` for the deterministic close-session checklist

## Context Pressure
- If the agent is nearing the end of its usable context window, treat it like session end
- Update `STATUS.md` before context is lost
- Sync `STATUS.md` to NotebookLM if MCP is available
- Sync `CONTEXT.md` only if durable project context changed materially
- If NotebookLM MCP is unavailable, note pending sync in `notebooklm.md`
