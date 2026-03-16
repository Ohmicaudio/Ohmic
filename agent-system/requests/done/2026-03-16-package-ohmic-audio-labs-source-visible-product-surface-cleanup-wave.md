Status: done
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T043804Z-18665939

# Package Ohmic Audio Labs Source-Visible Product Surface Cleanup Wave

## Goal

Package the next cleanup wave across tracked active product surfaces without
mixing them with nonproduct or generated churn.

## Focus

- `components/*`
- `services/*`
- `products/*`
- `test/*`
- supporting `schemas/*`, `utils/*`, `scripts/*`

## Acceptance

- one product-surface cleanup packet is explicit
- tracked source cleanup can start without being confused with junk cleanup

## Result

- packaged the tracked product-source cleanup slice in
  `docs/roadmap/OHMIC_AUDIO_LABS_SOURCE_VISIBLE_PRODUCT_SURFACE_CLEANUP_WAVE_2026-03-16.md`
- separated active product surfaces from rebuildable junk, local evidence, and
  nonproduct domains
- made the first review order explicit: hardware and measurement first, then
  mobile/shared shell, then contracts and support truth
