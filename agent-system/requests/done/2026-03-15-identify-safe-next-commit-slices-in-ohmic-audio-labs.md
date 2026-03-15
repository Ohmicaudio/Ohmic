Status: ready
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs

# Identify Safe Next Commit Slices In Ohmic Audio Labs

## Goal

Identify which parts of the `ohmic-audio-labs` worktree can be safely committed
next without bundling unrelated churn.

## Why

Completion is currently limited less by ideas and more by mixed scope.

## Deliverable

A short split map that says:

- safe to commit now
- needs isolation first
- freeze for later
- likely generated/noise

## Constraints

- no large cleanup edit in this step
- classification only

## Outcome

Completed on 2026-03-15.

Output:

- `B:\ohmic\docs\roadmap\OHMIC_AUDIO_LABS_SAFE_NEXT_COMMIT_SLICES_2026-03-15.md`

Result:

- the next commitable lanes are now explicit
- toolbox is confirmed as the safest continuing code lane
- `products/ohmic-osm`, hardware/control UI, backend services, and Android are
  clearly separated instead of mixed together
