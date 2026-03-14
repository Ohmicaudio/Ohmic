scope: project
authority: working
project: ohmic-audio-static-content
status: ready
requested: 2026-03-14
requester: codex-local
origin: dependency
priority: soon
blocking: no
depends_on:
handoff_from:
claim_id: 20260314T032411Z-1ded7c5f
topic: requested-task

# Reconcile static-content `competition` bucket

## Requested Outcome

- reconcile the `competition/*` static pages between `ohmic-audio-labs` and `ohmic-audio-static-content`
- keep the stronger competition-oriented build and judging copy in the static-host repo

## Scope

- `B:\ohmic\repos\ohmic-audio-labs\public\competition`
- `B:\ohmic\repos\ohmic-audio-static-content\public\competition`
- `B:\ohmic\docs\migration\STATIC_CONTENT_PARITY_AUDIT_2026-03-13.md`

## Notes

- differing files in this bucket: `19`
- this is one of the remaining unsplit top-level parity buckets after the first-wave closures
- examples include:
  - `competition/index.html`
  - `competition/competition-day-procedures/index.html`
  - `competition/sections/13-2-sound-quality-competition-strategy/index.html`

## Ready When

- the canonical source is explicit for the bucket
- the reconciled `competition/*` pages live in `ohmic-audio-static-content`
- any follow-up diagram or event-day checklist debt is captured separately if exposed

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-audio-labs\public\competition`
- `B:\ohmic\repos\ohmic-audio-static-content\public\competition`
