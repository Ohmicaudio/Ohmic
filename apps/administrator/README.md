# Ohmic Administrator

Standalone internal intake and routing desk for Ohmic operations.

## Current scope

This app is currently a Phase 1 plus early Phase 2 scaffold:

- dashboard projection viewer
- intake queue viewer
- inactive intake browser with reopen action and composer handoff
- intake detail with note and tag context
- filing picker with direct filing-record writeback
- filing history panel with optional runtime module support and composer handoff
- warning review panel with optional runtime module support and composer handoff
- aggregation bundle panel with optional runtime module support and composer handoff
- attachment preview panel with optional runtime module support and composer handoff
- audit summary panel with optional runtime module support and composer handoff
- per-intake status history panel with optional runtime module support and composer handoff
- command composer with PowerShell-backed validation and execute/writeback
- recent action / audit projection viewer with intake jump-back
- SSE refresh from runtime projection changes

It is now a usable intake triage foundation, but it is not yet a full operator desk. The current branch can validate and apply commands back into the administrator runtime, reopen inactive items, record direct filing history, regenerate the audit summary from command, reopen, note, tag, and filing writebacks, and consume several optional runtime shell modules, but it still stops short of provider integrations, advanced filing flows, and richer operator-specific writeback surfaces.

## Location

- App root: `B:\ohmic\apps\administrator`
- Runtime projections: `B:\ohmic\generated\agent-work\runtime`
- Optional local-only override: set `ADMINISTRATOR_RUNTIME_DIR` before starting the server
- PowerShell validation engine: `B:\ohmic\tools\sync\administrator`

## Dev commands

From `B:\ohmic\apps\administrator`:

```powershell
npm install
npm test
npm run type-check
npm run server
npm run dev
```

`npm test` covers:

- projection store loading and staleness wiring
- command store execute/writeback flow
- inactive reopen store behavior
- optional warning / aggregation / attachment module loading
- projection reader coverage for the watched runtime floor
- PowerShell runner smoke against a temporary local-only runtime root

To keep runtime state out of the repo checkout, you can point the admin server at a
local-only runtime root before launching it:

```powershell
$env:ADMINISTRATOR_RUNTIME_DIR = 'B:\ohmic-local\runtime\administrator'
npm run server
```

Frontend:

- Vite dev server: `http://localhost:5180`

Backend:

- projection / command server: `http://localhost:5181`

## Current routes

- `GET /api/health`
- `GET /api/projections/:name`
- `GET /api/projections/stream`
- `GET /api/commands/options`
- `GET /api/filing/options?intakeId=...`
- `POST /api/filing/record`
- `POST /api/focus/intake`
- `POST /api/commands/validate`
- `POST /api/commands/execute`
- `POST /api/inactive/reopen`

## Current collaboration posture

Good to share as a foundation branch for:

- UI review
- projection contract review
- PowerShell validation and writeback bridge review
- runtime-root collaboration and local-only runtime testing

Not yet complete for:

- filing destination migration and replacement flows
- richer audit-driven action presets beyond the current safe note/tag defaults
- attachment preview writeback or external Tandem handoff flows
- Tandem integration
- ContextKeep or memory integration
- provider connectors
