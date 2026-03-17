Date: 2026-03-17
Status: active decision
Project: cyd-remote

# Ohmic Remote Mode Boundaries

## Modes

### Normal

Normal mode is truthful operator runtime.

- show only live status, live source truth, capability truth, and real command
  outcomes
- allow display/status viewing at all times
- keep handheld controls minimal and safety-bounded
- exclude fake telemetry, fake motion, and decorative placeholder behavior

### Locked

Locked mode is a safe operator posture, not a sleep state.

- passive status viewing remains visible
- action controls are visually present but non-writing
- connection truth remains visible
- unlock must be explicit and bounded

### Demo / Store

Demo/store mode is an explicit non-normal posture.

- fake or illustrative visuals are allowed only here
- sample telemetry may be shown only when clearly badged as demo
- writes to live control targets should be disabled or sandboxed
- the screen must visibly indicate demo/store state at all times

## Current Handheld Posture

The current remote should be treated as:

- normal mode by default
- display-first
- connection/status-first
- minimal-safe control surface

That means heavier control UI should not silently grow ahead of authority and
routing truth.
