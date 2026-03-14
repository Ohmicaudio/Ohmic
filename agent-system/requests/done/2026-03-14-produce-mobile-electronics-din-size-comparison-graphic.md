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
claim_id: 20260314T131426Z-120d4f01
topic: requested-task

# Produce `DIN Size Comparison` graphic

## Requested Outcome

- create one reusable `DIN Size Comparison` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/din_size_comparison.svg`
- replace the placeholder in exactly these pages:
  - `mobile-electronics/beginner-level-choosing-the-right-head-unit/index.html`
  - `mobile-electronics/sections/5-1-head-units-oem-replacement-and-retention-strategies/index.html`

## Instructions

- compare single-DIN, double-DIN, and oversized screen packaging clearly

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/din_size_comparison.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/din_size_comparison.svg.txt`
- replaced the `DIN Size Comparison` placeholder block in:
  - `mobile-electronics/beginner-level-choosing-the-right-head-unit/index.html`
  - `mobile-electronics/sections/5-1-head-units-oem-replacement-and-retention-strategies/index.html`
- verification confirmed both target pages now reuse the same SVG with real `<figure><img>` markup and captions
- verification confirmed the rendered DIN comparison looks correct in static preview on `mobile-electronics/beginner-level-choosing-the-right-head-unit/`
- the graphic explicitly preserves the real fitment rule that oversized screens are usually a packaging style built around a standard DIN chassis, not a separate DIN standard

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
