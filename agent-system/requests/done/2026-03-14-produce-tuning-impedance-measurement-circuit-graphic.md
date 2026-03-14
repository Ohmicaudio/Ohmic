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
claim_id: 20260314T205735Z-33dc455a
topic: requested-task

# Produce `Impedance Measurement Circuit` graphic

## Requested Outcome

- create one reusable `Impedance Measurement Circuit` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/impedance_measurement_circuit.svg`
- replace the placeholder in exactly these pages:
  - `tuning/sections/4-3-using-measurement-tools-and-software/index.html`

## Instructions

- keep the circuit readable and reference-friendly

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/impedance_measurement_circuit.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/impedance_measurement_circuit.svg.txt`
- replaced the `Impedance Measurement Circuit` placeholder block in:
  - `tuning/sections/4-3-using-measurement-tools-and-software/index.html`
- verification confirmed the target page now uses real `<figure><img>` markup and renders the schematic cleanly in local static preview
- the diagram stays reference-first instead of decorative: output through a known resistor, V1 before the resistor, V2 across the speaker, shared return path

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
