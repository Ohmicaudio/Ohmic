Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T132510Z-2cc8ef42

# Commit OSM TopBar Shell Token And Label Slice

## Goal

Commit the next one-file OSM shell slice by normalizing `TopBar.tsx`.

## Use

- `docs/roadmap/OHMIC_OSM_POST_CANVAS_SAFE_SLICE_2026-03-15.md`

## Scope

- `products/ohmic-osm/apps/osm-web/src/components/TopBar.tsx`

## Out Of Scope

- other OSM components or packages
- `products/ohmic-osm/**/dist/`
- `products/ohmic-osm/**/node_modules/`

## Verification

- `pnpm build`
- `pnpm test`
- run from `B:\ohmic\repos\ohmic-audio-labs\products\ohmic-osm`

## Acceptance

- `TopBar.tsx` lands as a one-file shell packet
- hard-coded chrome drift is reduced with shared tokens where appropriate
- visible mojibake/icon label corruption is removed without widening the slice

## Outcome

Completed on 2026-03-15.

Result:

- committed the one-file OSM topbar shell packet in `TopBar.tsx`
- replaced icon-heavy labels and mojibake-prone chrome with plain-text controls
- grouped shell actions, mode toggles, and export actions into clearer clusters
- aligned the topbar styling to safe shell token fallbacks without widening beyond the file

## Verification

- passed: `pnpm build`
- passed: `pnpm test`
- both run from `B:\ohmic\repos\ohmic-audio-labs\products\ohmic-osm`
