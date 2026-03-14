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
handoff_from: 2026-03-14-split-second-wave-mobile-electronics-placeholder-graphics-from-qa.md
claim_id: 20260314T194651Z-b45386ca
topic: requested-task

# Produce `Shock Sensor Calibration` graphic

## Requested Outcome

- create one reusable `Shock Sensor Calibration` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/shock_sensor_calibration.svg`
- replace the placeholder in exactly these pages:
  - `mobile-electronics/sections/5-6-remote-start-security-and-smart-vehicle-integration/index.html`

## Instructions

- show warn vs trigger thresholds clearly enough to prevent misunderstanding

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/shock_sensor_calibration.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/shock_sensor_calibration.svg.txt`
- replaced the `Shock Sensor Calibration` placeholder block in:
  - `mobile-electronics/sections/5-6-remote-start-security-and-smart-vehicle-integration/index.html`
- verification confirmed the target page now reuses the SVG with real `<figure><img>` markup and an installer-facing caption
- verification confirmed the rendered calibration diagram reads cleanly in static preview on `mobile-electronics/sections/5-6-remote-start-security-and-smart-vehicle-integration/`
- the chart keeps the real lesson centered: two-stage sensors need a warning zone and a full-alarm zone, and “most sensitive” is not the same thing as “best tuned”

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
