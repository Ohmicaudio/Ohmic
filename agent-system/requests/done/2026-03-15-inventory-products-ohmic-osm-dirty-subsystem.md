Status: done
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T060210Z-1910e7f3

# Inventory Products Ohmic OSM Dirty Subsystem

## Goal

Inventory the dirty `products/ohmic-osm` subsystem inside `ohmic-audio-labs`
as its own lane.

## Why

The dirty-worktree inventory showed `products/ohmic-osm` is big enough to be a
subsystem, not just part of generic app churn.

## Deliverable

A short subsystem inventory that says:

- what areas inside `products/ohmic-osm` are active
- what looks safe to commit next
- what should be frozen or triaged later

## Constraints

- inventory only
- no broad code edits in this step

## Outcome

Completed on 2026-03-15.

Output:

- `B:\ohmic\docs\roadmap\OHMIC_OSM_DIRTY_SUBSYSTEM_INVENTORY_2026-03-15.md`

Result:

- the OSM dirty lane is narrowed to seven tracked `osm-web` component edits
- package/workspace `node_modules` and `dist` paths are confirmed as noise, not
  real product churn
- the likely safe next commit slice is now centered on `apps/osm-web`

## Completion

- inventoried the current `products/ohmic-osm` dirty surface
- separated real source edits from generated/install noise
- documented the likely safe next commit slice and the freeze-later areas
