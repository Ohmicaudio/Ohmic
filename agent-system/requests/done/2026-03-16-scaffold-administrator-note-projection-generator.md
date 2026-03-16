Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T054932Z-c490f005

# Scaffold Administrator Note Projection Generator

## Goal

Define or scaffold the generator that emits reconciled note projections.

## Focus

- note inputs
- authorship labels
- visibility filtering
- ordering
- output JSON shape

## Acceptance

- one note-projection generator packet is explicit
- note rendering has a concrete generator seam

## Result

Done. The note generator now lives in
`tools/sync/administrator/note-projection.ps1` and emits desk-filtered or
audit-ready note rows with authorship labels and visibility filtering.
