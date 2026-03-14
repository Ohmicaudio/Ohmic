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

# Reconcile static-content `appendix/glossary` bucket

## Requested Outcome

- reconcile the `appendix/glossary/*` static pages between `ohmic-audio-labs` and `ohmic-audio-static-content`
- keep the stronger glossary and glossary-routing copy in the static-host repo

## Scope

- `B:\ohmic\repos\ohmic-audio-labs\public\appendix\glossary`
- `B:\ohmic\repos\ohmic-audio-static-content\public\appendix\glossary`
- `B:\ohmic\docs\migration\STATIC_CONTENT_PARITY_AUDIT_2026-03-13.md`

## Notes

- differing files in this bucket: `45`
- this is a next-wave split from the larger `appendix` parity surface
- examples include:
  - `appendix/glossary/index.html`
  - `appendix/glossary/a/index.html`
  - `appendix/glossary/sections/how-to-use-this-glossary/index.html`

## Ready When

- the canonical source is explicit for the bucket
- the reconciled `appendix/glossary/*` pages live in `ohmic-audio-static-content`
- any glossary-specific style or terminology debt is captured separately if it is outside parity

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-audio-labs\public\appendix\glossary`
- `B:\ohmic\repos\ohmic-audio-static-content\public\appendix\glossary`
