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
claim_id: 20260314T111827Z-766c3284
topic: requested-task

# Produce `Fuse Type Reference Chart` graphic

## Requested Outcome

- create one reusable `Fuse Type Reference Chart` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/fuse_type_reference_chart.svg`
- replace the placeholder in exactly these pages:
  - `reference/visual/fuse-types-and-applications/index.html`
  - `reference/visual/sections/9-4-electrical-reference-diagrams/index.html`

## Asset Brief

- compare mini blade, regular blade, maxi blade, MIDI, ANL, and AGU fuse families
- label normal current ranges and common install use cases
- make selection guidance readable at reference-page scale, not poster scale

## Instructions

- replace only the `Fuse Type Reference Chart` placeholder family
- do not also consume the `Full Electrical System Diagram`, `Proper Ground Point Preparation`, or `Big Three Upgrade Diagram` placeholders on the section page
- add a metadata sidecar if the asset family does not already have one
- follow the verification steps in `B:\ohmic\docs\migration\STATIC_NEXT_WAVE_EXECUTION_GUIDE_2026-03-14.md`

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/fuse_type_reference_chart.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/fuse_type_reference_chart.svg.txt`
- replaced the `Fuse Type Reference Chart` placeholder block in:
  - `reference/visual/fuse-types-and-applications/index.html`
  - `reference/visual/sections/9-4-electrical-reference-diagrams/index.html`
- verification confirmed both target pages now reuse the same SVG with real `<figure><img>` markup and captions
- verification confirmed the rendered chart looks correct in static preview on `reference/visual/fuse-types-and-applications/`
- the other electrical placeholder families in the section page were left untouched for their own follow-up tasks

## Ready When

- one asset exists and is reused in both target pages
- both placeholder markers are gone
