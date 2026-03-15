# Ohmic Minimum Trusted Checks

Date: 2026-03-15
Status: working proposal

## Purpose

Define the smallest check set we can actually trust after local work.

This is not a "whole repo is healthy" claim. It is a surface-by-surface trust
model for a repo set that still has too much unrelated drift to treat broad
root commands as truth.

## Working Rule

- A passing trusted check means the changed surface is probably safe.
- A passing trusted check does not bless untouched surfaces.
- If a task crosses surfaces, run the trusted checks for each touched surface.
- If no trusted check exists for the touched surface, say that plainly instead
  of pretending a broad root command covers it.

## Trusted Now

### 1. Shared Toolbox Math

Run when editing shared calculator math, fixtures, or math consumers under
`utils/` and `test/utils/`.

Commands:

```powershell
npx vitest run test/utils/toolboxMath.test.ts
```

Trust level:

- strong for regression coverage on the shared toolbox math contract
- does not cover unrelated app UI or backend behavior

### 2. Toolbox App Surface

Run when editing `apps/ohmic-toolbox`.

Commands:

```powershell
npm --prefix apps/ohmic-toolbox run test
npm --prefix apps/ohmic-toolbox run build
```

Trust level:

- strong for the app-local toolbox surface
- catches broken imports, type errors inside the app, and basic build breakage

### 3. App-to-Static Boundary

Run when editing static-host handoff behavior, dashboard gateway links, static
route assumptions, or app-shell links into the static tier.

Commands:

```powershell
$env:PLAYWRIGHT_STATIC_CONTENT_BASE_URL='https://ohmicaudio.com'
$env:VITE_STATIC_CONTENT_BASE_URL='https://ohmicaudio.com'
npm run test:e2e:static -- --project=chromium
```

Fallback for origin-level debugging:

```powershell
$env:PLAYWRIGHT_STATIC_CONTENT_BASE_URL='https://ohmic-audio-static-content.kzairsoft.workers.dev'
$env:VITE_STATIC_CONTENT_BASE_URL='https://ohmic-audio-static-content.kzairsoft.workers.dev'
npm run test:e2e:static -- --project=chromium
```

Trust level:

- strong for the app/static handoff
- does not validate the whole app or all static pages

### 4. Public Host and Redirect Smoke

Run when touching static-host deployment, custom-domain routing, robots/canonical
files, or redirect expectations.

Commands:

```powershell
curl.exe -I -s https://ohmicaudio.com/
curl.exe -I -s https://ohmicaudiolabs.com/
curl.exe -I -s https://ohmicaudio.com/robots.txt
```

Expected results on 2026-03-15:

- `https://ohmicaudio.com/` -> `200`
- `https://ohmicaudiolabs.com/` -> `301` to `https://ohmicaudio.com/`
- `https://ohmicaudio.com/robots.txt` -> `200`

Trust level:

- strong for live host/redirect sanity
- does not replace content QA deeper in the static tree

### 5. Backend Surface, Only When Touched

Run only when the task edits `services/backend`.

Commands:

```powershell
npm run backend:type-check
npm run backend:test
npm run backend:contracts:test
```

Trust level:

- trusted for backend-only work
- not part of the default minimum set for toolbox/static tasks

### 6. OSM Surface, Only When Touched

Run only when the task edits `products/ohmic-osm`.

Commands:

```powershell
npm run osm:test
```

Trust level:

- trusted for the OSM surface when that workspace is actually in play

## Explicitly Untrusted Right Now

These commands are useful as extra signal, but they do not currently count as a
minimum trusted gate for general local work:

```powershell
npm run type-check
npm run lint
npm run check
npm run validate:surfaces
```

Reasons:

- root `type-check` still drags in unrelated nested projects and stale type
  drift
- root `lint` still carries too much repo-wide noise to act as a clean gate
- broad aggregate commands overstate confidence when the task only touched one
  surface

## Minimum Run Matrix

### Toolbox math change

Run:

```powershell
npx vitest run test/utils/toolboxMath.test.ts
npm --prefix apps/ohmic-toolbox run test
```

Add `npm --prefix apps/ohmic-toolbox run build` if the consumer UI changed.

### Toolbox app UI change

Run:

```powershell
npm --prefix apps/ohmic-toolbox run test
npm --prefix apps/ohmic-toolbox run build
```

### Static boundary or gateway change

Run:

```powershell
$env:PLAYWRIGHT_STATIC_CONTENT_BASE_URL='https://ohmicaudio.com'
$env:VITE_STATIC_CONTENT_BASE_URL='https://ohmicaudio.com'
npm run test:e2e:static -- --project=chromium
curl.exe -I -s https://ohmicaudio.com/
curl.exe -I -s https://ohmicaudiolabs.com/
```

### Static-content front-door file change

Run:

```powershell
curl.exe -I -s https://ohmicaudio.com/
curl.exe -I -s https://ohmicaudiolabs.com/
curl.exe -I -s https://ohmicaudio.com/robots.txt
```

### Backend-only change

Run:

```powershell
npm run backend:type-check
npm run backend:test
npm run backend:contracts:test
```

## Automation Later

The next upgrade should be a small named-check layer instead of more tribal
memory, for example:

- `checks:toolbox`
- `checks:static-boundary`
- `checks:host-smoke`
- `checks:backend`

Those wrappers should call the same commands above, not invent a bigger gate.

## Bottom Line

Until the repo-wide noise is reduced, the honest model is:

- trust small checks tied to the changed surface
- treat broad root checks as advisory only
- record clearly when a surface has no trusted automated check yet
