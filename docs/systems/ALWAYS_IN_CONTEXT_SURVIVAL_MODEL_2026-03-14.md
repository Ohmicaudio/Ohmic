# Always-In-Context Survival Model

Purpose: give agents a small set of world truths and survival rules that should
stay loaded before task-specific detail narrows attention.

Think of this as the horizon layer.

Not:

- the current implementation task
- a long project diary
- a substitute for repo inspection

Yes:

- the world map
- the survival rules
- the near-certain priorities that should stop an agent from getting eaten by
  the approaching tiger while staring at a tiny local problem

## The Three Context Layers

### 1. Horizon Layer

Always carry these before active work:

- what the system is
- where active work lives
- which surfaces are canonical
- how to avoid coordination collisions
- what must be checked before saying `nothing to do`
- which environment boundaries can cause false failures

This layer should be small, stable, and hard to forget.

### 2. Working Layer

Load after the horizon layer:

- current migration state
- active workstreams
- current blockers
- ready queue state
- current repo truth

This is where short-term and mid-term memory mostly live.

### 3. Task Packet

Load last:

- request file
- exact target files
- asset brief
- local diff/worktree specifics
- current implementation details

This is the narrow lens. It should never replace the first two layers.

## Always-In-Context Set

The following should be treated as default survival context for active Ohmic
work unless a task proves they are irrelevant:

1. `B:\ohmic` is the umbrella root and startup funnel, not the implementation destination.
2. Active repo work lives under `B:\ohmic\repos\*`.
3. `A:\*` is legacy/source only and is not an active work root.
4. Repo inspection outranks shared memory once the target repo is known.
5. `requests/ready/` must be accounted for before saying there is no work.
6. `jobs/active/` must be checked before editing shared or overlapping surfaces.
7. The current shell/runtime/path model must be identified before invoking tools.
8. Small scopes and small commits are preferred to broad mixed changes.
9. After any meaningful state change, verify it immediately.
10. If a recurring miss appears, patch the system behavior instead of relying on chat to remember it.

## What Belongs Here

Good candidates:

- active work roots
- authority order
- queue discipline
- claim discipline
- environment-boundary rules
- canonical repo topology
- durable "do not drift here again" lessons

Bad candidates:

- a list of every current task
- long branch-specific details
- large file inventories
- implementation notes for one narrow feature
- raw emotional context

## Startup Order Using This Model

1. load the horizon layer
2. load the conduct gate
3. load the relevant project overlay
4. descend into the target repo
5. load the working layer
6. then load the task packet

If the agent reaches task detail before the horizon layer is clear, the startup
path is backwards.

## Memory Placement Rule

When deciding where a fact belongs:

- if forgetting it would cause immediate navigation, authority, or coordination mistakes across many tasks, it belongs in the horizon layer
- if it matters for the current initiative or current month, it belongs in working memory
- if it matters only for the current implementation slice, it belongs in the request or handoff

## Current Horizon Truth For Ohmic

- the system is multi-repo, not a monorepo dump
- `Ohmic` is the shared coordination repo
- product work happens in the individual repos
- migration truth and queue truth must be visible from the shared startup surfaces
- the system should optimize for durable continuity, not heroic chat memory

## Design Intention

The goal is not to maximize context volume.

The goal is to keep the right context loaded:

- broad enough to preserve orientation
- small enough to stay active
- stable enough to survive compaction and agent changes
- strong enough to prevent the same coordination failures from repeating
