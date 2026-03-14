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
claim_id: 20260314T205334Z-60062187
topic: requested-task

# Produce `Gating Before After` graphic

## Requested Outcome

- create one reusable `Gating Before After` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/gating_before_after.svg`
- replace the placeholder in exactly these pages:
  - `tuning/sections/4-3-using-measurement-tools-and-software/index.html`

## Instructions

- compare ungated vs gated measurements in a way that makes the cleanup easy to spot

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/gating_before_after.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/gating_before_after.svg.txt`
- replaced the `Gating Before After` placeholder block in:
  - `tuning/sections/4-3-using-measurement-tools-and-software/index.html`
- verification confirmed the target page now uses real `<figure><img>` markup and renders the side-by-side comparison cleanly in local static preview
- the diagram keeps the real tradeoff visible instead of overselling the tool: gating cleans the mid and high range, but readers still need an ungated low-frequency view below the merge point

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
