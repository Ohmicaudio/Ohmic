scope: project
authority: working
project: ohmic-audio-labs
status: done
requested: 2026-03-14
requester: codex-local
origin: dependency
priority: soon
blocking: no
depends_on:
- dirty overlapping app worktree on claimed host-routing files
handoff_from: 2026-03-14-normalize-live-canonical-host-to-ohmicaudio-com.md
claim_id: 20260315T033537Z-f30a7415
topic: canonical-host
owner: d

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

## Completion

- changed the app repo default static-content host from the temporary Workers hostname to `https://ohmicaudio.com`
- updated `index.html`, `netlify.toml`, `vite.config.ts`, `e2e/static-tier.spec.ts`, and the shared static-content helper to use the canonical host as the default
- normalized the remaining `ohmicaudiolabs.com/products/*` links in the app-side product surfaces to `https://ohmicaudio.com/products/*`
- verified `npm run build`
- verified `npm run test:e2e:static -- --project=chromium`
- the Playwright run still logged expected `ECONNREFUSED` proxy noise for `127.0.0.1:8787` because the local hub backend was not running, but all three static-boundary tests passed
