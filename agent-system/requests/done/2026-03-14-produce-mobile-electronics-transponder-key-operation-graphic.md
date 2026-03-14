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
claim_id: 20260314T195013Z-f5d4d005
topic: requested-task

# Produce `Transponder Key Operation` graphic

## Requested Outcome

- create one reusable `Transponder Key Operation` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/transponder_key_operation.svg`
- replace the placeholder in exactly these pages:
  - `mobile-electronics/sections/5-6-remote-start-security-and-smart-vehicle-integration/index.html`

## Instructions

- explain the immobilizer / key-auth idea clearly without oversimplifying it into fake universal behavior

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/transponder_key_operation.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/transponder_key_operation.svg.txt`
- replaced the `Transponder Key Operation` placeholder block in:
  - `mobile-electronics/sections/5-6-remote-start-security-and-smart-vehicle-integration/index.html`
- verification confirmed the target page now reuses the SVG with real `<figure><img>` markup and an engineer-facing caption
- verification confirmed the rendered immobilizer diagram reads cleanly in static preview on `mobile-electronics/sections/5-6-remote-start-security-and-smart-vehicle-integration/`
- the graphic keeps the real teaching point intact: the common auth pattern is clear, but the note explicitly avoids pretending every transponder-key system uses one universal protocol

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
