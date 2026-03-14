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
claim_id: 20260314T114922Z-19cdb6a5
topic: requested-task

# Produce `Slot Port Detail` graphic

## Requested Outcome

- create one reusable `Slot Port Detail` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/slot_port_detail.svg`
- replace the placeholder in exactly these pages:
  - `subwoofer-enclosures/installer-level-port-design-and-construction/index.html`
  - `subwoofer-enclosures/sections/10-3-ported-enclosure-advanced-design/index.html`

## Instructions

- show port walls, termination, and airflow path clearly
- keep the cross-section practical for build understanding

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/slot_port_detail.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/slot_port_detail.svg.txt`
- replaced the `Slot Port Detail` placeholder block in:
  - `subwoofer-enclosures/installer-level-port-design-and-construction/index.html`
  - `subwoofer-enclosures/sections/10-3-ported-enclosure-advanced-design/index.html`
- verification confirmed both target pages now reuse the same SVG with real `<figure><img>` markup and captions
- verification confirmed the rendered slot-port detail looks correct in static preview on `subwoofer-enclosures/installer-level-port-design-and-construction/`
- unrelated placeholder families in the advanced-design section were left untouched for their own follow-up tasks

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
