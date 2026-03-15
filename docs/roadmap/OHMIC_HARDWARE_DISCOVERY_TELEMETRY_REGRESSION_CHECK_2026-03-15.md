Status: verified
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Hardware Discovery Telemetry Regression Check

## Purpose

Record the first reusable host-level regression smoke for the AmpLab discovery
and telemetry lane after the hook-specific tests were added.

## Added Check

Test file:

- `B:\ohmic\repos\ohmic-audio-labs\test\components\AmpLabHardwareDeckPanel.test.tsx`

Runnable command:

- `npm run test -- --run test/components/AmpLabHardwareDeckPanel.test.tsx test/components/AmpLabDiscoveryTelemetryHooks.test.tsx test/components/AmpLabControlHost.test.tsx test/components/AmpLabControlSurfaces.test.tsx`

## What It Covers

- live discovery status copy is rendered in the AmpLab host panel
- linked unit state is rendered with an explicit selected base URL
- transport badge and flow state are rendered together
- signal snapshot values are rendered from telemetry-shaped data
- refresh, link, open-page, and live-toggle actions still wire their handlers

## Remaining Gap

This is the right next regression floor, but it still stops short of a true
route-level or browser-level live validation pass.

Still missing:

- deck-surface or route-level mounting through the real hardware shell
- browser discovery and telemetry confirmation against the live unit
- phone-assisted same-Wi-Fi browser confirmation

## Conclusion

The AmpLab discovery and telemetry lane now has:

- direct hook-level coverage
- one repeatable host-level smoke check

That is enough to keep the lane honest while the next browser/live checks stay
explicit.
