# Sync Tooling

Shared agent-system coordination scripts live here.

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
