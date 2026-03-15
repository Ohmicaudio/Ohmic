Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic

# Implement Generated State Auto Refresh Hook

## Goal

Reduce snapshot drift by adding an automatic refresh path after queue or claim
mutations instead of relying on memory and manual discipline.

## Source

- `tools/sync/sync-agent-state.ps1`
- `docs/systems/OHMIC_SHARED_AGENT_SYSTEM_CONSISTENCY_AUDIT_2026-03-15.md`

## Focus

- safe refresh trigger
- what mutations should invoke refresh
- failure handling
- no fake assumption that every edit went through PowerShell

## Acceptance

- one automatic refresh hook path exists or is prototyped concretely
- staleness is reduced for normal queue and claim changes
- failure behavior is explicit

## Completion Notes

- added `tools/sync/refresh-agent-work-snapshot.sh` as a bash-friendly refresh wrapper
- added `tools/sync/install-agent-work-pre-commit-hook.sh` as the repo-local auto-refresh installer for manual edit workflows
- documented both in `tools/sync/README.md`
- intentionally left hook installation opt-in instead of silently mutating local git hooks
