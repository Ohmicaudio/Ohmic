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
- extended `tools/sync/refresh-agent-work-snapshot.ps1` so the one-shot hook now refreshes both the older generated snapshot family and the newer JSON runtime outputs
- wired `tools/sync/agent-request.ps1` and `tools/sync/agent-claim.ps1` to pass explicit trigger reasons into the shared PowerShell refresh entrypoint after normal queue and claim mutations
- added `generated/agent-work/runtime/refresh_status.json` as a visible success/failure marker for refresh attempts
- documented the PowerShell/runtime refresh path in `docs/systems/OHMIC_GENERATED_STATE_AUTO_REFRESH_HOOK_2026-03-15.md`
