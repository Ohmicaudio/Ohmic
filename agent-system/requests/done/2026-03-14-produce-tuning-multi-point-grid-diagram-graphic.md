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
claim_id: 20260314T204219Z-c3dba303
topic: requested-task

# Produce `Multi Point Grid Diagram` graphic

## Requested Outcome

- create one reusable `Multi Point Grid Diagram` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/multi_point_grid_diagram.svg`
- replace the placeholder in exactly these pages:
  - `tuning/sections/4-3-using-measurement-tools-and-software/index.html`

## Instructions

- show a practical cabin measurement grid rather than an abstract geometry sketch

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/multi_point_grid_diagram.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/multi_point_grid_diagram.svg.txt`
- replaced the `Multi Point Grid Diagram` placeholder block in:
  - `tuning/sections/4-3-using-measurement-tools-and-software/index.html`
- verification confirmed the target page now reuses the SVG with real `<figure><img>` markup and a practical averaging caption
- verification confirmed the rendered cabin map reads cleanly in static preview on `tuning/sections/4-3-using-measurement-tools-and-software/`
- the diagram keeps the real goal clear: sample the seats people actually use and average broad trends instead of tuning for one lucky point in space

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
