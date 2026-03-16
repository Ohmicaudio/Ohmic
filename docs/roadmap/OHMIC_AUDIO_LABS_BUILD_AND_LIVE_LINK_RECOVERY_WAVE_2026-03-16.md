Status: working_packet
Date: 2026-03-16
Project: ohmic-audio-labs

# Ohmic Audio Labs Build And Live Link Recovery Wave

## Purpose

Queue the next highest-value recovery family in `ohmic-audio-labs` after the
active real-device smoke-test lane.

This wave restores two things the ecosystem currently needs at the same time:

- a truthful local build floor
- a trustworthy live-link control/discovery path

## Why It Matters

The earlier audit showed the repo is still missing a reliable root
`type-check` floor, and the latest device-link extraction left follow-through
work in both the hardware type lane and the HTTP command/discovery lane.

That means the project can currently look more unified while still being less
trustworthy to change.

## Immediate Next Tasks

1. fence the root TypeScript program to supported product surfaces
2. finish the `hardwareModel` type-import migration across the new hardware
   hosts
3. reconcile the active-instrument run contract so the new hosts agree on null
   vs non-null run identity
4. restore live-link HTTP fallback truth, including the local browser/host
   command path and explicit handling of the ESP32 AP endpoint

## Boundary

This family is not a broad hardware redesign.

Keep it bounded to:

- repo build scope
- hardware host/type seams
- active-instrument contract edges
- live-link command/discovery truth

Do not pull in broad shell styling, marketing deck cleanup, or unrelated DSP
feature expansion.

## Progress

Completed in the first recovery wave:

- root TypeScript program fence
- `hardwareModel` import migration
- active-instrument run-contract reconciliation
- live-link HTTP fallback restoration with explicit AP truth

## Remaining

The bounded phone-assisted rerun remains separate.

Only resume that rerun when:

- at least one live device endpoint responds again from the desktop
- the handset/browser path is available against the current host
