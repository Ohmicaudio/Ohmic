Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T055707Z-a8ef9918

# Scaffold Administrator Warning Review Shell Module

## Goal

Define or scaffold the first shell module that renders the warning-review lane.

## Focus

- warning rows
- warning reasons
- reprocess affordance
- queue/detail handoff
- empty state

## Acceptance

- one warning-review shell packet is explicit
- the admin shell has a concrete module seam for weakly normalized intake

## Result

Done. The warning-review shell module now lives in
`tools/sync/administrator/warning-review-shell.ps1` and renders warning rows
with severity-aware ordering, reprocess affordance fields, detail handoff
fields, and an explicit empty state.
