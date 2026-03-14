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

# Produce `Big Three Upgrade Diagram` graphic

## Requested Outcome

- create one reusable `Big Three Upgrade Diagram` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/big_three_upgrade_diagram.svg`
- replace the placeholder in exactly these pages:
  - `reference/visual/big-three-upgrade-diagram/index.html`
  - `reference/visual/sections/9-4-electrical-reference-diagrams/index.html`

## Asset Brief

- engine-bay wiring diagram showing alternator positive to battery positive, battery negative to chassis, and engine block to chassis
- distinguish upgrade cables from factory wiring
- label recommended wire size and explain that the upgrade supports higher current with less voltage drop

## Instructions

- replace only the `Big Three Upgrade Diagram` placeholder family
- do not also consume the `Full Electrical System Diagram`, `Fuse Type Reference Chart`, or `Proper Ground Point Preparation` placeholders on the section page
- add a metadata sidecar if the asset family does not already have one
- follow the verification steps in `B:\ohmic\docs\migration\STATIC_NEXT_WAVE_EXECUTION_GUIDE_2026-03-14.md`

## Ready When

- one asset exists and is reused in both target pages
- both placeholder markers are gone
