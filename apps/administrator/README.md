# Ohmic Administrator

Standalone internal intake and routing desk for Ohmic operations.

## Current scope

This app is currently a Phase 1 plus early Phase 2 scaffold:

- dashboard projection viewer
- intake queue viewer
- command composer with PowerShell-backed validation
- recent action / audit projection viewer
- SSE refresh from runtime projection changes

It is not yet a full execution/writeback surface. Command validation works, but applying commands back into the admin runtime is still a follow-on step.

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
- `POST /api/commands/validate`
- `POST /api/commands/execute`

## Current collaboration posture

Good to share as a foundation branch for:

- UI review
- projection contract review
- PowerShell validation bridge review

Not yet complete for:

- command execution/writeback
- attachment preview
- warning review lane
- Tandem integration
- ContextKeep or memory integration
- provider connectors
