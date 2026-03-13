# Ohmic Audio Labs Cleanup Surface

Date: 2026-03-13
Source repo: `/mnt/a/ohmic-audio-labs`
Target repo: `Ohmicaudio/ohmic-audio-labs`
Status: preserve-history cleanup definition

Companion note:

- `/mnt/b/ohmic/docs/migration/OHMIC_AUDIO_LABS_MOVE_READINESS_CHECKLIST_2026-03-13.md`
- `/mnt/b/ohmic/docs/migration/OHMIC_STATIC_CONTENT_IMPORT_SURFACE_2026-03-13.md`

## Purpose

Define what belongs in the main `ohmic-audio-labs` repo as the long-lived app/runtime source of truth, and what should be moved out later instead of continuing to accumulate in the same tree.

Unlike the firmware repos, this repo should preserve history.
The goal is not a clean-room import.
The goal is to draw the boundary now so cleanup can happen without wrecking the main app/runtime surface.

## Keep in the main repo

These are the core product/runtime surfaces and should remain in `ohmic-audio-labs`.

### App and shell entrypoints

- `App.tsx`
- `index.tsx`
- `index.html`
- `index.css`
- `constants.ts`
- `types.ts`
- `vite.config.ts`
- `vitest.config.ts`
- `tsconfig.json`
- `capacitor.config.ts`
- `package.json`
- `package-lock.json`

### Interactive app/runtime source

- `src/`
- `components/`
- `hooks/`
- `store/`
- `utils/`
- `lib/`
- `platform/`

### Backend and runtime services

- `services/`

### Android/mobile shell

- `android/`

### Shared contracts and scripts

- `schemas/`
- `scripts/`
- `test/`
- `e2e/`

### Product workspace/runtime extensions

- `products/ohmic-osm/`

### Runtime-backed public/static assets that are actually shipped

- `public/`

Transitional note:

- as of 2026-03-13, `site/` and `content-work/` have been split toward `ohmic-static-content`
- `public/` remains temporarily in `ohmic-audio-labs` to avoid breaking runtime/deployment assumptions before static-host cutover

### Current architectural/product docs

- `docs/`

Keep especially:

- architecture
- contracts
- repo map
- deployment/development docs
- Android integration docs
- firmware-facing specs

## Move out later

These should not keep expanding inside the main app/runtime repo.
They are better candidates for a later docs/site/context/content repo split.

### Static content operations and SEO work

- `content-work.zip`
- remaining static `public/` payload once static-host cutover is complete

### Long-lived research/reference pools

- `knowledge/`
- `research/`

### Historical/archive material

- `archive/`

### Legacy firmware leftovers

- `firmware/`

Reason:

- firmware should live in the dedicated firmware repos
- static/SEO work should not continue to crowd the app/runtime repo
- research/archive content is useful, but not as co-equal runtime code

Before removing or archiving `firmware/`, see:

- `/mnt/b/ohmic/docs/migration/OHMIC_AUDIO_LABS_FIRMWARE_HARVEST_2026-03-13.md`

That harvest already preserves the small set of firmware artifacts still worth keeping as reference.

## Exclude from migration / keep local-only

These do not belong in the cleaned long-lived repo surface.

### Local/generated noise

- `.pio/`
- `.claude/`
- `.vscode/`
- `node_modules/`
- `dist/`
- `playwright-report/`
- `test-results/`
- `output/`
- `.playwright-cli/`

### Secrets and machine-local config

- `.env`
- `.env.local`

### Logs and scratch

- `backend_err.txt`
- `backend_final_log.txt`
- `backend_log.txt`
- `backend_new_log.txt`
- `dev-mobile.log`
- `dev.log`
- `content-work.zip`
- `sigma-flow-xml-skill-v3.zip`
- `.stash-backup/`

### Local memory/process artifacts

- `AGENT_MEMORY/`
- `memory/`

## Cleanup rule

When deciding whether something belongs in `ohmic-audio-labs`, ask:

1. Is it part of the interactive app/runtime, backend, mobile shell, or shared contract surface?
2. Is it needed to build, test, or ship those surfaces?
3. Is it active product documentation rather than archive or content-ops scratch?

If the answer is no, it should be a candidate for extraction, archiving, or the future `Ohmic` context/site layer.

## Recommendation

Use `ohmic-audio-labs` as:

- the app/runtime source of truth
- the shared contract/schema surface
- the mobile/web/backend integration home

Do not use it as:

- the firmware junk drawer
- the SEO/content-work queue
- the archive for every experiment
- the long-term semantic/context dump
