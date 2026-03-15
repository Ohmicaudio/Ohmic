Status: implementation_packet
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic OSM First Editor Shell Safe Slice

## Purpose

Define the first real `products/ohmic-osm` implementation slice tightly enough
that it can be claimed and executed without pulling in workspace noise.

## Current Read

The earlier dirty inventory showed seven tracked source files, but the current
worktree now reads much cleaner and is dominated by `dist/` and `node_modules/`
noise. That means this packet should be treated as a fresh bounded editor-shell
seed, not a license to scoop up everything that once looked dirty.

## Include In The First Slice

Primary editor-shell files:

- `products/ohmic-osm/apps/osm-web/src/components/EquipmentManager.tsx`
- `products/ohmic-osm/apps/osm-web/src/components/InspectorPanel.tsx`
- `products/ohmic-osm/apps/osm-web/src/components/TopBar.tsx`
- `products/ohmic-osm/apps/osm-web/src/components/VehicleSelector.tsx`

These are the files that define editor framing, shell controls, and adjacent
panel composition without opening deeper engine work.

## Why This Is The First Slice

- the active OSM source churn is still concentrated in the editor shell
- the meaningful changes are mostly shell/theme/presentation changes
- this is still a coherent product slice, unlike the surrounding `dist/` and
  `node_modules/` noise

## Explicitly Out Of Scope

- `products/ohmic-osm/apps/osm-web/src/components/CanvasView.tsx`
- `products/ohmic-osm/apps/osm-web/dist/`
- any `node_modules/` under `products/ohmic-osm`
- `BuildChecklist.tsx`
- `TelemetryLog.tsx`
- worker/API/package changes
- any cross-package schema or storage churn

## Watchouts

- `CanvasView.tsx` still looks like the easiest place to accidentally widen the
  slice into editor-engine work
- if `InspectorPanel.tsx` or `EquipmentManager.tsx` turn out to depend on
  deeper canvas contracts than expected, stop and split the packet instead of
  dragging `CanvasView.tsx` in by habit

## Blast Radius

- OSM editor shell and styling tokens only
- should not require monorepo-wide package or schema changes

## Verification

At minimum:

- run `pnpm --dir products/ohmic-osm build`
- run `pnpm --dir products/ohmic-osm test`

If the implementation happens from the repo root instead, the equivalent
acceptable checks are:

- `npm run osm:build`
- `npm run osm:test`

## Finish Condition

- one bounded OSM editor-shell commit lands
- the file set stays inside `products/ohmic-osm/apps/osm-web`
- no generated/install noise is bundled
