Status: ready
Priority: high
Date: 2026-03-17
Project: cyd-remote

# Converge Remote Off Local Wifi Flow And Onto Shared Network Core

## Goal

Port the handheld off its local Wi-Fi/onboarding flow and onto the shared
network-core contract once that seam is defined.

## Source

- `docs/roadmap/OHMIC_NETWORK_AND_TELEMETRY_STACK_CONSOLIDATION_WAVE_2026-03-17.md`

## Focus

- remote network client behavior
- shared join/retry/state truth
- reduction of local Wi-Fi-only logic

## Acceptance

- the remote no longer owns a divergent network floor by default
- join/retry/status truth comes from the shared network core
- handheld-specific code is limited to UI/operator behavior

