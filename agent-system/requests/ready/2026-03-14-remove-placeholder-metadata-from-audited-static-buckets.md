scope: project
authority: working
project: ohmic-audio-static-content
status: ready
requested: 2026-03-14
requester: codex-local
origin: follow-up
priority: now
blocking: no
depends_on:
handoff_from:
claim_id:
topic: requested-task

# Remove placeholder metadata from audited static buckets

## Requested Outcome

- remove `[VISUAL PLACEHOLDER: ...]` text from HTML metadata fields in already-audited static buckets
- replace placeholder-driven meta descriptions with clean, human-readable summaries

## Scope

- `B:\ohmic\repos\ohmic-audio-static-content\public\mobile-electronics`
- `B:\ohmic\repos\ohmic-audio-static-content\public\tuning`
- `B:\ohmic\repos\ohmic-audio-static-content\public\reference`

## Notes

- this is a metadata/SEO cleanup task, not a parity task
- known placeholder meta leak counts:
  - `mobile-electronics`: `7`
  - `tuning`: `4`
  - `reference`: `31`
- representative affected pages:
  - `mobile-electronics/beginner-level-understanding-digital-audio/index.html`
  - `mobile-electronics/sections/5-3-digital-audio-sources-formats-and-quality/index.html`
  - `tuning/beginner-level-understanding-dsp-hardware/index.html`
  - `tuning/sections/4-5-advanced-dsp-programming/index.html`
  - `reference/visual/amplifier-setup-card/index.html`
  - `reference/visual/sections/9-2-wiring-diagram-library/index.html`

## Ready When

- no audited static page still exposes placeholder text in `<meta name="description">`
- replacement metadata is short, readable, and aligned with the page topic

