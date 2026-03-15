Status: implementation_note
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Live Link Discovery Separation

## Intent

Keep the discovery layer on-brand and structurally clean:

- `Ohmic Live Link` owns find/link behavior
- `Ohmic Audio Labs` remains the main control shell
- `AmpLab Deck` is the interpolated control surface
- `AmpLab` is the actual device

## Implemented UI Rule

The AmpLab deck no longer renders the currently linked unit inside the same
picker used for discovery results.

The deck now:

- keeps the current link in the `Unit:` state line
- labels the picker as `Ohmic Live Link`
- shows only discoverable/non-linked units in the picker
- disables `Link Unit` when there are no new discoverable units to link

## Why This Matters

This prevents the linked/current device from being treated like a fresh search
result and keeps discovery semantics aligned with the Live Link layer instead of
the device/deck layer.

## Verification

- `npm run test -- --run test/components/AmpLabHardwareDeckPanel.test.tsx`
