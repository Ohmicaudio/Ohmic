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
claim_id: 20260314T121019Z-f1144dcf
topic: requested-task

# Produce `Sealed Box Panel Layout` graphic

## Requested Outcome

- create one reusable `Sealed Box Panel Layout` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/sealed_box_panel_layout.svg`
- replace the placeholder in exactly these pages:
  - `subwoofer-enclosures/installer-level-advanced-construction/index.html`
  - `subwoofer-enclosures/sections/10-5-enclosure-construction-techniques/index.html`

## Instructions

- show sheet layout and cut optimization clearly
- keep dimensions legible and construction-focused

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/sealed_box_panel_layout.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/sealed_box_panel_layout.svg.txt`
- replaced the `Sealed Box Panel Layout` placeholder block in:
  - `subwoofer-enclosures/installer-level-advanced-construction/index.html`
  - `subwoofer-enclosures/sections/10-5-enclosure-construction-techniques/index.html`
- verification confirmed both target pages now reuse the same SVG with real `<figure><img>` markup and captions
- verification confirmed the rendered panel-layout diagram looks correct in static preview on `subwoofer-enclosures/installer-level-advanced-construction/`

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
