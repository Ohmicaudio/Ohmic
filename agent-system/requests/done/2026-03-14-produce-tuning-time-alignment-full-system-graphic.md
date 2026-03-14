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
claim_id: 20260314T225754Z-2ca3146f
topic: requested-task

# Produce `Time Alignment Full System` graphic

## Requested Outcome

- create one reusable `Time Alignment Full System` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/time_alignment_full_system.svg`
- replace the placeholder in exactly these pages:
  - `tuning/sections/4-4-calibration-and-verification/index.html`

## Instructions

- show the whole speaker layout and the final alignment relationship, not just one driver pair

## Completion

- created the reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/time_alignment_full_system.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/time_alignment_full_system.svg.txt`
- replaced the `Time Alignment Full System` placeholder block in:
  - `tuning/sections/4-4-calibration-and-verification/index.html`
- verification confirmed the target page now uses real `<figure><img>` markup and renders the complete driver-map and delay-table relationship cleanly in local static preview
- the page now explains the workflow around one shared listening position, one farthest-driver reference, and delay values for the entire system instead of only a left-right pair

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
