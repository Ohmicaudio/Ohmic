Status: audit note
Date: 2026-03-15

# Ohmic Queue Truth Audit

## Purpose

Check whether the umbrella queue surfaces actually match reality.

## Snapshot

Audit scope:

- `B:\ohmic\agent-system\requests\ready`
- `B:\ohmic\agent-system\requests\done`
- `B:\ohmic\agent-system\jobs\active`
- local `git status` in `B:\ohmic`

## Findings

### Done-record metadata drift was real

The main repeatable truth bug was not stale active claims.

It was stale request metadata inside the `done` bucket.

Seventeen request records already living under `agent-system/requests/done`
still declared:

- `Status: ready`

That made historical records disagree with their actual queue location.

### Active-claim drift had already settled

During the audit, one transient toolbox durability claim and half-moved ready
file had already collapsed into the correct end state:

- the ready-path file was gone
- the done-path file existed with completion details
- the stale active claim file was no longer present

So the persistent truth bug was the stale status metadata, not a still-live
claim lock.

### Current live queue state

The queue stayed active during the audit, so exact active-claim membership
continued to move.

What stayed true at the end:

- `requests/blocked` was empty except `.gitkeep`
- `requests/ready` contained live follow-on tasks
- the stale toolbox durability claim was no longer the live source of drift

## Fix Applied

- normalized the stale `Status: ready` lines in the affected `done` records to
  `Status: done`

## Result

The queue is still active, but the historical `done` surface is now much more
truthful to the actual file locations.
