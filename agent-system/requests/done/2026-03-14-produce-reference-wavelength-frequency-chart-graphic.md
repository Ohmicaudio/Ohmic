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
claim_id: 20260314T110607Z-95477885
topic: requested-task

# Produce `Wavelength Frequency Chart` graphic

## Requested Outcome

- create one reusable `Wavelength Frequency Chart` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/wavelength_frequency_chart.svg`
- replace the placeholder in exactly these pages:
  - `reference/math-measurement/wavelength/index.html`
  - `reference/math-measurement/sections/6-2-acoustic-formulas/index.html`

## Asset Brief

- log-log wavelength vs frequency chart
- cover `20 Hz` through `20 kHz`
- mark car-relevant dimensions such as door width and cabin length

## Instructions

- keep the chart readable on both desktop and mobile widths
- use a true chart layout rather than a poster-style infographic
- replace only the `Wavelength Frequency Chart` placeholder family
- follow the verification steps in `B:\ohmic\docs\migration\STATIC_NEXT_WAVE_EXECUTION_GUIDE_2026-03-14.md`

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/wavelength_frequency_chart.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/wavelength_frequency_chart.svg.txt`
- replaced the `Wavelength Frequency Chart` placeholder block in:
  - `reference/math-measurement/wavelength/index.html`
  - `reference/math-measurement/sections/6-2-acoustic-formulas/index.html`
- verification confirmed both target pages now reuse the same SVG with real `<figure><img>` markup and captions
- verification confirmed the rendered chart looks correct in static preview on `reference/math-measurement/wavelength/`
- the chart uses a real log-log layout with car-dimension guide lines instead of a poster-style infographic

## Ready When

- one asset exists and is reused in both target pages
- both placeholder markers are gone
