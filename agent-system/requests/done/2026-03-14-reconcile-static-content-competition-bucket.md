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
claim_id: 20260314T033451Z-2ac0b440
topic: requested-task

# Reconcile static-content `competition` bucket

## Requested Outcome

- reconcile the `competition/*` static pages between `ohmic-audio-labs` and `ohmic-audio-static-content`
- keep the stronger competition-oriented build and judging copy in the static-host repo

## Completion

- full-bucket comparison confirmed `19` differing `competition/*` files
- after normalizing the historical app-side host from `https://ohmicaudio.netlify.app` to `https://ohmicaudiolabs.com`, all `19` files match the static-host copies exactly
- `ohmic-audio-static-content/public/competition` is the canonical kept side for this bucket
- no page-by-page content merge was required for `competition`
- the current `ohmic-audio-labs` worktree no longer contains `public/competition`, so this closure records the canonical decision against app Git history rather than against a live duplicated worktree
- `5` `competition/*` pages still contain `[VISUAL PLACEHOLDER: ...]` markers on both sides, which is quality debt but not a parity blocker

## Scope

- `B:\ohmic\repos\ohmic-audio-labs\public\competition`
- `B:\ohmic\repos\ohmic-audio-static-content\public\competition`
- `B:\ohmic\docs\migration\STATIC_CONTENT_PARITY_AUDIT_2026-03-13.md`

## Notes

- differing files in this bucket: `19`
- this is one of the remaining unsplit top-level parity buckets after the first-wave closures
- examples include:
  - `competition/index.html`
  - `competition/competition-day-procedures/index.html`
  - `competition/sections/13-2-sound-quality-competition-strategy/index.html`
