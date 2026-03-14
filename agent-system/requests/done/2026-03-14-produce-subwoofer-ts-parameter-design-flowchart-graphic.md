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
claim_id: 20260314T110530Z-de48a9dd
topic: requested-task

# Produce `T/S Parameter Design Flowchart` graphic

## Requested Outcome

- create one reusable `T/S Parameter Design Flowchart` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/ts_parameter_design_flowchart.svg`
- replace the placeholder in exactly these pages:
  - `subwoofer-enclosures/index.html`
  - `subwoofer-enclosures/installer-level-ts-parameter-based-selection/index.html`
  - `subwoofer-enclosures/sections/10-1-driver-selection-for-enclosure-type/index.html`

## Instructions

- flow from Qts through enclosure recommendation
- keep branch labels explicit and practical
- remove only the matching placeholder family

## Completion

- created reusable asset:
  - `public/assets/engineering-diagrams/images/diagrams/ts_parameter_design_flowchart.svg`
- created metadata sidecar:
  - `public/assets/engineering-diagrams/metadata/ts_parameter_design_flowchart.svg.txt`
- replaced the matching placeholder family in:
  - `public/subwoofer-enclosures/installer-level-ts-parameter-based-selection/index.html`
  - `public/subwoofer-enclosures/sections/10-1-driver-selection-for-enclosure-type/index.html`
- replaced the raw placeholder summary in:
  - `public/subwoofer-enclosures/index.html`
- local static repo commit:
  - `6696e05` `Add T/S parameter design flowchart graphic`
- remote push was not completed from this shell because GitHub HTTPS auth is unavailable here

## Ready When

- one asset exists and is reused in the target pages
- matching placeholder markers are gone
