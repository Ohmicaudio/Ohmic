Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic

# Implement Shared Agent System Bash Validator Wrapper

## Goal

Add a bash-friendly wrapper around the shared-system validator so mixed WSL and
Windows shells stop falling back to hand edits.

## Source

- `tools/sync/validate-agent-system.ps1`
- `docs/systems/OHMIC_CROSS_PLATFORM_AGENT_SYSTEM_CLI_PATH_2026-03-15.md`

## Focus

- bash entrypoint
- clear invocation path
- pass-through of validator results
- honest limitations if PowerShell is still required underneath

## Acceptance

- one bash-friendly validator wrapper exists
- usage is documented briefly
- the wrapper lowers friction for mixed-shell validation

## Completion Notes

- implemented as `tools/sync/validate-agent-system.sh`
- added sync-local usage note in `tools/sync/README.md`
- wrapper prefers `pwsh`, then `powershell.exe`
- smoke run succeeded from bash with `--json`
- validator output surfaced real metadata and snapshot-staleness issues, which remain follow-on cleanup work rather than wrapper bugs
