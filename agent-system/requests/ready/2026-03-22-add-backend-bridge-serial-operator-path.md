---
title: Add backend bridge serial operator path
date: 2026-03-22
topic: backend-bridge-serial-operator-path
status: ready
owner: codex
---

# add-backend-bridge-serial-operator-path

## Goal

Expose the live bridge serial JSON contract through the backend so bridge setup,
status, source selection, route selection, and recovery actions can be driven by
host/operator tools without depending on Android taps or direct ad hoc shell
scripts.

## Why now

- the bridge serial contract is now proven live on `COM26`
- the Android path is still not trustworthy enough for unattended operator work
- the bridge-first pivot needs a real host-side control plane, not just raw
  firmware capability

## Scope

- add a backend bridge-serial module that can:
  - send one JSON command to a specified COM port
  - capture the first matching JSON result/status response
  - surface serial diagnostics when useful
- add backend routes for:
  - status readback
  - generic command dispatch
- add frontend service helpers for the backend serial bridge path
- validate against the live bridge on `COM26`

## Done when

- a host/backend caller can request bridge serial status without Android
- a host/backend caller can send at least one real bridge command over serial
- live validation against `COM26` is recorded on the board
- the new operator path reuses the existing bridge JSON schema rather than
  inventing a second contract
