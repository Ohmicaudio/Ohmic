scope: project
authority: working
project: ohmic-audio-static-content
status: ready
requested: 2026-03-14
requester: codex-local
origin: dependency
priority: now
blocking: yes
depends_on:
handoff_from:
claim_id: 20260314T030539Z-55c0112e
topic: requested-task

# Reconcile static-content `meta` bucket

## Requested Outcome

- reconcile the `meta/*` static pages between `ohmic-audio-labs` and `ohmic-audio-static-content`
- decide which side is canonical page-by-page where content differs
- leave `ohmic-audio-static-content` as the trusted destination for the reconciled `meta` pages

## Scope

- `B:\ohmic\repos\ohmic-audio-labs\public\meta`
- `B:\ohmic\repos\ohmic-audio-static-content\public\meta`
- `B:\ohmic\docs\migration\STATIC_CONTENT_PARITY_AUDIT_2026-03-13.md`

## Notes

- differing files in this bucket: `71`
- this is a high-visibility bucket because it includes glossary/meta navigation and wiki landing surfaces
- examples include:
  - `meta/a/index.html`
  - `meta/appendix-a-quick-reference-tables/index.html`
  - `meta/ohmic-audio-labs-car-audio-wiki/index.html`

## Ready When

- the canonical source is explicit for the bucket
- the reconciled `meta` pages live in `ohmic-audio-static-content`
- follow-up drift, style, or graphics gaps are captured if they are outside the parity pass

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-audio-labs\public\meta`
- `B:\ohmic\repos\ohmic-audio-static-content\public\meta`
