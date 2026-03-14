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
claim_id: 20260314T115209Z-f3174bb3
topic: requested-task

# Produce `4th Order Bandpass Diagram` graphic

## Requested Outcome

- create one reusable `4th Order Bandpass Diagram` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/fourth_order_bandpass_diagram.svg`
- replace the placeholder in exactly these pages:
  - `subwoofer-enclosures/beginner-level-when-to-use-specialty-enclosures/index.html`
  - `subwoofer-enclosures/sections/10-4-bandpass-and-specialty-enclosures/index.html`

## Instructions

- show sealed rear chamber, center driver baffle, and ported front chamber
- keep chamber labels and airflow path clear

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/fourth_order_bandpass_diagram.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/fourth_order_bandpass_diagram.svg.txt`
- replaced the `4th Order Bandpass Diagram` placeholder block in:
  - `subwoofer-enclosures/beginner-level-when-to-use-specialty-enclosures/index.html`
  - `subwoofer-enclosures/sections/10-4-bandpass-and-specialty-enclosures/index.html`
- verification confirmed both target pages now reuse the same SVG with real `<figure><img>` markup and captions
- verification confirmed the rendered bandpass diagram looks correct in static preview on `subwoofer-enclosures/beginner-level-when-to-use-specialty-enclosures/`
- surrounding wording was adjusted only enough to keep the diagram explanation understandable; a broader content simplification pass is intentionally deferred

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
