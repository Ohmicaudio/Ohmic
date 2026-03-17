Status: ready
Priority: high
Date: 2026-03-17
Project: firmware

# Normalize AP Vs Lan Target Selection Over The Shared Network Contract

## Goal

Make AP recovery targets, LAN live targets, and saved targets follow one shared
truth model across the stack.

## Source

- `docs/roadmap/OHMIC_NETWORK_AND_TELEMETRY_STACK_CONSOLIDATION_WAVE_2026-03-17.md`

## Focus

- AP vs LAN target semantics
- saved-target guards
- recovery vs live routing

## Acceptance

- AP is recovery/onboarding truth, not a default blind target
- LAN live targets are preferred when the current network supports them
- the same target-selection rules apply across participant classes

