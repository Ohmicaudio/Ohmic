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
claim_id: 20260314T133046Z-507bc94b
topic: requested-task

# Produce `Navigation Comparison` graphic

## Requested Outcome

- create one reusable `Navigation Comparison` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/navigation_comparison.svg`
- replace the placeholder in exactly these pages:
  - `mobile-electronics/installer-level-advanced-camera-and-display-systems/index.html`
  - `mobile-electronics/sections/5-4-video-integration-displays-cameras-and-navigation/index.html`

## Instructions

- compare the major navigation approaches clearly enough for install decision-making

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/navigation_comparison.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/navigation_comparison.svg.txt`
- replaced the `Navigation Comparison` placeholder block in:
  - `mobile-electronics/installer-level-advanced-camera-and-display-systems/index.html`
  - `mobile-electronics/sections/5-4-video-integration-displays-cameras-and-navigation/index.html`
- verification confirmed both target pages now reuse the same SVG with real `<figure><img>` markup and matching installer-facing captions
- verification confirmed the rendered navigation comparison reads cleanly in static preview on both target pages
- the comparison preserves the practical install decision: phone-based navigation usually wins for daily traffic and search, while embedded navigation still matters as an offline fallback

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
