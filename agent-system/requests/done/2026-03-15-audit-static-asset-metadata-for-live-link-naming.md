Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-static-content
Owner: codex
Claim ID: 20260315T223217Z-be2a1290

# Audit Static Asset Metadata For Live Link Naming

## Goal

Review static asset metadata and image-catalog language for older AmpLab-heavy
wording that should now map more cleanly to the current naming model.

## Focus

- `public/assets/engineering-diagrams/metadata/*`
- `public/assets/engineering-diagrams/image_catalog.json`

## Acceptance

- real wording drift is identified
- the next safe metadata cleanup slice is obvious
- no unnecessary visual asset regeneration is required

## Result

- wording drift was confirmed in the engineering-diagram catalog and metadata
- the bounded cleanup was applied in:
  - `public/assets/engineering-diagrams/image_catalog.json`
  - `public/assets/engineering-diagrams/metadata/dsp_signal_chain.svg.txt`
  - `public/assets/engineering-diagrams/metadata/measurement_template_fr_phase.svg.txt`
- the result is recorded in
  `docs/roadmap/OHMIC_STATIC_DIAGRAM_COPY_CLEANUP_2026-03-15.md`

## Verification

- diff sanity check on the touched metadata/catalog files
