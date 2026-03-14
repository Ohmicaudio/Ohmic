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
claim_id: 20260314T111303Z-5e39610f
topic: requested-task

# Run post-graphics page QA for `reference`

## Requested Outcome

- verify that inserted graphics in `reference/*` do not break page quality
- capture any remaining layout, alt-text, caption, or leftover-placeholder defects

## Scope

- `B:\ohmic\repos\ohmic-audio-static-content\public\reference`
- `B:\ohmic\docs\migration\STATIC_POST_GRAPHICS_FINISHING_PLAYBOOK_2026-03-14.md`

## Instructions

- check edited topic pages, visual-reference pages, and section pages
- verify figure sizing, caption quality, alt text, and leftover placeholder text
- keep this as QA, not a bucket-wide rewrite pass

## Completion

- checked these topic and visual pages:
  - `reference/math-measurement/ohms-law-and-power/index.html`
  - `reference/visual/amplifier-setup-card/index.html`
  - `reference/visual/speaker-anatomy-cross-section/index.html`
  - `reference/troubleshooting/alternator-whine/index.html`
  - `reference/math-measurement/wavelength/index.html`
  - `reference/visual/complete-electrical-system-overview/index.html`
- checked these section and index surfaces for the inserted figure families:
  - `reference/math-measurement/sections/6-1-electrical-formulas/index.html`
  - `reference/math-measurement/sections/6-2-acoustic-formulas/index.html`
  - `reference/troubleshooting/sections/7-2-noise-and-interference-troubleshooting/index.html`
  - `reference/visual/sections/9-3-speaker-and-enclosure-reference-diagrams/index.html`
  - `reference/visual/sections/9-4-electrical-reference-diagrams/index.html`
  - `reference/visual/index.html`
- verified all six first-wave reference assets exist and the checked topic pages return `200` in local static preview
- verified the inserted figure families have real `<img>` and `<figcaption>` markup and no leftover target placeholder markers on the pages they were meant to replace
- confirmed UTF-8 file reads of the checked reference pages do not show real replacement-character or mojibake defects; earlier PowerShell rendering noise was not treated as a source defect
- recorded the remaining explicit follow-up gaps by queuing:
  - `2026-03-14-produce-reference-fuse-type-reference-chart-graphic.md`
  - `2026-03-14-produce-reference-proper-ground-point-preparation-graphic.md`
  - `2026-03-14-produce-reference-big-three-upgrade-diagram-graphic.md`
- existing remaining placeholder families on `reference/visual/index.html` and `reference/visual/sections/9-3-speaker-and-enclosure-reference-diagrams/index.html` were already covered by the subwoofer graphics queue and were not reopened here

## Ready When

- the checked pages are listed
- any defects are fixed or queued explicitly
