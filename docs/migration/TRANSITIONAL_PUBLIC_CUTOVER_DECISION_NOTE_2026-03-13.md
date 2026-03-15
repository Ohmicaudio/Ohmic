# Transitional Public Cutover Decision Note

Status: Resolved on 2026-03-14  
Date: 2026-03-13

## Purpose

Capture the now-resolved public-domain decision for the static-host cutover so
the shared docs stop treating it as open routing uncertainty.

## Resolved Decision

1. `https://ohmicaudio.com` is the canonical public static host.
2. `https://ohmicaudiolabs.com` is the legacy public alias and should redirect
   to `https://ohmicaudio.com`.
3. `ohmic-audio-static-content` remains the ownership home for static suites,
   support files, and content-maintenance scripts.

## Ownership Split

### App/runtime-owned surfaces for now

- `favicon.svg`
- `ohmic-logo.svg`
- minimum route fallbacks still required by current app preview/runtime

Reason:

- these are still directly consumed by the app shell and UI surfaces
- the app repo still needs a follow-up host-default cleanup pass where the
  claimed files overlap a dirty local worktree

### Static-host-owned surfaces

- docs suites
- knowledge/reference pages
- interactive static tool pages
- content-maintenance scripts
- crawl/index support files once repo-local metadata cleanup is complete

Reason:

- those surfaces are already outside the core app/runtime repo
- the dedicated static repo already owns the source and maintenance direction

## Verification Snapshot

- `https://ohmicaudio.com/` returned `200` from the current workstation on
  2026-03-15
- `https://ohmicaudiolabs.com/` returned `301` to `https://ohmicaudio.com/`
  from the current workstation on 2026-03-15

## Remaining Follow-Up

- normalize repo-local app defaults and redirects away from the temporary
  `workers.dev` hostname and old labs product URLs where that work overlaps the
  dirty `ohmic-audio-labs` worktree
- perform the broader generated metadata sweep in `ohmic-audio-static-content`
  so canonical tags, AI indexes, and support files all point at
  `https://ohmicaudio.com`

## Related Docs

- `B:/ohmic/docs/migration/STATIC_CONTENT_PARITY_AUDIT_2026-03-13.md`
- `B:/ohmic/agent-system/requests/done/2026-03-13-cut-over-transitional-public-payload-to-static-host.md`
- `B:/ohmic/agent-system/requests/blocked/2026-03-14-normalize-ohmic-audio-labs-host-defaults-to-ohmicaudio-com.md`
