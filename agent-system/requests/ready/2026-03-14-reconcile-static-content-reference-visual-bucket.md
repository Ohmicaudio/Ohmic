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

# Reconcile static-content `reference/visual` bucket

## Requested Outcome

- reconcile the `reference/visual/*` static pages between `ohmic-audio-labs` and `ohmic-audio-static-content`
- keep the stronger diagram-driven reference copy in the static-host repo

## Scope

- `B:\ohmic\repos\ohmic-audio-labs\public\reference\visual`
- `B:\ohmic\repos\ohmic-audio-static-content\public\reference\visual`
- `B:\ohmic\docs\migration\STATIC_CONTENT_PARITY_AUDIT_2026-03-13.md`

## Notes

- differing files in this bucket: `35`
- this is a next-wave split from the larger `reference` parity surface
- examples include:
  - `reference/visual/index.html`
  - `reference/visual/big-three-upgrade-diagram/index.html`
  - `reference/visual/sections/9-2-wiring-diagram-library/index.html`

## Ready When

- the canonical source is explicit for the bucket
- the reconciled `reference/visual/*` pages live in `ohmic-audio-static-content`
- follow-up graphics-production debt is captured separately if it is outside parity

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-audio-labs\public\reference\visual`
- `B:\ohmic\repos\ohmic-audio-static-content\public\reference\visual`
