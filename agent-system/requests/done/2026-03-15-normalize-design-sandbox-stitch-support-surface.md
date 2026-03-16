Status: active
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T002535Z-66c41c0d

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

## Result

- normalized `components/DesignSandbox/StitchPreview.tsx` into a clearer
  support-surface shell with better tab, input, and preview hierarchy
- kept the slice out of `products/ohmic-osm` and left `labs/lvgl-gauge-lab/**`
  untouched
- did not run a repo-wide app gate because the only available root checks are
  still noisy and not trustworthy for this isolated support-surface change
