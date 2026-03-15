Status: done
Priority: low
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T191348Z-1c84ce9e

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

## Outcome

Completed on 2026-03-15.

Output:

- `B:\ohmic\repos\ohmic-audio-labs\products\ohmic-osm\apps\osm-web\postcss.config.cjs`
- `B:\ohmic\docs\roadmap\OHMIC_OSM_POSTCSS_TAILWIND_FENCE_2026-03-15.md`

Result:

- OSM now has an app-local PostCSS fence and no longer inherits the monorepo
  root Tailwind/PostCSS config by accident
- the prior Tailwind `content` warning disappeared during `pnpm build`
- OSM remains a plain-CSS app with no new Tailwind adoption surface
