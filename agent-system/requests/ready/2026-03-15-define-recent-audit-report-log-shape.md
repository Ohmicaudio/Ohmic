Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic

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
