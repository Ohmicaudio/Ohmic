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
claim_id: 20260314T212010Z-04aa1c25
topic: requested-task

# Produce `Multi Driver Time Alignment Diagram` graphic

## Requested Outcome

- create one reusable `Multi Driver Time Alignment Diagram` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/multi_driver_time_alignment_diagram.svg`
- replace the placeholder in exactly these pages:
  - `tuning/sections/4-2-equalization-and-time-alignment/index.html`

## Instructions

- show multiple drivers arriving at different times and the corrected aligned case

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/multi_driver_time_alignment_diagram.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/multi_driver_time_alignment_diagram.svg.txt`
- replaced the `Multi Driver Time Alignment Diagram` placeholder block in:
  - `tuning/sections/4-2-equalization-and-time-alignment/index.html`
- verification confirmed the target page now uses real `<figure><img>` markup and renders the before/after arrival comparison cleanly in local static preview
- the diagram keeps the operational rule obvious: use the farthest driver as the reference, then delay the earlier arrivals until they land together at the listening position

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
