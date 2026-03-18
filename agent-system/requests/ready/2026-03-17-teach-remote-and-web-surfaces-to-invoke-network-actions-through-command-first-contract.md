Status: ready
Priority: medium
Date: 2026-03-17
Project: firmware

# Teach Remote And Web Surfaces To Invoke Network Actions Through Command First Contract

## Goal

Move remote and web surfaces onto the shared network action topics so scans,
connects, and target changes are initiated through the runtime contract instead
of bespoke UI handlers.

## Source

- `docs/roadmap/OHMIC_SHARED_NETWORK_COMMAND_SURFACE_WAVE_2026-03-17.md`

## Focus

- remote invoker flow
- web invoker flow
- fallback/manual entry posture

## Acceptance

- at least one active surface invokes the shared network action topics
- manual entry remains available as fallback, not first-class path
- UI logic stops owning transport behavior directly
