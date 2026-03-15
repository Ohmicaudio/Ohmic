Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic

# Prototype Cross Platform Agent CLI Skeleton

## Goal

Create the first lightweight cross-platform CLI skeleton so the shared agent
system stops depending solely on PowerShell-centric coordination paths.

## Source

- `docs/systems/OHMIC_CROSS_PLATFORM_AGENT_SYSTEM_CLI_PATH_2026-03-15.md`

## Focus

- basic command structure
- intended subcommands
- language/runtime choice
- bootstrap without replacing the whole system at once

## Acceptance

- one concrete CLI skeleton exists
- core command intent is visible in code or scaffolding
- the migration path from PowerShell-only tooling is clearer

## Completion Notes

- implemented as `tools/sync/agentctl.py`
- wired `validate` and `refresh` to the bash wrappers
- added placeholder command groups for `claim` and `request`
- documented the entrypoint in `tools/sync/README.md`
- smoke checked:
  - `python3 tools/sync/agentctl.py --help`
  - `python3 tools/sync/agentctl.py validate --json`
