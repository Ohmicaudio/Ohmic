Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-static-content
Owner: d
Claim ID: 20260315T234115Z-aead3796

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

## Result

- recorded the classification in
  `docs/roadmap/OHMIC_STATIC_ENGINEERING_DIAGRAM_DIRTY_WAVE_CLASSIFICATION_2026-03-15.md`
- confirmed the static engineering-diagram lane is currently clean and that the
  recent wave was a real grouped asset-production batch with a smaller
  normalization tail
- identified the remaining normalization gap as missing metadata sidecars for
  unmatched SVG assets and queued the next grouped task at
  `agent-system/requests/ready/2026-03-15-backfill-engineering-diagram-metadata-companions.md`
