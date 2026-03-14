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

# Reconcile static-content `appendix/manufacturers` bucket

## Requested Outcome

- reconcile the `appendix/manufacturers/*` static pages between `ohmic-audio-labs` and `ohmic-audio-static-content`
- keep the stronger manufacturer-directory and routing copy in the static-host repo

## Scope

- `B:\ohmic\repos\ohmic-audio-labs\public\appendix\manufacturers`
- `B:\ohmic\repos\ohmic-audio-static-content\public\appendix\manufacturers`
- `B:\ohmic\docs\migration\STATIC_CONTENT_PARITY_AUDIT_2026-03-13.md`

## Notes

- differing files in this bucket: `46`
- this is a next-wave split from the larger `appendix` parity surface
- examples include:
  - `appendix/manufacturers/index.html`
  - `appendix/manufacturers/entry-level/index.html`
  - `appendix/manufacturers/sections/about-this-directory/index.html`

## Ready When

- the canonical source is explicit for the bucket
- the reconciled `appendix/manufacturers/*` pages live in `ohmic-audio-static-content`
- follow-up graphics or directory-taxonomy debt is captured separately if exposed

## Suggested Claim Scope

- `B:\ohmic\repos\ohmic-audio-labs\public\appendix\manufacturers`
- `B:\ohmic\repos\ohmic-audio-static-content\public\appendix\manufacturers`
