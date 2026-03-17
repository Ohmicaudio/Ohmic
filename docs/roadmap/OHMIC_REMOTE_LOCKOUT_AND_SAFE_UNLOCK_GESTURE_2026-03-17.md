Date: 2026-03-17
Status: active decision
Project: cyd-remote

# Ohmic Remote Lockout And Safe Unlock Gesture

## Goal

Prevent accidental writes without blocking passive monitoring.

## Lockout Posture

When locked:

- status, connection, and live-source truth remain visible
- navigation remains available for non-writing pages
- muting, volume, source, and run-trigger writes are blocked
- blocked actions should show a short lock reason instead of doing nothing

## Unlock Model

Use one bounded unlock gesture before implementation churn:

- recommended: triple tap on the center mute/control button within `2s`
- fallback: press-and-hold center button for `1.5s`

Only one unlock gesture should ship in normal mode. Avoid stacking multiple
hidden gestures unless required for recovery.

## Auto-Relock

The handheld should relock after:

- configurable idle timeout
- explicit relock action
- reboot

unless an explicit operator-maintained unlocked session exists later.
