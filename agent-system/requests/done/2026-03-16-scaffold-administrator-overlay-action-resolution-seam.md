Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T053212Z-41a79af1

# Scaffold Administrator Overlay Action Resolution Seam

## Goal

Define or scaffold the seam that resolves project-local action labels and
aliases back to canonical administrator actions.

## Focus

- alias lookup
- canonical action resolution
- collision rejection
- fallback labels
- overlay context binding

## Acceptance

- one overlay-action resolution packet is explicit
- action resolution stops being implicit glue logic

## Result

Done. The overlay-action resolution seam now lives in
`tools/sync/administrator/overlay-action-resolution.ps1` and resolves
project-local labels and aliases to canonical actions with collision rejection,
hidden-action blocking, and deprecated-alias warning support.
