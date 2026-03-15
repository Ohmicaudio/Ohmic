Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Ready And Active Summary Export Shape

## Goal

Define the minimal JSON export shape for `ready_tasks.json` and
`active_claims.json` so dashboards and runners can consume them consistently
without treating them as canonical authority.

## Focus

- summary fields only
- source-of-truth relationship to repo-backed queue and claims
- staleness handling

## Acceptance

- one explicit summary export packet exists
- it stays secondary to repo-backed truth
- it fits the JSON-loop and dashboard work already queued
