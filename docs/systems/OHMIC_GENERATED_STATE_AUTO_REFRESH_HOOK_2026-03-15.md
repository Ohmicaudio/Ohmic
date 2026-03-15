# Ohmic Generated State Auto Refresh Hook

Date: 2026-03-15
Status: implementation note

## Purpose

Define one concrete auto-refresh path that updates the generated coordination
surfaces after normal queue and claim mutations, while still offering a manual
edit watcher for work that bypasses the PowerShell mutation scripts.

## Hook Path

`B:\ohmic\tools\sync\refresh-agent-work-snapshot.ps1` is now the single refresh
entrypoint.

In one-shot mode it refreshes:

- `generated/agent-work/current-state.json`
- `generated/agent-work/idle-ready-work.json`
- `generated/agent-work/runtime/agent_state.json`
- `generated/agent-work/runtime/ready_tasks.json`
- `generated/agent-work/runtime/active_claims.json`
- `generated/agent-work/runtime/reconciliation_summary.json`
- `generated/agent-work/runtime/dashboard_status_cards.json`

## Normal Mutation Triggers

The shared mutation scripts now call the refresh hook automatically:

- `tools/sync/agent-request.ps1`
  - after request create
  - after request move
- `tools/sync/agent-claim.ps1`
  - after claim create
  - after claim complete

Each call passes a reason string so failures can be traced back to the mutation
path that triggered the refresh.

## Manual Edit Coverage

For edits that bypass the mutation scripts, the hook supports watch mode:

```powershell
powershell -ExecutionPolicy Bypass -File B:\ohmic\tools\sync\refresh-agent-work-snapshot.ps1 -Watch
```

Watch mode polls:

- `B:\ohmic\agent-system\requests`
- `B:\ohmic\agent-system\jobs`

When those roots change, the refresh pipeline reruns automatically.

## Failure Behavior

Refresh attempts write status to:

- `B:\ohmic\generated\agent-work\runtime\refresh_status.json`

That file records:

- the last attempted refresh time
- the last successful refresh time
- refresh mode (`once` or `watch`)
- trigger reason
- the latest error message when refresh fails

In one-shot mode the hook throws on failure.

In watch mode the hook records the failure, warns, and stays alive so the next
change can retry the refresh.

## Boundary

This does not pretend every edit in the repo is covered automatically.

It narrows the problem by:

- making the official mutation paths refresh derived state immediately
- providing one concrete watcher path for direct file edits
- making refresh failures visible instead of silently stale
