# Ohmic Public And Archive Freeze Boundary

Date: 2026-03-15  
Status: active working rule

## Purpose

Define the freeze rule for noisy public and archive-shaped surfaces so current
completion work stops bleeding into legacy content lanes by accident.

This note is a workflow boundary, not a claim that these surfaces are deleted or
unimportant. The point is to stop casual edits and force explicit re-entry.

## Frozen By Default

These areas are frozen unless a task explicitly reopens them:

- `B:\ohmic\repos\ohmic-audio-labs\public\*`
- `B:\ohmic\repos\ohmic-audio-labs\archive\*`
- `B:\ohmic\repos\ohmic-audio-labs\docs\archive\*`
- `B:\ohmic\repos\ohmic-audio-labs\docs\created book\*`

Why these are frozen:

- they are large, noisy, and legacy-shaped
- they make narrow completion work look bigger and dirtier than it really is
- they have already caused repeated context bleed into unrelated tasks
- the canonical static/public lane has moved elsewhere

## Explicit Exception

The freeze rule above does **not** apply to the active static repo:

- `B:\ohmic\repos\ohmic-audio-static-content\public\*`

That surface is still live and editable because it is now the canonical public
content and static-tool home.

So the simple rule is:

- app-side `public/` in `ohmic-audio-labs` is frozen legacy-shaped context
- static-side `public/` in `ohmic-audio-static-content` is active product work

## What "Frozen" Means

Do not do broad cleanup, refactors, rewrites, or opportunistic fixes in frozen
areas just because they are visible in the worktree.

Do not:

- sweep formatting changes through them
- rename or reorganize them casually
- mix frozen-surface cleanup into runtime, backend, or hardware commits
- treat them as normal background "while I am here" edits

Allowed without reopening the lane:

- read-only inspection
- historical comparison
- citing them in docs or audits
- verifying whether a path is still present or already retired

## Re-Entry Rule

Future work may enter frozen surfaces only through an explicit narrow request.

Required conditions:

1. the request names the frozen surface directly
2. the request explains why the work cannot stay in an active repo lane
3. the claim lists the exact files or subtree
4. the commit stays scoped to that one salvage or migration objective

Recommended re-entry pattern:

1. inventory the exact legacy files
2. decide whether they are `salvage`, `archive-reference`, or `delete`
3. land one narrow slice
4. close the lane again

## Safe Exceptions

These do not count as reopening the frozen surface:

- updating umbrella docs that describe the freeze boundary
- closing or splitting requests about legacy/public cleanup
- verifying deployment or redirect behavior against the live static host
- moving active work into `ohmic-audio-static-content` instead of reviving old app-side content

## Relation To Existing Decisions

This freeze boundary is consistent with the current shared state:

- `ohmicaudio.com` is the canonical public host
- `ohmic-audio-static-content` owns the active static/public source
- app-side `public/` is no longer the default place to continue content work
- archive and created-book surfaces are too legacy-shaped to stay in the normal
  completion loop

## Operational Rule

When a task touches runtime, backend, toolbox, hardware, or new static work:

- stay out of frozen surfaces unless the request explicitly says otherwise
- if frozen files appear dirty, treat that as context, not permission
- if a frozen lane must be re-entered, split it into its own request and commit

## Related Docs

- `B:\ohmic\docs\migration\TRANSITIONAL_PUBLIC_CUTOVER_DECISION_NOTE_2026-03-13.md`
- `B:\ohmic\docs\roadmap\OHMIC_AUDIO_LABS_DIRTY_WORKTREE_INVENTORY_2026-03-15.md`
- `B:\ohmic\docs\architecture\OHMIC_STATIC_SPEAKER_CONTENT_BOUNDARY_CONFIRMATION_2026-03-15.md`
- `B:\ohmic\docs\systems\OHMIC_MINIMUM_TRUSTED_CHECKS_2026-03-15.md`
