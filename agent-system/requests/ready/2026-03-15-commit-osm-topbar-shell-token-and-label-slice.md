Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

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
