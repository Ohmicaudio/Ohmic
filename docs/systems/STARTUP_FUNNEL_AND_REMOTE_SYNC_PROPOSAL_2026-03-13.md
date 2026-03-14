# Startup Funnel And Remote Sync Proposal

Date: 2026-03-13
Scope: `B:\ohmic` umbrella root, shared agent system, local and remote agent startup behavior

## Goal

Make `B:\ohmic` the single obvious startup funnel for both local and remote
agents so they enter with nearly the same context and follow the same re-entry
path.

## Problem

The current umbrella repo is close, but not fully aligned:

- `B:\ohmic` is the right root, but the startup path is not explicit enough at
  the top level
- the shared agent system now has generated re-entry surfaces and a transaction
  layer, but the main startup flow still reads like the older pre-transaction
  model
- local agents can discover the new generated surfaces by habit
- remote agents will only stay close to the loop if the umbrella repo itself
  tells them exactly what to read and what to regenerate

## Proposal

### 1. Make `B:\ohmic` the canonical startup cwd

Default working directory for agent startup should be:

- `B:\ohmic`

Reason:

- it contains the umbrella `README.md`
- it contains the shared agent contract
- it contains the generated re-entry surfaces
- it contains the cross-project docs and system proposals
- it provides a stable local-first path model

### 2. Make the root README the front door

`B:\ohmic\README.md` should explicitly say:

1. read `agent-system/AGENTS.md`
2. read `generated/agent-work/recent-changes.md`
3. read the relevant `generated/agent-work/projects/<project>/session-brief.md`
4. read the relevant project overlay
5. then enter the target repo

This should be written as the normal startup rule, not implied.

### 3. Promote transactions into the official startup path

The shared agent rules should stop treating proposals as a special side case.

Instead:

- `transactions/` becomes the canonical thread/event layer
- `requests/` stays the actionable queue
- `jobs/` stays the active lock layer
- `memory/` stays the promoted truth layer

At startup, agents should be directed to the generated brief first, and then to
the linked transaction or request only when the brief indicates it matters.

### 4. Keep Git as the mirrored truth path

The umbrella repo should mirror the source-of-truth surfaces that remote agents
need:

- `README.md`
- `agent-system/`
- `docs/`
- `tools/sync/`

These should be committed and pushed so remote agents can enter through the same
contract.

### 5. Do not depend on committed generated files for truth

Generated state should remain derived:

- `generated/agent-work/recent-changes.md`
- `generated/agent-work/current-state.json`
- `generated/agent-work/projects/*/session-brief.md`

Remote agents should regenerate them on entry using the local scripts rather
than relying on a possibly stale committed copy.

Operationally:

- commit the generator scripts
- do not require generated outputs to be canonical
- optionally commit selected generated outputs only if they are explicitly
  treated as convenience snapshots, not truth

### 6. Add one simple remote-entry rule

When a remote agent starts cold from the umbrella repo:

1. open `README.md`
2. open `agent-system/AGENTS.md`
3. run the state sync helper if generated files are missing or stale
4. read `generated/agent-work/recent-changes.md`
5. read the target project brief
6. enter the target repo
7. read the repo-local `AGENTS.md` and first-read docs
8. inspect the repo worktree
9. continue normally

This keeps local and remote startup nearly identical.

## Important Correction

The startup funnel should not trap agents at `B:\ohmic`.

The umbrella repo should get agents aligned fast, then hand them off into the active repo.
If startup guidance is followed but repo-local truth is still loaded late, the funnel has failed.

## Recommended Implementation

### Phase 1

- update `B:\ohmic\README.md`
- update `B:\ohmic\agent-system\AGENTS.md`
- update `B:\ohmic\agent-system\instructions\decision-rules.md`
- update `B:\ohmic\agent-system\instructions\request-routing.md`

### Phase 2

- add one documented startup helper command for regenerating shared state
- make that helper the normal answer when generated state is stale or missing

### Phase 3

- optionally add a remote/bootstrap note for agents that start from a fresh clone

## Recommendation

Adopt this.

The umbrella repo is already close enough that a small documentation and startup
rule pass will make local and remote agents feel like they are entering the
same operating system instead of related but different environments.
