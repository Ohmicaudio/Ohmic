# Ohmic Agent JSON Runtime Bootstrap

Date: 2026-03-15
Status: bootstrap note

## Purpose

Seed the first concrete live JSON loop files in one stable runtime directory so
wrapper and dashboard work can build on real files instead of contract docs
alone.

## Runtime Location

Bootstrap files live in:

- `B:\ohmic\generated\agent-work\runtime`

## Seeded Files

- `agent_state.json`
- `agent_inbox.jsonl`
- `agent_outbox.jsonl`
- `agent_locks.json`

## Initialization Rule

These files are tracked bootstrap surfaces.

They are intentionally small and immediately parseable, but they are not the
final live truth on their own.

On first real runner use:

1. re-read ready tasks and active claims from the repo
2. refresh counts, timestamps, and lease state
3. append new inbox/outbox events instead of overwriting history
4. keep markdown queue and claim files as the stronger authority

## Ownership Rule

- `generated/agent-work/runtime/*` is for live loop bootstrap and runtime state
- `agent-system/*` markdown files remain authoritative for queue truth, claims,
  memory, and rules
- wrappers and dashboards may read these JSON files directly, but should not
  treat them as replacements for repo truth

## Seed Behavior

- `agent_state.json` starts as a reusable status seed
- `agent_inbox.jsonl` and `agent_outbox.jsonl` start with one handled example
  pair
- `agent_locks.json` starts with an illustrative worker lease and an empty
  orchestrator lease

## Next Follow-On Work

The next tasks that should consume this bootstrap are:

- `implement-state-reconciliation-summary-generator`
- `implement-json-dashboard-status-card-mapper-prototype`
- `implement-json-dashboard-command-writeback-prototype`
