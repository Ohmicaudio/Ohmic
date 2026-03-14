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
claim_id: 20260314T113556Z-f7341ed5
topic: requested-task

# Produce `Sealed Enclosure Diagram` graphic

## Requested Outcome

- create one reusable `Sealed Enclosure Diagram` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/sealed_enclosure_diagram.svg`
- replace the placeholder in exactly these pages:
  - `subwoofer-enclosures/beginner-level-choosing-the-right-subwoofer/index.html`
  - `subwoofer-enclosures/sections/10-1-driver-selection-for-enclosure-type/index.html`

## Instructions

- keep the enclosure anatomy simple and beginner-readable
- emphasize the air-spring behavior and closed-box structure

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/sealed_enclosure_diagram.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/sealed_enclosure_diagram.svg.txt`
- replaced the `Sealed Enclosure Diagram` placeholder block in:
  - `subwoofer-enclosures/beginner-level-choosing-the-right-subwoofer/index.html`
  - `subwoofer-enclosures/sections/10-1-driver-selection-for-enclosure-type/index.html`
- verification confirmed both target pages now reuse the same SVG with real `<figure><img>` markup and captions
- verification confirmed the rendered sealed-box diagram looks correct in static preview on `subwoofer-enclosures/beginner-level-choosing-the-right-subwoofer/`
- unrelated placeholder families in the section page, including the competition comparison chart, were left untouched for their own follow-up tasks

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
