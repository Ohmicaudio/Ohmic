Status: done
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs

# Implement First OSM Web Editor Shell Slice

## Goal

Take the first bounded `products/ohmic-osm` editor-shell slice from packet to
real code without dragging in unrelated canvas or deep data-model churn.

## Source

- `docs/roadmap/OHMIC_OSM_FIRST_EDITOR_SHELL_SAFE_SLICE_2026-03-15.md`

## Focus

- top-level shell framing and styling
- `TopBar`, `VehicleSelector`, `InspectorPanel`, and `EquipmentManager`
- support panel/theme consistency
- keep `CanvasView` and deeper engine changes out

## Acceptance

- one bounded editor-shell commit slice is implemented
- touched files stay inside the shell scope defined in
  `docs/roadmap/OHMIC_OSM_FIRST_EDITOR_SHELL_SAFE_SLICE_2026-03-15.md`
- basic verification notes are captured honestly

## Completion Notes

- implemented in `ohmic-audio-labs` commit `baa6c22`
- touched only:
  - `TopBar.tsx`
  - `VehicleSelector.tsx`
  - `InspectorPanel.tsx`
  - `EquipmentManager.tsx`
- shell improvements focused on framing, copy, quick context chips, and stronger empty states
- verification follow-on remains separate because local `pnpm` resolves to a Windows-side `node` path in this shell and fails with `node: Permission denied`
