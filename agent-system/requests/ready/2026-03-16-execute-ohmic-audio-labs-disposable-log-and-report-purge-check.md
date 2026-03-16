Status: ready
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs

# Execute Ohmic Audio Labs Disposable Log And Report Purge Check

## Goal

Purge the remaining disposable local logs and report folders if they are still
present and not needed by an active debugging loop.

## Focus

- `backend_*.txt`
- `dev.log`
- `dev-mobile.log`
- `playwright-report/*`
- `test-results/*`
- `tmp/*`

## Acceptance

- remaining disposable local exhaust is gone
- no useful retained evidence is deleted by accident
