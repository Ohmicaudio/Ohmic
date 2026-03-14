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
claim_id: 20260314T211135Z-e3c83664
topic: requested-task

# Produce `REW Main Screen` graphic

## Requested Outcome

- create one reusable `REW Main Screen` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/rew_main_screen.svg`
- replace the placeholder in exactly these pages:
  - `tuning/beginner-level-basic-measurement-setup/index.html`
  - `tuning/sections/4-3-using-measurement-tools-and-software/index.html`

## Instructions

- show the main REW graph area and the controls a beginner needs to recognize first

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/rew_main_screen.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/rew_main_screen.svg.txt`
- replaced the `REW Main Screen` placeholder block in:
  - `tuning/beginner-level-basic-measurement-setup/index.html`
  - `tuning/sections/4-3-using-measurement-tools-and-software/index.html`
- verification confirmed both target pages now use real `<figure><img>` markup and render the shared training-style REW screen cleanly in local static preview
- the figure keeps the onboarding focus tight: graph area, Measure button, soundcard setup, mic calibration, and overlays for before/after comparison

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
