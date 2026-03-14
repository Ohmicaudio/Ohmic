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
claim_id: 20260314T224603Z-644c91e1
topic: requested-task

# Produce `SQ Competition Install` graphic

## Requested Outcome

- create one reusable `SQ Competition Install` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/competition_sq_install_layout.svg`
- replace the placeholder in exactly these pages:
  - `tuning/installer-level-competition-categories-and-judging/index.html`

## Instructions

- show a sound-quality competition layout focused on staging, symmetry, and judge-facing priorities

## Completion

- reused the existing SVG asset at `public/assets/engineering-diagrams/images/diagrams/competition_sq_install_layout.svg`
- reused the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/competition_sq_install_layout.svg.txt`
- replaced the `SQ Competition Install` placeholder block in:
  - `tuning/installer-level-competition-categories-and-judging/index.html`
- verification confirmed the target page now uses real `<figure><img>` markup and renders the SQ install concept cleanly in local static preview
- the page now frames the install around front-stage symmetry, hidden infrastructure, judge listening position, and low-visual-noise presentation priorities

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
