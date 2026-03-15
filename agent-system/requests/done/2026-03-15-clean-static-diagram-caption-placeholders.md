Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-static-content
Owner: codex
Claim ID: 20260315T223217Z-ddc4bcd9

# Clean Static Diagram Caption Placeholders

## Goal

Remove or normalize placeholder caption language in static engineering-diagram
surfaces that still talks about dummy AmpLab/tool output in a rough way.

## Focus

- diagram metadata text
- inline SVG caption text where low-risk wording cleanup is enough

## Acceptance

- placeholder wording is reduced
- copy better matches the public trust level of the site
- no broader illustration redesign is required

## Result

- placeholder wording was cleaned in one bounded inline SVG caption:
  - `public/assets/engineering-diagrams/images/graphs/measurement_template_fr_phase.svg`
- supporting measurement-template metadata was normalized at the same time so
  the catalog and asset copy now agree
- the result is recorded in
  `docs/roadmap/OHMIC_STATIC_DIAGRAM_COPY_CLEANUP_2026-03-15.md`

## Verification

- diff sanity check on the touched inline SVG and paired metadata files
