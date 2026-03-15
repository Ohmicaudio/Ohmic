Date: 2026-03-15
Status: working
Project: ohmic

# Ohmic Cross-Platform Agent System CLI Path

## Purpose

Define the migration path away from PowerShell-only happy paths for core shared
system coordination actions.

This is a tooling-direction document, not a requirement to rewrite everything
immediately.

## Current Reality

The shared system currently works best when agents can run:

- `agent-claim.ps1`
- `agent-request.ps1`
- `refresh-agent-work-snapshot.ps1`
- `agent-work-poll.ps1`

That is fine on native Windows and acceptable in mixed environments when
PowerShell is available.

It is not a strong default in bash-first or WSL-first execution, and that gap
encourages manual file edits.

## Problem To Solve

The current failure mode is not that PowerShell exists.

The problem is that PowerShell is the only clean mutation path for:

- claims
- request creation and moves
- snapshot refresh
- validation entry

When that path is inconvenient or unavailable, agents improvise.
Improvisation is how claim schemas drift and generated state goes stale.

## Direction

Keep the file-backed model.

Do not move shared coordination into a DB.

Do not replace the existing PowerShell scripts immediately.

Instead:

1. define one cross-platform command surface
2. let that surface call existing scripts at first if needed
3. migrate core logic behind it over time

## Recommended Command Surface

Add one cross-platform entrypoint under `tools/sync/`:

- preferred: `agentctl.py`
- acceptable alternative: `agentctl.mjs`

It should own:

- `claim status`
- `claim create`
- `claim complete`
- `request list`
- `request create`
- `request move`
- `snapshot refresh`
- `validate`

## Implementation Rule

The first version does not need to replace PowerShell internals.

It can:

- normalize arguments
- detect environment
- call existing PowerShell scripts when available
- fail clearly when a feature path is unavailable

The important thing is one happy path for agents, not immediate internal
purity.

## Migration Order

### Phase 1

- keep current PowerShell scripts as system truth
- add `validate-agent-system.ps1`
- repair live schema and freshness issues
- document the cross-platform target

### Phase 2

- add `agentctl` wrapper
- route common actions through one command surface
- keep PowerShell as the backend implementation where practical

### Phase 3

- move high-friction logic into shared Python or Node helpers if needed
- keep file formats and repo layout stable

## Ownership Rule

Until `agentctl` exists:

- PowerShell scripts remain the mutation authority
- manual file edits require validation afterward

After `agentctl` exists:

- agents should prefer `agentctl`
- direct PowerShell usage remains acceptable for advanced or repair work

## Done Enough Condition

This path is successful when:

- bash-first and Windows-first agents share one command shape
- manual queue and claim edits become rarer
- the file-backed system stays intact
