Status: verification_note
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic HardwareLayout AmpLab Shell Smoke

## What Changed

Added a focused `HardwareLayout`-level regression check:

- `test/components/HardwareLayoutAmpLabShell.test.tsx`

## Coverage

The check mounts the full `HardwareLayout` shell with the AmpLab device active,
then verifies that the mounted shell path still exposes:

- the AmpLab device branch
- linked-unit copy
- visible flow-state copy
- visible transport badge copy

## Why This Matters

The existing AmpLab coverage already proved:

- discovery/telemetry hook behavior
- deck content routing
- panel-level control rendering

This adds the missing page-shell layer without widening into live browser or
live device automation.

## Verification

Ran:

- `npx vitest run test/components/HardwareLayoutAmpLabShell.test.tsx`

Result:

- `1` file passed
- `1` test passed
