Status: working checks
Date: 2026-03-15

# Ohmic Audio Labs Minimum Trusted Runtime Checks

## Purpose

Define the smallest trustworthy check set for `ohmic-audio-labs` right now.

This is not a whole-repo quality claim.

It is the minimum surface-by-surface runtime floor that still means something
while the repo remains broadly dirty.

## Core Rule

Use the smallest check that matches the surface you actually touched.

Do not treat broad root commands as truthful just because they exist.

## Trusted Now

## 1. Toolbox app surface

Use when changing:

- `apps/ohmic-toolbox`

Commands:

```bash
cd /mnt/b/ohmic/repos/ohmic-audio-labs/apps/ohmic-toolbox
npm run test
npm run build
```

Trust:

- strong for toolbox UI and local imports
- catches broken TypeScript/build issues inside the toolbox app

Does not cover:

- main dashboard/runtime behavior
- backend behavior
- static-host gateway behavior

## 2. Shared toolbox math

Use when changing:

- `utils/toolboxMath.ts`
- `utils/toolboxMath.fixtures.ts`
- `test/utils/toolboxMath.test.ts`

Command:

```bash
cd /mnt/b/ohmic/repos/ohmic-audio-labs
npx vitest run test/utils/toolboxMath.test.ts
```

Trust:

- strong for shared formula regression

Does not cover:

- toolbox UI rendering by itself
- main app runtime

## 3. App-to-static boundary

Use when changing:

- dashboard links into static surfaces
- static handoff assumptions
- gateway navigation
- static route expectations

Commands:

```bash
cd /mnt/b/ohmic/repos/ohmic-audio-labs
PLAYWRIGHT_STATIC_CONTENT_BASE_URL='https://ohmicaudio.com' \
VITE_STATIC_CONTENT_BASE_URL='https://ohmicaudio.com' \
npm run test:e2e:static -- --project=chromium
```

Fallback origin debugging:

```bash
cd /mnt/b/ohmic/repos/ohmic-audio-labs
PLAYWRIGHT_STATIC_CONTENT_BASE_URL='https://ohmic-audio-static-content.kzairsoft.workers.dev' \
VITE_STATIC_CONTENT_BASE_URL='https://ohmic-audio-static-content.kzairsoft.workers.dev' \
npm run test:e2e:static -- --project=chromium
```

Trust:

- strong for the current dashboard/static-tier handoff

Does not cover:

- deep app workflows
- backend correctness

## 4. Live host smoke

Use when changing:

- static host front door
- custom-domain routing
- robots/canonical expectations

Commands:

```bash
curl -I -s https://ohmicaudio.com/
curl -I -s https://ohmicaudiolabs.com/
curl -I -s https://ohmicaudio.com/robots.txt
```

Expected current results:

- `https://ohmicaudio.com/` -> `200`
- `https://ohmicaudiolabs.com/` -> `301` to `https://ohmicaudio.com/`
- `https://ohmicaudio.com/robots.txt` -> `200`

Trust:

- strong for host/redirect sanity

## 5. Backend-only surface

Use only when editing:

- `services/backend`

Commands:

```bash
cd /mnt/b/ohmic/repos/ohmic-audio-labs
npm run backend:type-check
npm run backend:test
npm run backend:contracts:test
```

Trust:

- strong for backend-only changes

## 6. OSM-only surface

Use only when editing:

- `products/ohmic-osm`

Command:

```bash
cd /mnt/b/ohmic/repos/ohmic-audio-labs
npm run osm:test
```

Trust:

- strong for OSM-only work

## Explicitly Untrusted As General Gates

These still exist, but do not currently count as minimum trusted checks for the
repo as a whole:

```bash
npm run type-check
npm run lint
npm run check
npm run validate:surfaces
```

Why:

- too much unrelated repo noise
- nested lanes drag in stale failures
- broad success or failure says too little about the exact changed surface

## Current App Runtime Reality

The main `ohmic-audio-labs` runtime does not yet have one small universal check
that blesses the whole app honestly.

So the trustworthy rule today is:

- toolbox changes -> toolbox checks
- static handoff changes -> static e2e plus host smoke
- backend changes -> backend checks
- OSM changes -> OSM tests

If a task changes multiple surfaces, run the trusted checks for each touched
surface.

## Best Minimum Matrix Right Now

### Toolbox calculator or UI slice

Run:

```bash
cd /mnt/b/ohmic/repos/ohmic-audio-labs/apps/ohmic-toolbox
npm run test
npm run build
```

Add:

```bash
cd /mnt/b/ohmic/repos/ohmic-audio-labs
npx vitest run test/utils/toolboxMath.test.ts
```

when shared math changed.

### Dashboard/static gateway slice

Run:

```bash
cd /mnt/b/ohmic/repos/ohmic-audio-labs
PLAYWRIGHT_STATIC_CONTENT_BASE_URL='https://ohmicaudio.com' \
VITE_STATIC_CONTENT_BASE_URL='https://ohmicaudio.com' \
npm run test:e2e:static -- --project=chromium

curl -I -s https://ohmicaudio.com/
curl -I -s https://ohmicaudiolabs.com/
```

### Backend slice

Run:

```bash
cd /mnt/b/ohmic/repos/ohmic-audio-labs
npm run backend:type-check
npm run backend:test
npm run backend:contracts:test
```

### OSM slice

Run:

```bash
cd /mnt/b/ohmic/repos/ohmic-audio-labs
npm run osm:test
```

## Summary

The honest minimum trusted checks are surface-specific, not repo-wide.

That is the right model until the larger repo dirt is reduced.
