scope: project
authority: working
project: ohmic-audio-static-content
status: done
requested: 2026-03-14
requester: codex-local
origin: dependency
priority: soon
blocking: no
depends_on:
handoff_from:
claim_id: 20260314T030539Z-55c0112e
topic: requested-task

# Reconcile static-content `dsp` bucket

## Requested Outcome

- reconcile the `dsp/*` static pages between `ohmic-audio-labs` and `ohmic-audio-static-content`
- preserve the best technical version for the static-host repo

## Completion

- full-bucket comparison confirmed `36` differing `dsp/*` files
- all `36` differences reduce to host metadata only
- no deeper content drift was found across the bucket
- `ohmic-audio-static-content/public/dsp` is the canonical kept side for this bucket
- no page-by-page content merge was required for `dsp`

## Scope

- `B:\ohmic\repos\ohmic-audio-labs\public\dsp`
- `B:\ohmic\repos\ohmic-audio-static-content\public\dsp`
- `B:\ohmic\docs\migration\STATIC_CONTENT_PARITY_AUDIT_2026-03-13.md`

## Notes

- differing files in this bucket: `36`
- this is one of the first recommended follow-on buckets after `meta`, `advanced-topics`, and `electrical`
- examples include:
  - `dsp/index.html`
  - `dsp/day-1-physical-installation-and-wiring/index.html`
  - `dsp/engineer-level-fir-filter-mathematics/index.html`
