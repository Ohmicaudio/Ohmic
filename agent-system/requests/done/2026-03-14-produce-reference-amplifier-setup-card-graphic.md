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
claim_id: 20260314T061134Z-4753cf3d
topic: requested-task

# Produce `Amplifier Setup Quick Reference` graphic

## Requested Outcome

- create one reusable `Amplifier Setup Quick Reference` asset
- replace the placeholder in exactly these pages:
  - `reference/visual/amplifier-setup-card/index.html`
  - `reference/visual/index.html`

## Completion

- created one reusable SVG asset: `public/assets/engineering-diagrams/images/diagrams/amplifier_setup_quick_reference.svg`
- replaced the placeholder block in both requested pages with real `<figure><img>` markup
- reused the same asset in:
  - `reference/visual/amplifier-setup-card/index.html`
  - `reference/visual/index.html`
- verification confirmed the target amplifier-setup placeholder is gone from both target pages
- verification confirmed the new figure renders cleanly in static preview on `reference/visual/amplifier-setup-card/`
- unrelated placeholder entries still remain elsewhere in `reference/visual/index.html` and were left for their own follow-up tasks

## Ready When

- one asset exists and is reused in both target pages
- both placeholder markers are gone
