Status: ready
Priority: medium
Date: 2026-03-16
Project: ohmic-audio-labs

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
