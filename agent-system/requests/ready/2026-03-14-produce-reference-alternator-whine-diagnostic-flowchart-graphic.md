scope: project
authority: working
project: ohmic-audio-static-content
status: ready
requested: 2026-03-14
requester: codex-local
origin: split
priority: soon
blocking: no
depends_on:
handoff_from:
claim_id:
topic: requested-task

# Produce `Alternator Whine Diagnostic Flowchart` graphic

## Requested Outcome

- create one reusable `Alternator Whine Diagnostic Flowchart` asset
- create it at:
  - `assets/engineering-diagrams/images/diagrams/alternator_whine_diagnostic_flowchart.svg`
- replace the placeholder in exactly these pages:
  - `reference/troubleshooting/alternator-whine/index.html`
  - `reference/troubleshooting/sections/7-2-noise-and-interference-troubleshooting/index.html`

## Asset Brief

- start at `whine present?`
- branch through engine on/off test
- branch through RCA disconnect test
- branch through ground-point checks
- end with corrective actions such as ground correction or noise filter

## Instructions

- use the shared figure pattern already used by the first-wave graphics insertions
- add a metadata sidecar if the asset family does not already have one
- replace only the `Alternator Whine Diagnostic Flowchart` placeholder family
- do not rewrite the rest of the troubleshooting section page during this task
- follow the verification steps in `B:\ohmic\docs\migration\STATIC_NEXT_WAVE_EXECUTION_GUIDE_2026-03-14.md`

## Ready When

- one asset exists and is reused in both target pages
- both placeholder markers are gone
