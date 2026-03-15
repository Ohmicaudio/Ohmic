Status: ready
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs

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
