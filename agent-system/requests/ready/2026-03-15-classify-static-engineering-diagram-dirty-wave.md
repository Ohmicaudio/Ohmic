Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-static-content

# Classify Static Engineering Diagram Dirty Wave

## Goal

Determine whether the large engineering-diagram dirt wave in static-content is
generated churn, a real asset-update batch, or both, so it can be planned as a
coherent block instead of ambient repo noise.

## Focus

- `public/assets/engineering-diagrams/images/*`
- `public/assets/engineering-diagrams/metadata/*`
- related catalog/support files

## Acceptance

- the dirty wave is classified
- the right next grouped task is obvious
- agents know whether to freeze, normalize, or continue that lane
