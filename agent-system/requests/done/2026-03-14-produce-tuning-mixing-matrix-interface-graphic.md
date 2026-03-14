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
claim_id: 20260314T221506Z-2cd3c515
topic: requested-task

# Produce `Mixing Matrix Interface` graphic

## Requested Outcome

- create one reusable `Mixing Matrix Interface` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/mixing_matrix_interface.svg`
- replace the placeholder in exactly these pages:
  - `tuning/sections/4-5-advanced-dsp-programming/index.html`

## Instructions

- show input-to-output routing clearly enough that the matrix behavior is teachable

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/mixing_matrix_interface.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/mixing_matrix_interface.svg.txt`
- replaced the `Mixing Matrix Interface` placeholder block in:
  - `tuning/sections/4-5-advanced-dsp-programming/index.html`
- verification confirmed the target page now uses real `<figure><img>` markup and renders the routing grid cleanly in local static preview
- the diagram keeps the matrix lesson practical: most cells stay zero, direct routes use full weight, and only a few weighted cells matter when summing or blending sources

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
