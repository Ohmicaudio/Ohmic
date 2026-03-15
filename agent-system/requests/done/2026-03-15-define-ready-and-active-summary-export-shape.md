Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T135409Z-7cc6bb0d

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

## Outcome

Completed on 2026-03-15.

Result:

- defined the shared envelope for `ready_tasks.json` and `active_claims.json`
- kept both exports explicitly secondary to repo-backed queue and claim truth
- defined common staleness signaling so dashboard consumers can stay honest

## Artifact

- `docs/systems/OHMIC_READY_AND_ACTIVE_SUMMARY_EXPORT_SHAPE_2026-03-15.md`
