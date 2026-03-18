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
- Tandem handoff panel with server-backed configuration status
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
- Tandem envs:
  - `ADMINISTRATOR_TANDEM_BASE_URL`
  - `ADMINISTRATOR_TANDEM_SESSION_LABEL`
  - `ADMINISTRATOR_TANDEM_SESSION_STATE` (`missing`, `idle`, or `attached`)
  - `ADMINISTRATOR_TANDEM_ACTIVE_TARGET_LABEL`

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
- LAN dev access: `http://<this-machine-ip>:5180`

Backend:

- projection / command server: `http://localhost:5181`

The Vite dev server is configured to bind on `0.0.0.0`, so other devices on the
same network can use the admin app through this machine's LAN IP while the app
continues proxying `/api` traffic back to the local server on `5181`.

Example Tandem setup:

```powershell
$env:ADMINISTRATOR_TANDEM_BASE_URL = 'http://127.0.0.1:8765'
$env:ADMINISTRATOR_TANDEM_SESSION_LABEL = 'gmail-triage'
$env:ADMINISTRATOR_TANDEM_SESSION_STATE = 'attached'
$env:ADMINISTRATOR_TANDEM_ACTIVE_TARGET_LABEL = 'Gmail support inbox'
```

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
- `GET /api/tandem/status`

## Current collaboration posture

Good to share as a foundation branch for:

- UI review
- projection contract review
- PowerShell validation and writeback bridge review
- runtime-root collaboration and local-only runtime testing

Not yet complete for:

- filing destination migration and replacement flows
- richer audit-driven action presets beyond the current safe note/tag defaults
- attachment preview writeback or live Tandem session/tab handoff flows
- live Tandem session integration beyond the first status seam
- ContextKeep or memory integration
- provider connectors

## Adjacent ops tools under consideration

- `Postiz` is worth evaluating as a separate outbound social / PR management handoff tool.
- Treat it as a companion system for campaign scheduling, social publishing, and run-up promotion work, not as a replacement for the administrator desk.
- The administrator app should keep owning intake, routing, approvals, audit trail, and internal operations even if Postiz is adopted for outbound publishing.
