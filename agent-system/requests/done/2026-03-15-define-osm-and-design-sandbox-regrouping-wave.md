Status: active
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T000215Z-c669d2f6

# Define OSM And Design Sandbox Regrouping Wave

## Goal

Rebuild the next grouped execution packet for the dirty `products` lane so OSM
and its supporting design-sandbox surfaces can move again without falling back
to stale one-file tasking.

## Focus

- `products/*`
- related visualization and design-sandbox support surfaces
- what belongs in the next grouped software lane vs what should stay frozen

## Acceptance

- the next grouped `products` wave is defined
- OSM follow-on work is obvious again
- no broad product-lane freelancing is required to pick the next slice

## Result

- defined the regrouping packet in
  `docs/roadmap/OHMIC_OSM_AND_DESIGN_SANDBOX_REGROUPING_WAVE_2026-03-15.md`
- split the next truthful lanes into:
  - OSM shell and panel composition
  - OSM workflow and status support
  - design-sandbox Stitch support
- fenced generated/install output and `labs/lvgl-gauge-lab/**` out of the
  next packet
