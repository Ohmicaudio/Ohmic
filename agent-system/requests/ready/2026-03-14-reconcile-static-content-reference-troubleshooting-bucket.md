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

# Reconcile static-content `reference/troubleshooting` bucket

## Requested Outcome

- reconcile the `reference/troubleshooting/*` static pages between `ohmic-audio-labs` and `ohmic-audio-static-content`
- keep the stronger troubleshooting and symptom-routing copy in the static-host repo

## Scope

- `B:\ohmic\repos\ohmic-audio-labs\public\reference\troubleshooting`
- `B:\ohmic\repos\ohmic-audio-static-content\public\reference\troubleshooting`
- `B:\ohmic\docs\migration\STATIC_CONTENT_PARITY_AUDIT_2026-03-13.md`

## Notes

- differing files in this bucket: `30`
- this is a next-wave split from the larger `reference` parity surface
- examples include:
  - `reference/troubleshooting/index.html`
  - `reference/troubleshooting/alternator-whine/index.html`
  - `reference/troubleshooting/sections/7-2-noise-and-interference-troubleshooting/index.html`

## Ready When

- the canonical source is explicit for the bucket
- the reconciled `reference/troubleshooting/*` pages live in `ohmic-audio-static-content`
- follow-up symptom-visual or flowchart debt is captured separately if exposed

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-audio-labs\public\reference\troubleshooting`
- `B:\ohmic\repos\ohmic-audio-static-content\public\reference\troubleshooting`
