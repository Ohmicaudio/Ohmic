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

# Reconcile static-content `reference/math-measurement` bucket

## Requested Outcome

- reconcile the `reference/math-measurement/*` static pages between `ohmic-audio-labs` and `ohmic-audio-static-content`
- keep the stronger technical reference copy in the static-host repo

## Scope

- `B:\ohmic\repos\ohmic-audio-labs\public\reference\math-measurement`
- `B:\ohmic\repos\ohmic-audio-static-content\public\reference\math-measurement`
- `B:\ohmic\docs\migration\STATIC_CONTENT_PARITY_AUDIT_2026-03-13.md`

## Notes

- differing files in this bucket: `38`
- this is a next-wave split from the larger `reference` parity surface
- examples include:
  - `reference/math-measurement/index.html`
  - `reference/math-measurement/ohms-law-and-power/index.html`
  - `reference/math-measurement/sections/6-6-measurement-procedures-and-standards/index.html`

## Ready When

- the canonical source is explicit for the bucket
- the reconciled `reference/math-measurement/*` pages live in `ohmic-audio-static-content`
- follow-up formula or diagram debt is captured separately if it is outside parity

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-audio-labs\public\reference\math-measurement`
- `B:\ohmic\repos\ohmic-audio-static-content\public\reference\math-measurement`
