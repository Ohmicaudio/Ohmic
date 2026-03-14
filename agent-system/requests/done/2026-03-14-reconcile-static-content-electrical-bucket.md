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

## Completion

- canonical source for all `26` `electrical/*` pages is `B:\ohmic\repos\ohmic-audio-static-content\public\electrical`
- no content promotion from `ohmic-audio-labs` worktree was required because `B:\ohmic\repos\ohmic-audio-labs\public\electrical` no longer exists in the worktree
- historical app-side copies remain available in `ohmic-audio-labs` Git history for traceability and comparison
- all `26` historical app-side `electrical/*` files still pointed at `https://ohmicaudio.netlify.app`, while the static-host copies already use the current `https://ohmicaudiolabs.com` canonical host
- all `26` static-host `electrical/*` files were longer than the historical app-side versions in the comparison pass
- `13` static-host `electrical/*` files also add explicit `<section>` structure beyond the app-side historical versions, including the bucket index and section table of contents

## Notes

- representative comparisons that favored the static-host copy:
  - `electrical/index.html`
  - `electrical/beginner-level-what-batteries-do/index.html`
  - `electrical/engineer-level-ultracapacitors/index.html`
  - `electrical/sections/table-of-contents/index.html`
- no follow-up graphics or style bucket was created from this reconciliation pass because the current `electrical` surface is already the stronger published version
