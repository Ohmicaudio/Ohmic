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

# Reconcile static-content `electrical` bucket

## Requested Outcome

- reconcile the `electrical/*` static pages between `ohmic-audio-labs` and `ohmic-audio-static-content`
- keep the more technically correct and higher-quality version of each page

## Scope

- `B:\ohmic\repos\ohmic-audio-labs\public\electrical`
- `B:\ohmic\repos\ohmic-audio-static-content\public\electrical`
- `B:\ohmic\docs\migration\STATIC_CONTENT_PARITY_AUDIT_2026-03-13.md`

## Notes

- differing files in this bucket: `26`
- this is one of the first recommended reconciliation buckets
- examples include:
  - `electrical/index.html`
  - `electrical/beginner-level-what-batteries-do/index.html`
  - `electrical/engineer-level-ultracapacitors/index.html`

## Ready When

- the canonical source is explicit for the bucket
- the reconciled `electrical` pages live in `ohmic-audio-static-content`
- follow-up gaps are captured if the parity pass exposes style or graphics debt

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-audio-labs\public\electrical`
- `B:\ohmic\repos\ohmic-audio-static-content\public\electrical`
