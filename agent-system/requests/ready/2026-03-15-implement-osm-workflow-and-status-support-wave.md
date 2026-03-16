Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Implement OSM Workflow And Status Support Wave

## Goal

Move the workflow/status surfaces as one bounded OSM packet after the shell and
panel composition wave is defined.

## Focus

- `products/ohmic-osm/apps/osm-web/src/components/BuildChecklist.tsx`
- `products/ohmic-osm/apps/osm-web/src/components/TelemetryLog.tsx`
- `products/ohmic-osm/apps/osm-web/src/components/EquipmentManager.tsx`
- `products/ohmic-osm/apps/osm-web/src/components/InspectorPanel.tsx`

## Acceptance

- one grouped workflow/status packet lands
- the slice stays inside `apps/osm-web/src/components`
- no package, worker, `dist/`, or `node_modules/` noise is bundled
- `pnpm --dir products/ohmic-osm build` passes
- `pnpm --dir products/ohmic-osm test` passes
