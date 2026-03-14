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
claim_id: 20260314T121320Z-ecf521bb
topic: requested-task

# Produce `Sealed Box Blueprint 12inch` graphic

## Requested Outcome

- create one reusable `Sealed Box Blueprint 12inch` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/sealed_box_blueprint_12inch.svg`
- replace the placeholder in exactly these pages:
  - `subwoofer-enclosures/beginner-level-getting-sealed-right/index.html`
  - `subwoofer-enclosures/sections/10-2-advanced-sealed-enclosure-design/index.html`

## Instructions

- use a blueprint layout with dimensions and panel thicknesses
- keep the drawing practical for actual build reference

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/sealed_box_blueprint_12inch.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/sealed_box_blueprint_12inch.svg.txt`
- replaced the `Sealed Box Blueprint 12inch` placeholder block in:
  - `subwoofer-enclosures/beginner-level-getting-sealed-right/index.html`
  - `subwoofer-enclosures/sections/10-2-advanced-sealed-enclosure-design/index.html`
- verification confirmed both target pages now reuse the same SVG with real `<figure><img>` markup and captions
- verification confirmed the rendered sealed-box blueprint looks correct in static preview on `subwoofer-enclosures/beginner-level-getting-sealed-right/`

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
