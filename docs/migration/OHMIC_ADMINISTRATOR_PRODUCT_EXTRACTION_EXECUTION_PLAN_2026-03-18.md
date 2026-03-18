# Ohmic Administrator Product Extraction Execution Plan

Date: 2026-03-18
Status: proposed_execution_packet
Target repo: `Ohmicaudio/ohmic-administrator`
Current source root: `B:\ohmic\apps\administrator`

## Summary

Extract the current administrator desk into a real product repo without changing
its observable behavior in the first move.

The first implementation goal is not redesign. It is to preserve the working
desk, current JSON projection floor, current route family, and current
PowerShell policy bridge while creating the seams where `runtime-core`,
connectors, workers, and overlay policy can land next.

## Hard rules

1. Keep `B:\ohmic` as the umbrella/context repo.
2. Create `ohmic-administrator` as a separate product repo before building
   deeper administrator runtime features.
3. Preserve current projection names during extraction.
4. Preserve current browser-facing route names during extraction.
5. Preserve the PowerShell command policy engine as the compatibility bridge
   during Phase 0 and Phase 1.
6. Do not build browser-runner, Gmail, or social connectors before one bounded
   shell job works against a real runtime-core contract.

## Target repo shape

```text
ohmic-administrator/
  apps/
    admin-web/
  services/
    admin-api/
    runtime-core/
    connectors/
      manual-intake/
      gmail/
      social/
  workers/
    shell-runner/
    browser-runner/
  packages/
    contracts/
    overlay-ohmic/
    model-router/
  legacy/
    powershell-administrator/
  docs/
    local/
```

## Freeze list for Phase 0

### Projection names that stay stable

- `dashboard_status_cards`
- `administrator_intake_queue`
- `administrator_inactive_intake`
- `administrator_inactive_intake_projection`
- `administrator_recent_actions`
- `administrator_note_projection`
- `administrator_tag_assignment_projection`
- `administrator_warning_review`
- `administrator_aggregation_panel`
- `administrator_attachment_preview`
- `administrator_filing_history_projection`
- `administrator_audit_summary`
- `administrator_status_history`
- `administrator_tandem_handshake_state`
- `administrator_focus_selection`
- `ready_tasks`

### Browser-facing routes that stay stable

- `GET /api/health`
- `GET /api/projections/:name`
- `GET /api/projections/stream`
- `GET /api/commands/options`
- `GET /api/filing/options`
- `GET /api/tandem/status`
- `POST /api/filing/record`
- `POST /api/focus/intake`
- `POST /api/focus/current-action`
- `POST /api/commands/validate`
- `POST /api/commands/execute`
- `POST /api/inactive/reopen`
- `POST /api/tandem/launch-intent`
- `POST /api/tandem/handshake-target`
- `POST /api/tandem/handshake-resolution`
- `POST /api/tandem/follow-up-complete`
- `POST /api/tandem/follow-up-reopen`
- `POST /api/queue/claim`
- `POST /api/queue/complete-claim`
- `POST /api/queue/release-claim`
- `POST /api/queue/context`

### Current action verbs that stay stable

- `route_to_orchestrator`
- `hold`
- `archive`
- `request_approval`
- `waiting_on_provider`
- `waiting_on_human`
- `add_note`
- `tag_item`

## Exact move map

- `B:\ohmic\apps\administrator\src\**`
  -> `ohmic-administrator/apps/admin-web/src/**`
- `B:\ohmic\apps\administrator\server\**`
  -> `ohmic-administrator/services/admin-api/src/**`
- `B:\ohmic\apps\administrator\src\types\**`
  -> `ohmic-administrator/packages/contracts/src/admin/**`
- `B:\ohmic\tools\sync\administrator\*.ps1`
  -> `ohmic-administrator/legacy/powershell-administrator/*.ps1`

## Execution phases

### Phase 0 - Extract without behavior drift

Goal: move the current desk into a real product repo with route and projection
stability.

Do:

- create local repo home at `B:\ohmic\repos\ohmic-administrator`
- move web code into `apps/admin-web`
- move server code into `services/admin-api`
- move shared browser/server contracts into `packages/contracts`
- copy administrator PowerShell scripts into
  `legacy/powershell-administrator`
- keep runtime root configurable
- keep route names unchanged
- keep projection names unchanged

Done means:

- web loads
- SSE refresh still works
- command validate and execute still work
- queue claim, complete, and release still work
- focus publication still works
- Tandem status and handoff routes still work
- current admin tests pass at the existing floor

### Phase 1 - Formalize shared contracts

Goal: codify the seams already described in architecture docs.

Create shared contracts for:

- provider-agnostic intake envelope
- administrator project overlay
- worker registry record
- worker task stack
- runtime job
- runtime event
- model route policy

Done means:

- TypeScript contracts exist under `packages/contracts`
- runtime validation exists as schema or zod
- manual fixtures exist for each contract
- admin-web and admin-api import shared contracts instead of local copies

### Phase 2 - Extract policy out of web glue

Goal: keep the browser thin and the backend policy-aware.

Do:

- keep `admin-web` as a desk surface only
- keep `admin-api` as the only browser-facing backend
- load project policy from `packages/overlay-ohmic`
- keep PowerShell validator as legacy compatibility truth
- add parity tests between the legacy PowerShell output and the new TypeScript
  validator before replacement

### Phase 3 - Build the minimum runtime-core

Goal: add the missing execution plane without overbuilding it.

Minimum runtime-core ownership:

- append-only event log
- job record and job projection
- approval requests
- worker registry
- worker heartbeats
- artifact references
- log chunk append surface
- claim lifecycle events

Done means:

- one dummy worker can register
- one job can be created
- one worker can claim it
- heartbeat while working
- append logs
- complete or fail
- admin-api can project that state back to the desk

### Phase 4 - Add one real shell worker

Goal: prove one bounded executor.

Keep it narrow:

- one PowerShell worker
- one bounded command family
- one workspace root
- one artifact directory
- one timeout rule
- one retry rule

### Phase 5 - Add model routing as code

Goal: encode cost and trust routing, not preference.

Keep route policy deterministic:

- cheap/free for classification, extraction, dedupe, and draft summaries
- mid for structured transforms and moderate reasoning
- premium for architecture, ambiguity resolution, and customer-visible finals
- destructive or customer-visible sends require higher trust or approval

### Phase 6 - Add connectors in order

Order:

1. `manual-intake`
2. `gmail`
3. `social`

This proves the provider-agnostic envelope before auth and provider-specific UI
complexity spread across the product.

## Main risks

- route freeze based on stale docs instead of the live server surface
- leaving dual sources of truth between `B:\ohmic\apps\administrator` and the
  extracted repo for too long
- treating `projectionReader` as a permanent runtime instead of a temporary read
  model
- building runtime-core too abstractly before one real bounded worker job runs
- letting the PowerShell bridge remain the hidden writeback source after
  runtime-core exists

## First implementation slice after this plan

1. Create `B:\ohmic\repos\ohmic-administrator` as a local repo.
2. Copy the current desk into:
   - `apps/admin-web`
   - `services/admin-api`
   - `packages/contracts`
   - `legacy/powershell-administrator`
3. Adjust imports and path assumptions only as needed to keep the desk green.
4. Run:

```powershell
npm test
npm run type-check
npm run build
```

5. Keep the runtime root pointing at the current administrator runtime until the
   extracted repo is stable.

## Recommendation

Start the extraction as a product-repo branch, not a redesign branch.

The first success condition is a working copy of the current administrator desk
in `ohmic-administrator` with stable routes, stable projections, stable
PowerShell compatibility, and no browser-visible behavior regressions.
