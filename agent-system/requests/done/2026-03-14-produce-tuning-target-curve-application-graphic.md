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
handoff_from: 2026-03-14-split-second-wave-tuning-placeholder-graphics-from-qa.md
claim_id: 20260314T225448Z-8aebf634
topic: requested-task

# Produce `Target Curve Application` graphic

## Requested Outcome

- create one reusable `Target Curve Application` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/target_curve_application.svg`
- replace the placeholder in exactly these pages:
  - `tuning/sections/4-4-calibration-and-verification/index.html`

## Instructions

- show measured response, target curve, and the correction move together

## Completion

- created the reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/target_curve_application.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/target_curve_application.svg.txt`
- replaced the `Target Curve Application` placeholder block in:
  - `tuning/sections/4-4-calibration-and-verification/index.html`
- verification confirmed the target page now uses real `<figure><img>` markup and renders the measured-line, target-line, and correction-move relationship cleanly in local static preview
- the page now explains the target-curve workflow around honest measurement, useful correction, and not wasting boost on deep cancellation nulls

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
