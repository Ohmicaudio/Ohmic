Status: verified
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic AmpLab Control Bridge Coverage

## Purpose

Document the first direct coverage added for the bounded AmpLab control bridge
slice so the already-landed bridge files are not left unverified.

## Added Checks

Test files:

- `B:\ohmic\repos\ohmic-audio-labs\test\components\AmpLabControlHost.test.tsx`
- `B:\ohmic\repos\ohmic-audio-labs\test\components\AmpLabControlSurfaces.test.tsx`

Runnable command:

- `npx vitest run test/components/AmpLabControlHost.test.tsx test/components/AmpLabControlSurfaces.test.tsx`

## What It Covers

### Host-to-surface bridge mapping

- `AmpLabControlHost.tsx` maps the live session snapshot into the surface props
- ship summary and node-control values reach the control surface boundary

### Control-surface BLE command path

- `AmpLabControlSurfaces.tsx` sanitizes valid BLE JSON commands before sending
- invalid JSON is rejected with a status message instead of being sent

## Remaining Gap

This still does not directly cover `useAmpLabControlPlane.ts`.

Still missing:

- hook-level coverage for transport fallback ordering
- direct checks for HTTP fallback and BLE fallback behavior in the control plane
- a broader host-plus-hook integration pass once the surrounding hardware runtime is calmer

## Conclusion

The AmpLab bridge now has real direct coverage on the host/surface layer, and
the remaining gap is narrowed to the transport/control-plane hook rather than
the whole bridge boundary.
