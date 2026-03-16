Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T041841Z-53b27c8c

# Classify Ohmic Audio Labs Index And Generated-Adjacent Zones

## Goal

Classify index files and generated-adjacent zones in `ohmic-audio-labs` so they
can be handled by a dedicated truth rule instead of being treated like either
pure source or pure junk.

## Focus

- `index/*`
- generated-adjacent service zones
- ui-runtime generated areas

## Acceptance

- index and generated-adjacent zones have an explicit class
- later cleanup work knows whether to hold, regenerate, or review them

## Result

- classified the mixed zones in
  `docs/roadmap/OHMIC_AUDIO_LABS_INDEX_AND_GENERATED_ADJACENT_ZONE_CLASSIFICATION_2026-03-16.md`
- split `index/*`, `services/backend/storage/*`, and
  `services/ui-runtime/generated/*` into three different handling rules
- made the follow-on order explicit: backend retention, index refresh, then
  ui-runtime generated-area review
