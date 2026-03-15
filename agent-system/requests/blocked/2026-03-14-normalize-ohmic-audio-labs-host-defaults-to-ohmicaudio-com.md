scope: project
authority: working
project: ohmic-audio-labs
status: blocked
requested: 2026-03-14
requester: codex-local
origin: dependency
priority: soon
blocking: no
depends_on:
- dirty overlapping app worktree on claimed host-routing files
handoff_from: 2026-03-14-normalize-live-canonical-host-to-ohmicaudio-com.md
claim_id:
topic: canonical-host

# Normalize ohmic-audio-labs host defaults to ohmicaudio.com

## Requested Outcome

- switch the app repo's runtime/static host defaults from the temporary Workers hostname and old labs product URLs to `https://ohmicaudio.com`

## Scope

- `B:\ohmic\repos\ohmic-audio-labs\utils\staticContent.ts`
- `B:\ohmic\repos\ohmic-audio-labs\index.html`
- `B:\ohmic\repos\ohmic-audio-labs\netlify.toml`
- `B:\ohmic\repos\ohmic-audio-labs\vite.config.ts`
- `B:\ohmic\repos\ohmic-audio-labs\e2e\static-tier.spec.ts`
- `B:\ohmic\repos\ohmic-audio-labs\components\Landing\Dashboard.tsx`
- `B:\ohmic\repos\ohmic-audio-labs\components\Mobile\MobileLab.tsx`

## Blocker

- the target files already carry large unrelated in-flight local changes, including untracked/new local surfaces and wide tracked edits
- a clean traceable host-only commit would currently drag overlapping user work into the same commit

## Ready When

- the app host-routing surface is either stabilized enough for a host-only patch
- or the user explicitly wants the canonical-host swap folded into the existing app-side in-flight changes
