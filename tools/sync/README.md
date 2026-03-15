# Sync Tooling

Shared agent-system coordination scripts live here.

## Cross-Platform CLI Skeleton

The first shared command surface now exists as:

```bash
python3 ./tools/sync/agentctl.py --help
python3 ./tools/sync/agentctl.py validate --json
python3 ./tools/sync/agentctl.py refresh --project ohmic
```

Current state:

- `validate` is wired
- `refresh` is wired
- `claim` and `request` command groups exist as placeholders

The command surface is intentionally ahead of the full internal migration, so
agents can converge on one entrypoint without pretending every subcommand is
finished already.

## Validation

From bash or WSL:

```bash
./tools/sync/validate-agent-system.sh
./tools/sync/validate-agent-system.sh --json
```

The bash wrapper delegates to the canonical PowerShell validator:

- `tools/sync/validate-agent-system.ps1`

Resolution order:

1. `pwsh`
2. `powershell.exe`

If neither runtime is available, the wrapper exits with a clear error instead
of silently succeeding.

## Snapshot Refresh

Manual edits can bypass the PowerShell request and claim helpers, so there is
also a bash-friendly refresh wrapper:

```bash
./tools/sync/refresh-agent-work-snapshot.sh
./tools/sync/refresh-agent-work-snapshot.sh --project ohmic
```

To reduce stale generated state after manual queue or docs edits, install the
local repo pre-commit hook:

```bash
./tools/sync/install-agent-work-pre-commit-hook.sh
```

The hook refreshes generated agent-work snapshots when staged changes touch:

- `agent-system/`
- `docs/systems/`
- `docs/roadmap/`
