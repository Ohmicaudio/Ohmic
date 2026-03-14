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
claim_id: 20260314T210828Z-bca74513
topic: requested-task

# Produce `Waterfall CSD Example` graphic

## Requested Outcome

- create one reusable `Waterfall CSD Example` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/waterfall_csd_example.svg`
- replace the placeholder in exactly these pages:
  - `tuning/sections/4-3-using-measurement-tools-and-software/index.html`

## Instructions

- make the decay / ringing story obvious without needing a long caption to decode it

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/waterfall_csd_example.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/waterfall_csd_example.svg.txt`
- replaced the `Waterfall CSD Example` placeholder block in:
  - `tuning/sections/4-3-using-measurement-tools-and-software/index.html`
- verification confirmed the target page now uses real `<figure><img>` markup and renders the pseudo-3D decay view cleanly in local static preview
- the diagram makes the ringing story visible at a glance by letting the long 85 Hz and 140 Hz ridges do the teaching work instead of burying the point in caption text

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
