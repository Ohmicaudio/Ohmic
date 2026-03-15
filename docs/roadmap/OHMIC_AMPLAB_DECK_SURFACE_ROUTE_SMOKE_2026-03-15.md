Status: verified
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic AmpLab Deck Surface Route Smoke

## Purpose

Record the first route-like AmpLab shell smoke below full browser automation by
testing the real `DeckContentHost` branch with the actual `HardwareDeckPanel`.

## Added Check

Test file:

- `B:\ohmic\repos\ohmic-audio-labs\test\components\AmpLabDeckContentHost.test.tsx`

Runnable command:

- `npm run test -- --run test/components/AmpLabDeckContentHost.test.tsx test/components/AmpLabHardwareDeckPanel.test.tsx test/components/AmpLabDiscoveryTelemetryHooks.test.tsx test/components/AmpLabControlHost.test.tsx test/components/AmpLabControlSurfaces.test.tsx`

## What It Covers

- the real AmpLab deck content branch mounts through `DeckContentHost`
- linked-unit copy is derived correctly from the selected unit state
- fresh telemetry produces `streaming` flow state
- stale telemetry falls back to `stale` flow state
- telemetry-shaped values remain visible through the shell path

## Remaining Gap

This closes the route-like shell gap, but the browser and live-device layers
are still separate work.

Still missing:

- `HardwareLayout`-level mounting through the full page shell
- live browser discovery/link behavior against the DSP unit
- phone-assisted same-Wi-Fi browser validation

## Conclusion

The AmpLab lane now has four honest layers:

- hook coverage
- host panel smoke
- deck content route-like smoke
- live device HTTP validation

That is a much stronger baseline before the browser/live checks.
