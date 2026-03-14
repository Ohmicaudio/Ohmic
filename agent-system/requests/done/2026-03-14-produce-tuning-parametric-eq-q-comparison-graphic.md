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
claim_id: 20260314T211648Z-2704e9c6
topic: requested-task

# Produce `Parametric EQ Q Comparison` graphic

## Requested Outcome

- create one reusable `Parametric EQ Q Comparison` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/parametric_eq_q_comparison.svg`
- replace the placeholder in exactly these pages:
  - `tuning/sections/4-2-equalization-and-time-alignment/index.html`

## Instructions

- compare broad vs narrow EQ moves in a way that makes Q intuitive

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/parametric_eq_q_comparison.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/parametric_eq_q_comparison.svg.txt`
- replaced the `Parametric EQ Q Comparison` placeholder block in:
  - `tuning/sections/4-2-equalization-and-time-alignment/index.html`
- verification confirmed the target page now uses real `<figure><img>` markup and renders the broad/medium/narrow comparison cleanly in local static preview
- the diagram keeps the teaching point literal: same center frequency, same gain, only the width changes so Q feels intuitive instead of abstract

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
