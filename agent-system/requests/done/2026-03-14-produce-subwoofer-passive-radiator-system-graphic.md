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
handoff_from: 2026-03-14-split-second-wave-subwoofer-enclosures-placeholder-graphics-from-encoding-scan.md
claim_id: 20260314T120345Z-df12dd09
topic: requested-task

# Produce `Passive Radiator System` graphic

## Requested Outcome

- create one reusable `Passive Radiator System` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/passive_radiator_system.svg`
- replace the placeholder in exactly these pages:
  - `subwoofer-enclosures/engineer-level-transmission-line-and-passive-radiator-theory/index.html`
  - `subwoofer-enclosures/sections/10-4-bandpass-and-specialty-enclosures/index.html`

## Instructions

- show active driver plus passive radiator relationship clearly
- favor sectioned technical clarity over stylized marketing visuals

## Completion

- created one reusable SVG asset at `public/assets/engineering-diagrams/images/diagrams/passive_radiator_system.svg`
- added the paired metadata sidecar at `public/assets/engineering-diagrams/metadata/passive_radiator_system.svg.txt`
- replaced the `Passive Radiator System` placeholder block in:
  - `subwoofer-enclosures/engineer-level-transmission-line-and-passive-radiator-theory/index.html`
  - `subwoofer-enclosures/sections/10-4-bandpass-and-specialty-enclosures/index.html`
- verification confirmed both target pages now reuse the same SVG with real `<figure><img>` markup and captions
- verification confirmed the rendered passive-radiator diagram looks correct in static preview on `subwoofer-enclosures/engineer-level-transmission-line-and-passive-radiator-theory/`

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
