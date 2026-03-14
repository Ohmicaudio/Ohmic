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
handoff_from: 2026-03-14-split-second-wave-mobile-electronics-placeholder-graphics-from-qa.md
claim_id: 20260314T132556Z-83a40289
topic: requested-task

# Produce `Display Technology Comparison` graphic

## Requested Outcome

- create one reusable `Display Technology Comparison` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/display_technology_comparison.svg`
- replace the placeholder in exactly these pages:
  - `mobile-electronics/sections/5-4-video-integration-displays-cameras-and-navigation/index.html`

## Instructions

- compare panel/display types in a way that helps real buying and install decisions

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/display_technology_comparison.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/display_technology_comparison.svg.txt`
- replaced the `Display Technology Comparison` placeholder block in:
  - `mobile-electronics/sections/5-4-video-integration-displays-cameras-and-navigation/index.html`
- verification confirmed the target page now reuses the SVG with real `<figure><img>` markup and a buyer-facing caption
- verification confirmed the rendered comparison reads cleanly in static preview on `mobile-electronics/sections/5-4-video-integration-displays-cameras-and-navigation/`
- the comparison keeps the real automotive decision points centered: off-angle readability, black level, bright-cabin behavior, and whether the premium panel choice actually changes daily use

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
