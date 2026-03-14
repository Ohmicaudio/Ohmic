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

# Reconcile static-content `advanced-topics` bucket

## Requested Outcome

- reconcile the `advanced-topics/*` static pages between `ohmic-audio-labs` and `ohmic-audio-static-content`
- preserve the stronger content and remove unresolved duplication before any app-side prune

## Scope

- `B:\ohmic\repos\ohmic-audio-labs\public\advanced-topics`
- `B:\ohmic\repos\ohmic-audio-static-content\public\advanced-topics`
- `B:\ohmic\docs\migration\STATIC_CONTENT_PARITY_AUDIT_2026-03-13.md`

## Notes

- differing files in this bucket: `25`
- this is one of the first recommended reconciliation buckets
- examples include:
  - `advanced-topics/index.html`
  - `advanced-topics/sections/table-of-contents/index.html`
  - `advanced-topics/engineer-level-neural-networks-for-room-correction/index.html`

## Ready When

- the canonical source is explicit for the bucket
- the reconciled `advanced-topics` pages live in `ohmic-audio-static-content`
- any style/graphics debt discovered is captured as follow-up instead of lost

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-audio-labs\public\advanced-topics`
- `B:\ohmic\repos\ohmic-audio-static-content\public\advanced-topics`
