scope: project
authority: working
project: ohmic-audio-labs
status: ready
requested: 2026-03-13
requester: user
origin: agent-handoff
priority: now
blocking: yes
depends_on:
handoff_from: codex-local
claim_id: 20260314T011951Z-3652bd23
topic: requested-task

# Finish `ohmic-audio-labs` push to `Ohmicaudio` from `B:\ohmic`

## Requested Outcome

- finish the migration normalization for `B:\ohmic\repos\ohmic-audio-labs`
- push the active `B:` repo state to `https://github.com/Ohmicaudio/ohmic-audio-labs`
- keep `A:\ohmic-audio-labs` out of the active work path
- leave `B:\ohmic\repos\ohmic-audio-labs` as the only active app repo root

## Current Situation

- `B:\ohmic\repos\ohmic-audio-labs` is now a real Git repo with preserved history copied into the `B:` migration root
- `origin` now points at `https://github.com/Ohmicaudio/ohmic-audio-labs.git`
- `legacy-origin` points at `https://github.com/dadslands/ohmic-audio-labs.git`
- `B:\ohmic`, `B:\ohmic\repos\amplab-firmware`, `B:\ohmic\repos\cyd-remote`, and `B:\ohmic\repos\ohmic-audio-static-content` are already the active `B:` working roots
- `amplab-firmware` and `cyd-remote` have already been pushed to their `Ohmicaudio` remotes
- the current active branch in `B:\ohmic\repos\ohmic-audio-labs` is `measurement/local-input-normalization`
- `main` also exists locally and should be pushed once credentials allow it

## Known Blocker

Direct pushes to `Ohmicaudio/ohmic-audio-labs` currently fail because the active GitHub credential used by CLI does not have permission to update workflow files.

Observed rejection:

```text
refusing to allow an OAuth App to create or update workflow `.github/workflows/ci-quality-gates.yml` without `workflow` scope
```

There is also a non-fatal large-file warning:

```text
tools/bin/cloudflared.exe is 62.19 MB
```

## Scope

- `B:\ohmic\repos\ohmic-audio-labs`
- `https://github.com/Ohmicaudio/ohmic-audio-labs`
- GitHub credential / token path used by Windows Git Credential Manager
- `.github/workflows/ci-quality-gates.yml`

## Constraints

- do not fall back to `A:\ohmic-audio-labs` as the active repo
- preserve history already present in `B:\ohmic\repos\ohmic-audio-labs`
- keep `legacy-origin` only as historical fallback if needed; `origin` should stay on `Ohmicaudio/ohmic-audio-labs`
- do not rewrite history unless explicitly required

## Notes

- the user explicitly wants all future work to happen from `B:\ohmic` and `B:\ohmic\repos\*`
- `A:\*` should be treated as legacy/source only, not active work roots
- the next agent should not spend time re-checking whether `A:` is still needed; it is not the active work root

## Ready When

- a GitHub credential or PAT with workflow-capable scope is available to the CLI
- `main` and `measurement/local-input-normalization` are both pushed to `origin`
- upstream tracking is verified for the pushed branches
- the repo can be treated as fully normalized under `B:\ohmic\repos\ohmic-audio-labs`

## Suggested Next Step

Use a GitHub credential or PAT with workflow scope, then:

1. push `main` to `origin`
2. push `measurement/local-input-normalization` to `origin`
3. verify upstream tracking for the active branches
4. confirm `B:\ohmic\repos\ohmic-audio-labs` is the only active app repo root going forward
