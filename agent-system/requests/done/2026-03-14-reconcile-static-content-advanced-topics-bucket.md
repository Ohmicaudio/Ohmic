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

## Completion

- canonical source for all `25` `advanced-topics/*` pages is `B:\ohmic\repos\ohmic-audio-static-content\public\advanced-topics`
- no content promotion from the `ohmic-audio-labs` worktree was required because `B:\ohmic\repos\ohmic-audio-labs\public\advanced-topics` is no longer present in the worktree
- historical app-side copies remain available in `ohmic-audio-labs` Git history for parity comparison
- all `25` historical app-side `advanced-topics/*` files still pointed at `https://ohmicaudio.netlify.app`, while the static-host copies already use the current `https://ohmicaudiolabs.com` canonical host
- all `25` static-host `advanced-topics/*` files are longer than the historical app-side versions
- `24` static-host `advanced-topics/*` files add explicit `<section>` structure beyond the historical app-side versions
- the static-host bucket removed the visual placeholder debt that still existed in the historical app-side copy

## Notes

- representative comparisons that favored the static-host copy:
  - `advanced-topics/index.html`
  - `advanced-topics/sections/table-of-contents/index.html`
  - `advanced-topics/engineer-level-neural-networks-for-room-correction/index.html`
  - `advanced-topics/beginner-level-what-spatial-audio-is/index.html`
- style debt still exists outside parity in this bucket:
  - `9` `advanced-topics/*` pages still contain page-local `<style>` blocks
  - that should stay on the quality-audit track, not block parity closure
