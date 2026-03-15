Status: done
Priority: low
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T173411Z-fd79b230

# Define OSM Web Editor First Commit Slice

## Goal

Convert the OSM dirty subsystem inventory into one concrete first commit slice
for the editor/web surface.

## Source

- `docs/roadmap/OHMIC_OSM_DIRTY_SUBSYSTEM_INVENTORY_2026-03-15.md`
- `docs/roadmap/OHMIC_AUDIO_LABS_SAFE_NEXT_COMMIT_SLICES_2026-03-15.md`

## Focus

- editor shell and canvas boundary
- include/exclude list
- minimum verification path

## Acceptance

- one explicit first `osm-web` commit slice is defined
- the slice lists files to include and files to keep out
- verification expectations are spelled out

## Outcome

Completed on 2026-03-15.

Result:

- rewrote the OSM first-slice packet as a bounded editor-shell seed instead of
  a vague dirty-subsystem grab
- fixed the include set around `TopBar`, `VehicleSelector`,
  `InspectorPanel`, and `EquipmentManager`
- kept `CanvasView`, support/status surfaces, and package/worker churn out of
  the first slice
- aligned the downstream implementation request to the same shell boundary

## Artifact

- `B:\ohmic\docs\roadmap\OHMIC_OSM_FIRST_EDITOR_SHELL_SAFE_SLICE_2026-03-15.md`
- `B:\ohmic\agent-system\requests\ready\2026-03-15-implement-first-osm-web-editor-shell-slice.md`
