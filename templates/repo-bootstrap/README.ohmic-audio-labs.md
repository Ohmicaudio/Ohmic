# Ohmic Audio Labs

Main app/runtime repo for the Ohmic platform.

This repo is the long-lived home for:

- web app
- Android shell
- backend API and sync services
- shared contracts and schemas
- mobile/web/backend integration surfaces

It is not the place to keep accumulating firmware junk, archive dumps, or SEO/content-work operations forever.

## What belongs here

### App/runtime surfaces

- `App.tsx`
- `src/`
- `components/`
- `hooks/`
- `store/`
- `utils/`
- `lib/`
- `platform/`

### Backend/runtime services

- `services/`

### Mobile shell

- `android/`
- `capacitor.config.ts`

### Shared contracts and automation

- `schemas/`
- `scripts/`
- `test/`
- `e2e/`

### Product workspace/runtime extensions

- `products/ohmic-osm/`

### Runtime-backed public assets

- `public/`

### Active docs

- `docs/`

## What should move out later

These can stay during transition, but they should not define the long-term boundary of this repo:

- `content-work/`
- `site/`
- `knowledge/`
- `research/`
- `archive/`
- `firmware/`

## Local-only noise

Keep these out of the long-lived repo surface:

- `.pio/`
- `.claude/`
- `.vscode/`
- `node_modules/`
- `dist/`
- `playwright-report/`
- `test-results/`
- `output/`
- `.env`
- `.env.local`
- local logs and stash files

## Typical workflow

Install:

```bash
npm install
```

Run backend + web:

```bash
npm run dev:stack
```

Validation:

```bash
npm run validate:surfaces
```

## Architectural rule

The UI should depend on stable contracts and capabilities, not on firmware internals.

The app asks:

- who are you
- what can you do
- what is happening now
- do this / give me that

That contract-first model is the boundary between this repo and the firmware repos.
