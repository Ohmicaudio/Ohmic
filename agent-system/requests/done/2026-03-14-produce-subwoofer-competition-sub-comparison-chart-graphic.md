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
handoff_from: 2026-03-14-split-second-wave-subwoofer-enclosures-placeholder-graphics-from-encoding-scan.md
claim_id: 20260314T113855Z-c93e3c32
topic: requested-task

# Produce `Competition Sub Comparison Chart` graphic

## Requested Outcome

- create one reusable `Competition Sub Comparison Chart` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/competition_sub_comparison_chart.svg`
- replace the placeholder in exactly these pages:
  - `subwoofer-enclosures/installer-level-ts-parameter-based-selection/index.html`
  - `subwoofer-enclosures/sections/10-1-driver-selection-for-enclosure-type/index.html`

## Instructions

- use a comparison chart structure, not a decorative poster
- emphasize tradeoffs relevant to enclosure choice and competition use

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/competition_sub_comparison_chart.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/competition_sub_comparison_chart.svg.txt`
- replaced the `Competition Sub Comparison Chart` placeholder block in:
  - `subwoofer-enclosures/installer-level-ts-parameter-based-selection/index.html`
  - `subwoofer-enclosures/sections/10-1-driver-selection-for-enclosure-type/index.html`
- verification confirmed both target pages now reuse the same SVG with real `<figure><img>` markup and captions
- verification confirmed the rendered comparison chart looks correct in static preview on `subwoofer-enclosures/installer-level-ts-parameter-based-selection/`
- unrelated placeholder families in the section page were left untouched for their own follow-up tasks

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
