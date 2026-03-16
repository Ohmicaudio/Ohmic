Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T055707Z-a8ef9918

# Scaffold Administrator Status History Shell Module

## Goal

Define or scaffold the first shell module that renders intake status history.

## Focus

- transition rows
- actor labels
- reason labels
- ordering
- empty state

## Acceptance

- one status-history shell packet is explicit
- lifecycle history has a concrete shell rendering seam

## Result

Done. The status-history shell module now lives in
`tools/sync/administrator/status-history-shell.ps1` and renders ordered
transition rows with actor labels, reason labels, current-row marking, and an
empty state.
