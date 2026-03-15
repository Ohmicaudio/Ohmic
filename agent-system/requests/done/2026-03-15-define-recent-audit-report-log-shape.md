Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T140755Z-0d7c47b1

# Define Recent Audit Report Log Shape

## Goal

Define the append-only shape for short worker audit reports so performers can
feed structured suggestions back to the orchestrator without hiding them in
chat.

## Focus

- audit id
- completed tasks
- newly exposed tasks
- stale priorities
- blockers and suggested queue changes

## Acceptance

- one explicit audit-log event shape exists
- it matches the orchestrator/performer model
- it stays lightweight enough to use every few completions

## Outcome

Completed on 2026-03-15.

Result:

- defined a compact append-only `recent_audits.jsonl` entry shape
- covered completed tasks, newly exposed tasks, stale priorities, blockers, and
  suggested queue changes in one advisory packet
- kept the audit log explicitly secondary to repo-backed queue and claim truth

## Artifact

- `docs/systems/OHMIC_RECENT_AUDIT_REPORT_LOG_SHAPE_2026-03-15.md`
