Date: 2026-03-17
Status: active decision
Project: cyd-remote

# Ohmic Remote Store Demo Mode And Fake Surface Quarantine

## Rule

Fake or illustrative presentation belongs only in demo/store mode.

## Demo / Store Allowed

- sample telemetry
- looped animations
- rotating feature cards
- non-live showcase panes
- sandboxed or disabled control writes

## Normal Mode Forbidden

- fake `RTA`
- decorative fake meters
- placeholder motion presented as live data
- demo telemetry without obvious badging

## Badge Requirement

If demo/store mode is active, the screen must say so clearly.

Recommended labels:

- `DEMO`
- `STORE`
- `NOT LIVE`

## Current Effect

The reserved handheld live slot is now quarantined correctly:

- normal mode shows live-source truth only
- fake motion is excluded
- richer display behavior can be added later only when backed by real runtime
  sources or explicit demo/store posture
