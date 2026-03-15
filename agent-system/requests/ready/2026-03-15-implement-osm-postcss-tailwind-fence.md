Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic-audio-labs

# Implement OSM PostCSS Tailwind Fence

## Goal

Add one small config fence so the OSM app no longer inherits the root Tailwind
path that is producing the non-blocking warning.

## Source

- `docs/roadmap/OHMIC_OSM_TAILWIND_CONFIG_OWNERSHIP_DECISION_2026-03-15.md`

## Focus

- OSM-local config only
- no Tailwind adoption
- no editor-shell feature churn

## Acceptance

- one bounded config change exists for OSM
- the Tailwind ownership warning path is reduced or removed
- OSM stays a plain-CSS app unless explicitly changed later
