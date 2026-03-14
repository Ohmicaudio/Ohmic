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
handoff_from: 2026-03-14-split-second-wave-tuning-placeholder-graphics-from-qa.md
claim_id: 20260314T210037Z-615113e4
topic: requested-task

# Produce `THD Spectrum Display` graphic

## Requested Outcome

- create one reusable `THD Spectrum Display` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/thd_spectrum_display.svg`
- replace the placeholder in exactly these pages:
  - `tuning/sections/4-3-using-measurement-tools-and-software/index.html`

## Instructions

- show the fundamental and harmonic products clearly enough to teach distortion reading

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/thd_spectrum_display.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/thd_spectrum_display.svg.txt`
- replaced the `THD Spectrum Display` placeholder block in:
  - `tuning/sections/4-3-using-measurement-tools-and-software/index.html`
- verification confirmed the placeholder markup is gone and the target page now points at the reusable SVG with real `<figure><img>` markup
- the diagram keeps the teaching intent practical: one dominant fundamental, smaller harmonic bars, and a believable THD summary instead of an exaggerated failure case

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
