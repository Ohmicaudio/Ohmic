Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Normalize Design Sandbox Stitch Support Surface

## Goal

Close the current design-sandbox support drift as its own bounded lane instead
of letting it hide inside OSM or local lab work.

## Focus

- `components/DesignSandbox/StitchPreview.tsx`
- any directly-adjacent Stitch docs only if they need to match the touched
  support surface

## Acceptance

- the current support-surface drift is normalized
- the slice stays out of `products/ohmic-osm`
- `labs/lvgl-gauge-lab/**` remains frozen
- no generated/install noise is included
