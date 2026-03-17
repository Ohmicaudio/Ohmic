Date: 2026-03-17
Status: ready
Project: cyd-remote

# Ohmic Remote Operator Modes And Control Authority Wave

## Why

The handheld is no longer just a flashy experiment. It needs explicit operating
truth for normal use, store/demo presentation, lockout/safe handling, and who
actually owns a control at any given moment.

## Target

- define normal vs demo/store vs locked operator modes
- define control authority truth for volume, mute, source, and run-trigger paths
- define control routing truth so the handheld never implies the wrong target
- quarantine fake or display-only surfaces outside normal runtime

## Contract Rule

Operator controls should stay command-first and surface-agnostic.

That means:

- the shared control command is the real behavior
- handheld UI, web UI, Android UI, and desktop UI are just invokers
- authority, routing, rejection, and lockout truth must come from the same
  shared control model

## Child Requests

- `2026-03-17-run-remote-operator-modes-and-control-authority-wave.md`
- `2026-03-17-define-remote-normal-demo-and-lock-mode-behavior-boundaries.md`
- `2026-03-17-define-control-authority-and-routing-truth-for-remote-actions.md`
- `2026-03-17-define-remote-operator-lockout-and-safe-unlock-gesture.md`
- `2026-03-17-define-store-demo-mode-boundary-and-fake-surface-quarantine.md`
