Status: active
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T000709Z-b24d869e

# Implement OSM Shell And Panel Composition Wave

## Goal

Take the next grouped OSM product packet across the editor shell and panel
composition surfaces without widening into canvas, package, or worker churn.

## Focus

- `products/ohmic-osm/apps/osm-web/src/components/TopBar.tsx`
- `products/ohmic-osm/apps/osm-web/src/components/VehicleSelector.tsx`
- `products/ohmic-osm/apps/osm-web/src/components/LeftPanel.tsx`
- `products/ohmic-osm/apps/osm-web/src/components/RightPanel.tsx`
- `products/ohmic-osm/apps/osm-web/src/components/VehicleLayout.tsx`
- `products/ohmic-osm/apps/osm-web/src/components/LibraryPanel.tsx`

## Acceptance

- one grouped OSM shell/panel packet lands
- the slice stays inside `apps/osm-web/src/components`
- `CanvasView.tsx`, packages, workers, `dist/`, and `node_modules/` stay out
- `pnpm --dir products/ohmic-osm build` passes
- `pnpm --dir products/ohmic-osm test` passes

## Result

- polished the grouped shell/panel packet across:
  - `TopBar.tsx`
  - `VehicleSelector.tsx`
  - `LeftPanel.tsx`
  - `RightPanel.tsx`
  - `VehicleLayout.tsx`
  - `LibraryPanel.tsx`
- improved shell hierarchy, panel framing, library grouping, and selector
  clarity without reopening canvas or package surfaces
- verified:
  - `pnpm --dir repos/ohmic-audio-labs/products/ohmic-osm build`
  - `pnpm --dir repos/ohmic-audio-labs/products/ohmic-osm test`
