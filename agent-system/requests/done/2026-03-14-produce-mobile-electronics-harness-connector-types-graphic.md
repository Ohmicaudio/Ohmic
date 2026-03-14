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
claim_id: 20260314T192735Z-3426ec16
topic: requested-task

# Produce `Harness Connector Types` graphic

## Requested Outcome

- create one reusable `Harness Connector Types` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/harness_connector_types.svg`
- replace the placeholder in exactly these pages:
  - `mobile-electronics/sections/5-1-head-units-oem-replacement-and-retention-strategies/index.html`

## Instructions

- make connector families easy to tell apart and clearly tied to integration use

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/harness_connector_types.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/harness_connector_types.svg.txt`
- replaced the visible `Harness Connector Types` placeholder in:
  - `mobile-electronics/sections/5-1-head-units-oem-replacement-and-retention-strategies/index.html`
- verification confirmed the target page now renders the SVG with real `<figure><img>` markup and an installer-facing caption
- verification confirmed the rendered harness-family comparison reads cleanly in static preview on `mobile-electronics/sections/5-1-head-units-oem-replacement-and-retention-strategies/`
- the graphic keeps the real lesson centered: identify the connector family, then use the correct adapter harness instead of cutting factory wiring
- note: the original mojibake placeholder description is fenced inside an HTML comment for now and should be removed entirely during the later encoding cleanup pass

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
