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
claim_id: 20260314T220620Z-82ab933a
topic: requested-task

# Produce `Factory Integration DSP Diagram` graphic

## Requested Outcome

- create one reusable `Factory Integration DSP Diagram` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/factory_integration_dsp_diagram.svg`
- replace the placeholder in exactly these pages:
  - `tuning/sections/4-5-advanced-dsp-programming/index.html`

## Instructions

- show OEM source, integration interface, DSP, amplification, and speaker outputs clearly

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/factory_integration_dsp_diagram.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/factory_integration_dsp_diagram.svg.txt`
- replaced the `Factory Integration DSP Diagram` placeholder block in:
  - `tuning/sections/4-5-advanced-dsp-programming/index.html`
- verification confirmed the target page now uses real `<figure><img>` markup and renders the OEM-to-DSP-to-amp flow cleanly in local static preview
- the diagram keeps the integration story practical: factory speaker-level output in, cleanup and summing in the DSP front end, then clean aftermarket routing out

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
