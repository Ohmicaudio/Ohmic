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

# Reconcile static-content `appendix/reference-tables` bucket

## Requested Outcome

- reconcile the `appendix/reference-tables/*` static pages between `ohmic-audio-labs` and `ohmic-audio-static-content`
- keep the stronger quick-reference table copy in the static-host repo

## Scope

- `B:\ohmic\repos\ohmic-audio-labs\public\appendix\reference-tables`
- `B:\ohmic\repos\ohmic-audio-static-content\public\appendix\reference-tables`
- `B:\ohmic\docs\migration\STATIC_CONTENT_PARITY_AUDIT_2026-03-13.md`

## Notes

- differing files in this bucket: `26`
- this is a next-wave split from the larger `appendix` parity surface
- examples include:
  - `appendix/reference-tables/index.html`
  - `appendix/reference-tables/table-a-1-american-wire-gauge-awg-specifications/index.html`
  - `appendix/reference-tables/sections/decibel-reference-chart/index.html`

## Ready When

- the canonical source is explicit for the bucket
- the reconciled `appendix/reference-tables/*` pages live in `ohmic-audio-static-content`
- table-format or graphics debt is captured separately if it is outside parity

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-audio-labs\public\appendix\reference-tables`
- `B:\ohmic\repos\ohmic-audio-static-content\public\appendix\reference-tables`
