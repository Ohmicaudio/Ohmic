Status: implementation_note
Date: 2026-03-15
Project: ohmic-audio-static-content

# Ohmic Static Live Link Naming Alignment

## Scope

Apply one bounded public-copy pass so the static landing page reflects the
current naming model more accurately.

## Applied Changes

- `AmpLab + TuneScope` summary language now presents `Ohmic Live Link +
  TuneScope`
- the surface-layer summary now names `Ohmic Audio Labs` as the main shell
- the first ecosystem module card now uses `Ohmic Live Link` instead of treating
  `AmpLab` as the generic discovery/link plane
- the display/shell module card now uses `Ohmic Audio Labs` rather than
  collapsing the shell into only `DashLab + StreetHub`

## Why

The product model is now clearer than the older concept pass:

- `Ohmic Live Link` is the generic discovery/link layer
- `Ohmic Audio Labs` is the main shell
- device-specific names should not absorb generic link behavior in public copy

## Verification

- diff sanity check against `public/index.html`

## Boundary

This is a naming-alignment copy pass only.

It does not yet rework the full public information hierarchy around every deck
or device surface.
