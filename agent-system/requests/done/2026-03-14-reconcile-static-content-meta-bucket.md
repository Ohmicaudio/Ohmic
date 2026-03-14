scope: project
authority: working
project: ohmic-audio-static-content
status: done
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

## Completion

- canonical source for all `71` `meta/*` pages is `B:\ohmic\repos\ohmic-audio-static-content\public\meta`
- no content promotion from the `ohmic-audio-labs` worktree was required because `B:\ohmic\repos\ohmic-audio-labs\public\meta` is no longer present in the worktree
- historical app-side copies remain available in `ohmic-audio-labs` Git history for parity comparison
- all `71` historical app-side `meta/*` files still pointed at `https://ohmicaudio.netlify.app`, while the static-host copies already use the current `https://ohmicaudiolabs.com` canonical host
- `70` static-host `meta/*` files are longer than the historical app-side versions
- `53` static-host `meta/*` files add explicit `<section>` structure beyond the historical app-side versions
- the one static file that is not longer, `meta/index.html`, is still more structured than the app-side historical version and remains the stronger canonical page

## Notes

- representative comparisons that favored the static-host copy:
  - `meta/index.html`
  - `meta/ohmic-audio-labs-car-audio-wiki/index.html`
  - `meta/for-engineers/index.html`
  - `meta/master-index-pages-257-270/index.html`
- the earlier apparent mojibake in this bucket was a Windows PowerShell decoding artifact during inspection, not a bad UTF-8 payload in the files themselves
