Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Commit First Ohmic OSM Editor Shell Safe Slice

## Goal

Take the first clearly safe `products/ohmic-osm` UI/editor slice identified by
the subsystem inventory.

## Scope

- `products/ohmic-osm/apps/osm-web/src/components/CanvasView.tsx`
- `products/ohmic-osm/apps/osm-web/src/components/InspectorPanel.tsx`
- `products/ohmic-osm/apps/osm-web/src/components/EquipmentManager.tsx`
- tightly coupled shell files only if required:
  - `TopBar.tsx`
  - `VehicleSelector.tsx`

## Deliverables

- one coherent commit slice proposal or implementation
- explicit blast-radius note
- verification note for the `osm-web` surface only

## Acceptance

- the slice stays inside `apps/osm-web`
- no workspace hygiene churn (`dist/`, `node_modules/`) is included
- secondary surfaces like `BuildChecklist.tsx` and `TelemetryLog.tsx` are only
  included if proven coupled
