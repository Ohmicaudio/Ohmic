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
claim_id: 20260314T224343Z-6d0b778c
topic: requested-task

# Produce `SPL Competition Wall` graphic

## Requested Outcome

- create one reusable `SPL Competition Wall` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/competition_spl_wall_layout.svg`
- replace the placeholder in exactly these pages:
  - `tuning/installer-level-competition-categories-and-judging/index.html`

## Instructions

- show the high-output wall build concept and cabin takeover clearly

## Completion

- reused the existing SVG asset at `public/assets/engineering-diagrams/images/diagrams/competition_spl_wall_layout.svg`
- reused the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/competition_spl_wall_layout.svg.txt`
- replaced the `SPL Competition Wall` placeholder block in:
  - `tuning/installer-level-competition-categories-and-judging/index.html`
- verification confirmed the target page now uses real `<figure><img>` markup and renders the SPL wall concept cleanly in local static preview
- the page now frames the wall correctly around cabin takeover, meter position, and output-at-the-scoring-point priorities

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
