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
claim_id: 20260314T114610Z-8e5b6dcd
topic: requested-task

# Produce `Ported Enclosure Diagram` graphic

## Requested Outcome

- create one reusable `Ported Enclosure Diagram` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/ported_enclosure_diagram.svg`
- replace the placeholder in exactly these pages:
  - `subwoofer-enclosures/beginner-level-how-ports-work/index.html`
  - `subwoofer-enclosures/sections/10-3-ported-enclosure-advanced-design/index.html`

## Instructions

- show cabinet, driver, port, and airflow path
- make the basic signal/airflow relationship obvious to beginners

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/ported_enclosure_diagram.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/ported_enclosure_diagram.svg.txt`
- replaced the `Ported Enclosure Diagram` placeholder block in:
  - `subwoofer-enclosures/beginner-level-how-ports-work/index.html`
  - `subwoofer-enclosures/sections/10-3-ported-enclosure-advanced-design/index.html`
- verification confirmed both target pages now reuse the same SVG with real `<figure><img>` markup and captions
- verification confirmed the rendered ported-box diagram looks correct in static preview on `subwoofer-enclosures/beginner-level-how-ports-work/`
- unrelated placeholder families in the advanced-design section, including the slot-port detail, were left untouched for their own follow-up tasks

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
