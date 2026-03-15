Status: implementation_note
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Phone AmpLab Discovery Link Fix Result

## Scope

Apply one bounded code fix to the discovery layer after the phone-assisted live
smoke proved that UI reachability and backend participation were already
working.

## Implemented Change

The discovery hook now prefers the already-known sync/backend origin for
hardware proxy probes when that origin is available.

That means the handset/browser path no longer depends on the current web host
also serving `/api/proxy` correctly before it can probe a live unit.

## Why This Is The Right Layer

- the worker result already proved the phone could reach the UI
- backend sync traffic from the phone was already proven
- the browser desktop path already linked successfully after manual
  refresh-plus-link
- the remaining gap was discovery/link parity, not generic network access

This keeps the fix in shared discovery behavior rather than adding a special
phone-only AmpLab branch.

## Files Changed

- `components/Hardware/useAmpLabDiscoveryPlane.ts`
- `test/components/AmpLabDiscoveryTelemetryHooks.test.tsx`

## Verification

Targeted test pass:

- `npm run test -- --run test/components/AmpLabDiscoveryTelemetryHooks.test.tsx`

Verified coverage now includes:

- existing single-unit auto-link behavior
- explicit discovery-origin proxy behavior
- telemetry hook fallback behavior

## Honest Boundary

This is a code-level discovery fix and regression proof.

It is not yet a new live handset validation pass against the real unit.

That live re-check is the next queued step.
