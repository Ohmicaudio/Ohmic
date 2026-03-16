Status: active_handoff_board
Date: 2026-03-16
Project: ohmic-audio-labs

# Ohmic Post-Wave Cleanup Queue

## Purpose

Refill the cleanup queue after the first local-only relocation wave and first
safe cleanup packet so the next work is drawn from current repo reality instead
of stale earlier assumptions.

## Current Remaining Local-Only Dirt

Still visible in `ohmic-audio-labs`:

- `backend_err.txt`
- `backend_final_log.txt`
- `backend_log.txt`
- `backend_new_log.txt`
- `dev.log`
- `dev-mobile.log`
- `playwright-report/*`
- `test-results/*`
- `tmp/*`
- `output/*`
- `services/backend/storage/measurement-captures/*`
- `services/backend/storage/measurement-captures.v1.json`

## Next Pickup Order

### 1. Execute `output/*` relocation or purge wave

Why:

- it is the loudest remaining root-level local-only clutter after the first
  relocation wave

### 2. Define backend measurement capture retention execution slice

Why:

- backend measurement captures are still visible and may still have short-term
  value
- they need a specific execution rule, not casual deletion

### 3. Execute disposable log and report purge check

Why:

- loose logs and report folders are still visible
- they are the safest remaining disposable local exhaust

### 4. Promote source-visible cleanup wave

Why:

- once the remaining local-only clutter is reduced, the next honest frontier is
  the tracked source-visible cleanup lane

## Boundary

Do not treat backend measurement captures as purge-only until their retention
execution slice exists.
