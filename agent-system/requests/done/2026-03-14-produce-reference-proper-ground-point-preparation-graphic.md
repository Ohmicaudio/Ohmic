scope: project
authority: working
project: ohmic-audio-static-content
status: done
requested: 2026-03-14
requester: codex-local
origin: qa-followup
priority: soon
blocking: no
depends_on:
handoff_from: 2026-03-14-run-post-graphics-page-qa-reference
claim_id: 20260314T112351Z-88ca0a6d
topic: requested-task

# Produce `Proper Ground Point Preparation` graphic

## Requested Outcome

- create one reusable `Proper Ground Point Preparation` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/proper_ground_point_preparation.svg`
- replace the placeholder in exactly these pages:
  - `reference/visual/ground-point-reference/index.html`
  - `reference/visual/sections/9-4-electrical-reference-diagrams/index.html`

## Asset Brief

- step-by-step grounding prep sequence
- include bare-metal prep, drilling or locating the fastener point, star washer use, ring terminal seating, torque, and corrosion protection
- keep it instructional and installer-friendly

## Instructions

- replace only the `Proper Ground Point Preparation` placeholder family
- do not also consume the `Full Electrical System Diagram`, `Fuse Type Reference Chart`, or `Big Three Upgrade Diagram` placeholders on the section page
- add a metadata sidecar if the asset family does not already have one
- follow the verification steps in `B:\ohmic\docs\migration\STATIC_NEXT_WAVE_EXECUTION_GUIDE_2026-03-14.md`

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/proper_ground_point_preparation.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/proper_ground_point_preparation.svg.txt`
- replaced the `Proper Ground Point Preparation` placeholder block in:
  - `reference/visual/ground-point-reference/index.html`
  - `reference/visual/sections/9-4-electrical-reference-diagrams/index.html`
- verification confirmed both target pages now reuse the same SVG with real `<figure><img>` markup and captions
- verification confirmed the rendered step sequence looks correct in static preview on `reference/visual/ground-point-reference/`
- the other electrical placeholder families in the section page were left untouched for their own follow-up tasks

## Ready When

- one asset exists and is reused in both target pages
- both placeholder markers are gone
