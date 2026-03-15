Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Implement Android Wrapper Tracked Text Cleanup Slice

## Goal

Implement the first Android wrapper cleanup slice once the tracked-text boundary
is clear, improving the repo without reopening generated-noise churn.

## Source

- `docs/roadmap/OHMIC_ANDROID_WRAPPER_DIRTY_SUBSYSTEM_INVENTORY_2026-03-15.md`
- Android tracked-text first slice packet

## Focus

- tracked wrapper files only
- line-ending and text cleanup if intentional
- no generated directories
- no feature expansion

## Acceptance

- one Android wrapper cleanup slice lands cleanly
- generated output remains untouched
- the wrapper lane is calmer afterward

## Completion Notes

- Retired this task as false-ready queue state rather than a live implementation lane
- The scoped tracked Android wrapper files currently show balanced add/remove
  counts and no semantic diff under `git diff --ignore-cr-at-eol`
- That means the current worktree pressure in this slice is line-ending
  normalization noise, not trustworthy wrapper logic work
- The truthful next Android pickup should start from fresh semantic pressure or
  an explicit normalization decision, not from this stale cleanup task
