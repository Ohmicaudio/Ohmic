Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T054932Z-c490f005

# Scaffold Administrator Tag Projection Generator

## Goal

Define or scaffold the generator that emits reconciled tag assignment
projections.

## Focus

- tag assignment inputs
- class and source labels
- duplicate suppression
- ordering
- output JSON shape

## Acceptance

- one tag-projection generator packet is explicit
- tag rendering has a concrete generator seam

## Result

Done. The tag generator now lives in
`tools/sync/administrator/tag-projection.ps1` and emits effective tag rows with
duplicate suppression, class/source labels, and stable ordering.
