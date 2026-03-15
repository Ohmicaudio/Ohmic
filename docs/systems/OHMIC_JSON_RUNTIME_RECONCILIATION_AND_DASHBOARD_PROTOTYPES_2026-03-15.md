# Ohmic JSON Runtime Reconciliation And Dashboard Prototypes

Date: 2026-03-15
Status: implementation note

## Purpose

Document the first concrete scripts that turn the JSON loop contracts into
usable runtime surfaces for a wrapper or dashboard.

## Implemented Scripts

- `B:\ohmic\tools\sync\reconcile-agent-json-runtime.ps1`
- `B:\ohmic\tools\sync\map-dashboard-status-cards.ps1`
- `B:\ohmic\tools\sync\write-dashboard-command.ps1`

## Runtime Outputs

The reconciliation and mapping scripts write to:

- `B:\ohmic\generated\agent-work\runtime\agent_state.json`
- `B:\ohmic\generated\agent-work\runtime\ready_tasks.json`
- `B:\ohmic\generated\agent-work\runtime\active_claims.json`
- `B:\ohmic\generated\agent-work\runtime\reconciliation_summary.json`
- `B:\ohmic\generated\agent-work\runtime\dashboard_status_cards.json`

## Reconciliation Rule

`reconcile-agent-json-runtime.ps1` prefers repo-backed requests and claims over
existing JSON values.

It refreshes:

- ready and active summary exports
- mismatch markers
- board health
- `agent_state.json`

This keeps the runtime JSON files derived instead of authoritative.

## Card Mapping Rule

`map-dashboard-status-cards.ps1` produces four first-version cards:

- summary
- queue health
- current action
- blockers and risk

The mapper uses `agent_state.json` first, then the summary exports, and marks
freshness honestly instead of pretending stale data is current.

## Command Writeback Rule

`write-dashboard-command.ps1` appends new `instruction` events to
`agent_inbox.jsonl`.

It does not:

- write directly into `agent_state.json`
- fabricate a response event
- suppress intentional new commands broadly

It only suppresses an exact still-pending duplicate.

## Prototype Boundary

These are runtime prototypes, not final production services.

They are enough to let the next wrapper and dashboard tasks consume real files
instead of only contract docs.
