scope: project
authority: working
project: ohmic-audio-static-content
status: ready
requested: 2026-03-14
requester: codex-local
origin: qa-followup
priority: soon
blocking: no
depends_on:
handoff_from: 2026-03-14-run-post-graphics-page-qa-reference
claim_id:
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

## Ready When

- one asset exists and is reused in both target pages
- both placeholder markers are gone
