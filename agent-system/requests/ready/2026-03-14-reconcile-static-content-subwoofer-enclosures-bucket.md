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

# Reconcile static-content `subwoofer-enclosures` bucket

## Requested Outcome

- reconcile the `subwoofer-enclosures/*` static pages between `ohmic-audio-labs` and `ohmic-audio-static-content`
- keep the stronger enclosure-design and troubleshooting copy in the static-host repo

## Scope

- `B:\ohmic\repos\ohmic-audio-labs\public\subwoofer-enclosures`
- `B:\ohmic\repos\ohmic-audio-static-content\public\subwoofer-enclosures`
- `B:\ohmic\docs\migration\STATIC_CONTENT_PARITY_AUDIT_2026-03-13.md`

## Notes

- differing files in this bucket: `35`
- this is one of the remaining unsplit top-level parity buckets after the first-wave closures
- examples include:
  - `subwoofer-enclosures/index.html`
  - `subwoofer-enclosures/complete-build-example-12-sealed-subwoofer-for-daily-driver/index.html`
  - `subwoofer-enclosures/sections/10-6-advanced-subwoofer-integration/index.html`

## Ready When

- the canonical source is explicit for the bucket
- the reconciled `subwoofer-enclosures/*` pages live in `ohmic-audio-static-content`
- follow-up graphics or blueprint debt is captured separately if it is outside parity

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-audio-labs\public\subwoofer-enclosures`
- `B:\ohmic\repos\ohmic-audio-static-content\public\subwoofer-enclosures`
