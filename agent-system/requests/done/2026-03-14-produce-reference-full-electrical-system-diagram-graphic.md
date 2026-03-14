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
handoff_from:
claim_id: 20260314T110907Z-5c9eb7f5
topic: requested-task

# Produce `Full Electrical System Diagram` graphic

## Requested Outcome

- create one reusable `Full Electrical System Diagram` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/full_electrical_system_diagram.svg`
- replace the placeholder in exactly these pages:
  - `reference/visual/complete-electrical-system-overview/index.html`
  - `reference/visual/sections/9-4-electrical-reference-diagrams/index.html`

## Asset Brief

- alternator -> battery -> main fuse -> distribution block -> individual amplifier fuses -> amplifiers
- show ground paths from each amp to chassis to battery
- show remote turn-on chain from head unit
- label wire gauges and fuse ratings

## Instructions

- replace only the `Full Electrical System Diagram` placeholder family
- do not also consume the `Fuse Type Reference Chart`, `Proper Ground Point Preparation`, or `Big Three Upgrade Diagram` placeholders on the section page
- keep labels practical and serviceable, not overly decorative
- follow the verification steps in `B:\ohmic\docs\migration\STATIC_NEXT_WAVE_EXECUTION_GUIDE_2026-03-14.md`

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/full_electrical_system_diagram.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/full_electrical_system_diagram.svg.txt`
- replaced the `Full Electrical System Diagram` placeholder block in:
  - `reference/visual/complete-electrical-system-overview/index.html`
  - `reference/visual/sections/9-4-electrical-reference-diagrams/index.html`
- verification confirmed both target pages now reuse the same SVG with real `<figure><img>` markup and captions
- verification confirmed the rendered diagram looks correct in static preview on `reference/visual/complete-electrical-system-overview/`
- the other placeholder families in the electrical section page were left untouched for their own follow-up tasks

## Ready When

- one asset exists and is reused in both target pages
- both placeholder markers are gone
