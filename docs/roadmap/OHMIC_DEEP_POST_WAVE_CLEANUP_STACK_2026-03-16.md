Status: active_handoff_board
Date: 2026-03-16
Project: ohmic-audio-labs

# Ohmic Deep Post-Wave Cleanup Stack

## Purpose

Push the cleanup queue deeper than the immediate local-only clutter so the next
several waves are already known before the board thins again.

## Current Frontier

The cleanup has now progressed far enough that the remaining work separates into
three different ladders:

1. remaining local-only clutter
2. source-visible tracked cleanup
3. rebuildable/generated-adjacent cleanup

## Ladder 1: Remaining Local-Only Clutter

Immediate order:

1. `execute-ohmic-audio-labs-output-relocation-or-purge-wave`
2. `define-backend-measurement-capture-retention-execution-slice`
3. `execute-ohmic-audio-labs-disposable-log-and-report-purge-check`

Why:

- these are the last obvious local-only buckets still muddying normal repo
  reads

## Ladder 2: Source-Visible Cleanup

Next order after local-only clutter:

1. `promote-ohmic-audio-labs-source-visible-cleanup-wave`
2. `classify-ohmic-audio-labs-tracked-root-deletion-intent`
3. `define-ohmic-audio-labs-root-config-deletion-review-wave`
4. `package-ohmic-audio-labs-source-visible-docs-cleanup-wave`
5. `package-ohmic-audio-labs-source-visible-product-surface-cleanup-wave`

Why:

- the tracked root deletions and broad source-visible churn cannot be handled
  safely until local-only noise is lower
- once the noise drops, these become the next honest frontier

## Ladder 3: Rebuildable And Generated-Adjacent Cleanup

Parallel order once source-visible cleanup is packeted:

1. `define-ohmic-audio-labs-rebuildable-dependency-purge-wave`
2. `classify-ohmic-audio-labs-index-and-generated-adjacent-zones`

Why:

- rebuildable junk is real, but it is not the same as source cleanup
- index and generated-adjacent zones still need separate truth rules

## Non-Goals

This stack does not approve:

- blind deletion of tracked root files
- treating docs churn as automatically safe cleanup
- hiding source-visible ambiguity behind ignore rules

## Outcome Standard

If this deep stack is followed, the queue will stay ahead of the cleanup work
instead of collapsing after each small wave.
