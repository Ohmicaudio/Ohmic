Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Normalize Design Sandbox Stitch Support Surface

## Goal

Commit the truthful design-sandbox support lane separately from OSM product
work so the tiny Stitch support diff does not stay trapped inside broader
products-lane regrouping.

## Source

- `docs/roadmap/OHMIC_OSM_AND_DESIGN_SANDBOX_REGROUPING_WAVE_2026-03-15.md`

## Focus

- `components/DesignSandbox/StitchPreview.tsx`
- stitch support docs only if needed

## Acceptance

- the tiny design-sandbox support slice is normalized independently
- it does not reopen broader OSM or local-lab noise
- the remaining OSM lane stays cleaner
