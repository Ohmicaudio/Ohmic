# Git And GitHub Bootstrap In Mixed Windows/WSL Environments

Status: Active operational note  
Date: 2026-03-13

## Purpose

Prevent repeated environment-class mistakes when working across:

- WSL/bash
- Windows PowerShell
- mounted Windows drives from WSL (`/mnt/b`, `/mnt/c`)
- Windows-native Git and PowerShell tooling

## Core Rule

Before invoking Git or setup tooling, identify:

1. which shell is active
2. whether the target tool is Windows-native or WSL-native
3. which path form the tool expects

Do not assume one invocation model works in all three contexts.

## Path Rules

### WSL-native tools expect Linux paths

Examples:

- `/mnt/b/ohmic/repos/ohmic-audio-labs`
- `/mnt/b/ohmic`

Use these with:

- `bash`
- Linux `git`
- `python3`
- `rg`
- other WSL-native tools

### Windows-native tools expect Windows paths

Examples:

- `B:\ohmic`
- `B:\ohmic\repos\ohmic-audio-labs`

Use these with:

- `powershell.exe`
- Windows PowerShell scripts
- other `.exe` tools invoked from the Windows side

When calling Windows tools from WSL, convert paths first:

```bash
wslpath -w /mnt/b/ohmic/tools/sync/agent-claim.ps1
```

## Known Good Patterns

### Run shared PowerShell helper from WSL

```bash
SCRIPT=$(wslpath -w /mnt/b/ohmic/tools/sync/agent-claim.ps1)
powershell.exe -ExecutionPolicy Bypass -File "$SCRIPT" status -Project ohmic-umbrella
```

### Read/edit repo files from WSL

```bash
git -C /mnt/b/ohmic status --short
sed -n '1,120p' /mnt/b/ohmic/README.md
```

### Use Windows Git executable explicitly from WSL when needed

```bash
/mnt/c/Program\ Files/Git/cmd/git.exe -C "$(wslpath -w /mnt/b/ohmic/repos/ohmic-audio-labs)" log -1 --oneline
```

## Failure Modes Already Seen

### 1. Passing Linux-looking paths into Windows PowerShell `-File`

Bad pattern:

```bash
powershell.exe -File B:\ohmic\tools\sync\agent-claim.ps1
```

from a shell context where backslashes are being eaten or misinterpreted.

Safer pattern:

```bash
SCRIPT=$(wslpath -w /mnt/b/ohmic/tools/sync/agent-claim.ps1)
powershell.exe -ExecutionPolicy Bypass -File "$SCRIPT" ...
```

### 2. Treating a Windows `.exe` path as directly executable in raw Windows form

Bad pattern from WSL:

```bash
"C:\Program Files\Git\cmd\git.exe"
```

Safer pattern:

```bash
/mnt/c/Program\ Files/Git/cmd/git.exe
```

### 3. Repeating the same bad shell/path invocation after the fix is known

This is not acceptable once the correct model is understood.

Allowed:

- first miss
- second attempt with a changed hypothesis

Not allowed:

- retrying the already disproven path/shell form

## Mounted Drive Warning

Git operations on mounted Windows drives may behave differently from native Linux
paths. Symptoms can include:

- slow or hanging porcelain commands
- delayed shell return even after the action has completed
- leftover `index.lock` files after interrupted commands

Operational response:

1. verify whether the command actually succeeded before retrying
2. check for stale git processes
3. clear only stale lockfiles after confirming the process is dead
4. do not spam repeated `git commit` or `git status` calls into a stuck repo

## Decision Ladder

If the task is:

- repo inspection in WSL: use Linux `git`
- PowerShell helper or scheduled-task logic: use `powershell.exe` with converted paths
- repo action misbehaves under one git invocation model: confirm whether the problem is repo-local or invocation-local before switching models

## Recommended Startup Assumption

Default working posture for this workspace:

- docs, search, patching, and most repo inspection from WSL
- Windows PowerShell only for the shared `tools/sync/*.ps1` layer and other explicitly Windows-native tasks
- always convert paths at the boundary instead of guessing
