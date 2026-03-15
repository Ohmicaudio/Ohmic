Status: done
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

## Result

- exact file-level scope recorded in
  `docs/roadmap/OHMIC_OSM_FIRST_EDITOR_SHELL_SAFE_SLICE_2026-03-15.md`
- blast radius limited to `apps/osm-web`
- verification path named for OSM only

## Acceptance Met

- slice stays inside `apps/osm-web`
- generated/install noise excluded
- support surfaces left for a later blocked follow-on
