Status: implementation_packet
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic OSM First Editor Shell Safe Slice

## Purpose

Define the first real `products/ohmic-osm` implementation slice tightly enough
that it can be claimed and executed without pulling in workspace noise.

## Exact Source Scope

Primary active files:

- `products/ohmic-osm/apps/osm-web/src/components/EquipmentManager.tsx`
- `products/ohmic-osm/apps/osm-web/src/components/InspectorPanel.tsx`
- `products/ohmic-osm/apps/osm-web/src/components/TopBar.tsx`
- `products/ohmic-osm/apps/osm-web/src/components/VehicleSelector.tsx`

Formatting-only watchout:

- `products/ohmic-osm/apps/osm-web/src/components/CanvasView.tsx`

Current read:

- the first four files contain real UI token/styling changes
- `CanvasView.tsx` currently reads as line-ending churn, not meaningful product
  behavior change

## Why This Is The First Slice

- the active OSM source churn is still concentrated in the editor shell
- the meaningful changes are mostly shell/theme/presentation changes
- this is still a coherent product slice, unlike the surrounding `dist/` and
  `node_modules/` noise

## Explicitly Out Of Scope

- `products/ohmic-osm/apps/osm-web/dist/`
- any `node_modules/` under `products/ohmic-osm`
- `BuildChecklist.tsx`
- `TelemetryLog.tsx`
- worker/API/package changes
- `CanvasView.tsx` unless it is intentionally normalized and reviewed as more
  than line-ending churn

## Blast Radius

- OSM editor shell and styling tokens only
- should not require monorepo-wide package or schema changes

## Verification

At minimum:

```bash
cd /mnt/b/ohmic/repos/ohmic-audio-labs/products/ohmic-osm
npm run osm:build
npm run osm:test
```

If those scripts are not available from the nested package context, run the repo
level equivalents already used for OSM validation.

## Finish Condition

- one bounded OSM editor-shell commit lands
- the file set stays inside `apps/osm-web`
- no generated/install noise is bundled
