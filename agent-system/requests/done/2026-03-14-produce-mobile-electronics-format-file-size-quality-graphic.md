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
claim_id: 20260314T193758Z-1479bd39
topic: requested-task

# Produce `Format File Size Quality` graphic

## Requested Outcome

- create one reusable `Format File Size Quality` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/format_file_size_quality.svg`
- replace the placeholder in exactly these pages:
  - `mobile-electronics/beginner-level-understanding-digital-audio/index.html`
  - `mobile-electronics/sections/5-3-digital-audio-sources-formats-and-quality/index.html`

## Instructions

- compare storage cost and quality in a way that is accurate enough to teach without overselling tiny differences

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/format_file_size_quality.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/format_file_size_quality.svg.txt`
- replaced the `Format File Size Quality` placeholder block in:
  - `mobile-electronics/beginner-level-understanding-digital-audio/index.html`
  - `mobile-electronics/sections/5-3-digital-audio-sources-formats-and-quality/index.html`
- verification confirmed both target pages now reuse the same SVG with real `<figure><img>` markup and matching practical captions
- verification confirmed the rendered comparison reads cleanly in static preview on both target pages
- the chart keeps the real teaching point intact: storage cost changes dramatically, but the audible jump from good 256–320 kbps encodes to lossless is much smaller than the jump from a poor encode to a good one

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
