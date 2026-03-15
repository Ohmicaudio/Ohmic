# Job Coordination

This folder coordinates active work across agents.

## Purpose

Agents should not start editing a file or folder that is already claimed by another active job.

If work has only been requested and not yet claimed, track it in `..\requests\` first.

The coordination model is file-backed:

- active claims live in `jobs/active/`
- completed or released claims live in `jobs/completed/`
- claim files are Markdown so they remain readable without tooling

Git policy:

- live claim files are local coordination state
- completed claim files are local trace, not canonical repo history
- durable outcomes should be promoted into requests, transactions, memory, or project overlays instead of relying on claim files as the record of truth

## Rules

Before editing:

1. check active claims for overlapping file or folder scope
2. if no conflict exists, create a claim
3. then begin editing

If a conflict exists:

- do not start editing the claimed file or path
- choose another task, wait, or escalate

## Scope Rules

- claim the narrowest path that still protects the work
- use a file claim for isolated edits
- use a folder claim for sweeping refactors or bulk rewrites
- broad claims should be rare and justified

## Lease Rules

- claims should include an owner, project, paths, start time, and expiry time
- default lease should be short enough to avoid stale locks
- expired claims should be reviewed before being ignored

## Canonical Claim Schema

Active claims should use the YAML-style flat header written by
`agent-claim.ps1`:

```text
claim_id: ...
status: active
owner: ...
project: ...
task: ...
started: ...
expires: ...

# Files

- B:\path\to\scope
```

Do not create new live claims using older ad hoc header styles like:

- `Status:`
- `Owner:`
- `Task:`

Those older forms are tolerated only as legacy repair input, not as the
canonical live format.

## Tooling

Use the helper script:

- `B:\ohmic\tools\sync\agent-claim.ps1`

Typical flow:

```powershell
pwsh -File B:\ohmic\tools\sync\agent-claim.ps1 status -Paths B:\ohmic\repos\ohmic-audio-labs\services\backend\README.md
pwsh -File B:\ohmic\tools\sync\agent-claim.ps1 claim -Owner codex-local -Project ohmic-audio-labs -Task "backend readme cleanup" -Paths B:\ohmic\repos\ohmic-audio-labs\services\backend\README.md
pwsh -File B:\ohmic\tools\sync\agent-claim.ps1 complete -Id <claim-id>
```

Validation helper:

```powershell
pwsh -File B:\ohmic\tools\sync\validate-agent-system.ps1
```

## Reminder

This is coordination, not authority. Claim files protect active work. They do not replace project truth or memory docs.
