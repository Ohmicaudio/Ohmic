scope: project
authority: working
project: ohmic-audio-static-content
status: done
requested: 2026-03-14
requester: codex-local
origin: split
priority: soon
blocking: no
depends_on:
handoff_from:
claim_id: 20260314T060802Z-09cda5b6
topic: requested-task

# Produce `Ohms Law Triangle` graphic

## Requested Outcome

- create one reusable `Ohms Law Triangle` asset
- replace the placeholder in exactly these pages:
  - `reference/math-measurement/ohms-law-and-power/index.html`
  - `reference/math-measurement/sections/6-1-electrical-formulas/index.html`

## Completion

- created one reusable SVG asset: `public/assets/engineering-diagrams/images/diagrams/ohms_law_triangle.svg`
- replaced the placeholder block in both requested pages with real `<figure><img>` markup
- reused the same asset in:
  - `reference/math-measurement/ohms-law-and-power/index.html`
  - `reference/math-measurement/sections/6-1-electrical-formulas/index.html`
- verification confirmed the literal `Ohms_Law_Triangle` placeholder block is gone from both target pages
- verification confirmed the new figure renders cleanly in static preview on `reference/math-measurement/ohms-law-and-power/`

## Ready When

- one asset exists and is reused in both target pages
- both placeholder markers are gone
