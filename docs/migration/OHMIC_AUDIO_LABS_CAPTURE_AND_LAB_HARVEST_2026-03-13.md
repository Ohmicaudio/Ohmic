# Ohmic Audio Labs Capture and Lab Harvest

Date: 2026-03-13
Source repo: `/mnt/a/ohmic-audio-labs`
Harvest root: `/mnt/b/ohmic/harvest/ohmic-audio-labs`

## Purpose

Preserve non-runtime material that should not continue living inside the main
`ohmic-audio-labs` app/backend/mobile repo.

This harvest is not a new source of truth. It is a retained reference copy so
the main repo can stay focused on runtime surfaces.

## Harvested from `captures/`

Copied to:

- `/mnt/b/ohmic/harvest/ohmic-audio-labs/captures/`

Contents preserved:

- Dayton USB capture artifacts
- filtered capture text output
- local capture helper logs that were sitting beside the raw capture set

## Harvested from `labs/`

Copied to:

- `/mnt/b/ohmic/harvest/ohmic-audio-labs/labs/`

Contents preserved:

- `lvgl-gauge-lab`
- migrated prompt history and local lab metadata

## Result

As of this harvest:

- `captures/` has been removed from `ohmic-audio-labs`
- `labs/` has been removed from `ohmic-audio-labs`
- these surfaces should not be reintroduced as first-class runtime content in
  the main app repo

If any of this material becomes active again, it should move into a dedicated
repo or a clearly-scoped experimental surface rather than back into the main
runtime tree.
