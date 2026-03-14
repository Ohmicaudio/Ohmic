scope: project
authority: working
project: ohmic-audio-labs
status: done
requested: 2026-03-13
requester: user
origin: agent-handoff
priority: now
blocking: no
depends_on:
handoff_from: codex-local
claim_id: 20260314T011951Z-3652bd23
topic: requested-task

# Finish `ohmic-audio-labs` push to `Ohmicaudio` from `B:\ohmic`

## Requested Outcome

- finish the migration normalization for `B:\ohmic\repos\ohmic-audio-labs`
- push the active `B:` repo state to `https://github.com/Ohmicaudio/ohmic-audio-labs`
- keep older pre-B local copies out of the active work path
- leave `B:\ohmic\repos\ohmic-audio-labs` as the only active app repo root

## Completion

- GitHub CLI auth now includes workflow-capable scope, so workflow files are no longer blocked on push
- `main` is now pushed to `origin` at `44b72f21ab9509fc492023677458703d7033bf68`
- `measurement/local-input-normalization` is now pushed to `origin` at `e01fbe354fdd42ccbee307875c6d066963b8300b`
- upstream tracking is verified for both local branches
- `https://github.com/Ohmicaudio/ohmic-audio-labs` now has `main` as the default branch

## Scope

- `B:\ohmic\repos\ohmic-audio-labs`
- `https://github.com/Ohmicaudio/ohmic-audio-labs`
- GitHub credential / token path used by Windows Git Credential Manager
- `.github/workflows/ci-quality-gates.yml`

## Constraints

- do not fall back to any non-`B:\ohmic\repos\ohmic-audio-labs` local copy as the active repo
- preserve history already present in `B:\ohmic\repos\ohmic-audio-labs`
- keep `legacy-origin` only as historical fallback if needed; `origin` should stay on `Ohmicaudio/ohmic-audio-labs`
- do not rewrite history unless explicitly required

## Notes

- the user explicitly wants all future work to happen from `B:\ohmic` and `B:\ohmic\repos\*`
- older pre-B local copies should be treated as legacy/source only, not active work roots
- the repo worktree is still dirty on `measurement/local-input-normalization`, but that did not block the ref pushes
- GitHub still warns that `tools/bin/cloudflared.exe` is 62.19 MB; the push succeeded, but that file remains above GitHub's recommended file-size threshold
