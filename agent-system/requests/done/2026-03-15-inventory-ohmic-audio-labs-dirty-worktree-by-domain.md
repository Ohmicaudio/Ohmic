Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Inventory Ohmic Audio Labs Dirty Worktree By Domain

## Goal

Turn the giant dirty `ohmic-audio-labs` worktree into a domain-based inventory
that separates active product surfaces from churn, archive, and unrelated
legacy edits.

## Why

The repo is still the biggest completion risk, and it is too dirty to trust by
feel.

## Inputs

- `B:\ohmic\repos\ohmic-audio-labs`

## Deliverable

One inventory note that groups the dirty worktree into domain buckets and calls
out which areas look safe to commit, which need freezing, and which need later
triage.

## Constraints

- do not try to clean the whole repo in one pass
- inventory only

## Outcome

Completed on 2026-03-15.

Output:

- `B:\ohmic\docs\roadmap\OHMIC_AUDIO_LABS_DIRTY_WORKTREE_INVENTORY_2026-03-15.md`

Result:

- the worktree is now grouped into real domain buckets
- toolbox is confirmed as the safest active lane
- `public`, archive, and broad Android churn are explicitly marked as freeze
  or separate-triage lanes
