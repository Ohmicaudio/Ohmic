Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-static-content
Owner: d
Claim ID: 20260315T234507Z-0b8e0d5a

# Backfill Engineering Diagram Metadata Companions

## Goal

Backfill the missing metadata sidecars for the currently unmatched engineering
diagram SVG assets so the diagram lane moves as one coherent packet instead of
keeping incomplete image-only additions around.

## Focus

- `public/assets/engineering-diagrams/images/*`
- `public/assets/engineering-diagrams/metadata/*`
- `public/assets/engineering-diagrams/image_catalog.json`

## Acceptance

- every currently unmatched diagram asset has a metadata companion or an
  explicit exclusion reason
- catalog/support files are refreshed once in the same packet
- the diagram lane is normalized as image + metadata + catalog together

## Result

- added metadata sidecars for the previously unmatched engineering-diagram SVG
  set under `public/assets/engineering-diagrams/metadata`
- refreshed `public/assets/engineering-diagrams/image_catalog.json` so the same
  assets are now present in the catalog
- verified the lane now sits at `87` images and `87` metadata sidecars, with no
  unmatched asset left in the current set
