# Transitional Public Cutover Decision Note

Status: Proposed default  
Date: 2026-03-13

## Purpose

Narrow the remaining blocker around the `public/` cutover by separating:

- decisions that can be made now
- decisions that still require external deployment/domain confirmation

## Default Recommendation

Until static hosting is live and verified:

1. Keep the app/runtime repo functional with transitional app-served payloads.
2. Treat `ohmic-audio-static-content` as the ownership home for static suites,
   support files, and content-maintenance scripts.
3. Keep only the minimum app-served assets needed for:
   - current app shell rendering
   - current preview/development flows
   - link continuity during cutover

## Recommended Ownership Split

### Stay app-served for now

- `favicon.svg`
- `ohmic-logo.svg`
- minimum route fallbacks still required by current app preview/runtime

Reason:

- these are still directly consumed by the app shell and UI surfaces
- keeping them local avoids breaking active preview/runtime paths before the
  external static host is reachable

### Move and remain owned by `ohmic-audio-static-content`

- docs suites
- knowledge/reference pages
- interactive static tool pages
- content-maintenance scripts
- crawl/index support files once the external host serves them canonically

Reason:

- those surfaces are already conceptually outside the core app/runtime repo
- the dedicated static repo already owns the source/maintenance direction

## What Is Still Actually Blocked

The unresolved part is no longer “what should move.”

The unresolved part is:

1. who owns deployment of `ohmic-audio-static-content`
2. when `ohmicaudiolabs.com` and/or `ohmicaudio.com` will resolve publicly
3. which domain is canonical vs alias/redirect at cutover time

## Operational Rule Until Resolved

- do not remove the transitional `public/` payload from `ohmic-audio-labs`
- do not assume external static-host cutover is ready
- continue treating the current app-served payload as transitional, not final

## Related Docs

- `A:/ohmic-audio-labs/docs/PUBLIC_PAYLOAD_INVENTORY_2026-03-13.md`
- `A:/ohmic-audio-labs/docs/TRANSITIONAL_PUBLIC_PAYLOAD_BOUNDARY_2026-03-13.md`
- `B:/ohmic/docs/migration/OHMIC_STATIC_CONTENT_IMPORT_SURFACE_2026-03-13.md`
