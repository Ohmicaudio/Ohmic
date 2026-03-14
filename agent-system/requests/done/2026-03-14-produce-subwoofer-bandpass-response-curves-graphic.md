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
claim_id: 20260314T111520Z-1fb9c6a2
topic: requested-task

# Produce `Bandpass Response Curves` graphic

## Requested Outcome

- create one reusable `Bandpass Response Curves` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/bandpass_response_curves.svg`
- replace the placeholder in exactly these pages:
  - `subwoofer-enclosures/index.html`
  - `subwoofer-enclosures/installer-level-design-and-tuning/index.html`
  - `subwoofer-enclosures/sections/10-4-bandpass-and-specialty-enclosures/index.html`

## Instructions

- show frequency-response curves for different chamber ratios
- keep the figure instructional and chart-led rather than decorative
- remove only the matching placeholder family

## Completion

- created reusable asset:
  - `public/assets/engineering-diagrams/images/diagrams/bandpass_response_curves.svg`
- created metadata sidecar:
  - `public/assets/engineering-diagrams/metadata/bandpass_response_curves.svg.txt`
- replaced the matching placeholder family in:
  - `public/subwoofer-enclosures/installer-level-design-and-tuning/index.html`
  - `public/subwoofer-enclosures/sections/10-4-bandpass-and-specialty-enclosures/index.html`
- replaced the raw placeholder summary in:
  - `public/subwoofer-enclosures/index.html`
- static repo push:
  - `f9e118d` `Add bandpass response curves graphic`

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
