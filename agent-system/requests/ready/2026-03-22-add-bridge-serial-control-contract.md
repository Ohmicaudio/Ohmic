---
title: Add bridge serial control contract
date: 2026-03-22
topic: bridge-serial-control-contract
status: ready
owner: codex
---

# add-bridge-serial-control-contract

## Goal

Add a direct serial JSON control contract for the headless audio bridge so setup,
targeting, source selection, route preference, transport control, and status can
all be driven without depending on the Android app or bridge HTTP reachability.

## Why now

- the bridge-first pivot is now the main path
- COM26 is a real live bridge board
- bridge HTTP is useful, but it still assumes we can reach the bridge over the
  network first
- serial gives us a stable bring-up and recovery lane that fits the control-first
  architecture better than brittle UI taps

## Scope

- add a line-oriented serial JSON command surface on the bridge runtime
- support:
  - `status`
  - `network.scan`
  - `network.connect`
  - `network.connect_saved`
  - `network.disconnect`
  - `network.target`
  - `network.recovery_target`
  - `media.source`
  - `media.route`
  - `media.transport`
  - `refresh`
- reuse the same underlying bridge actions as the HTTP API instead of duplicating
  action logic
- validate the serial contract live on `COM26`

## Done when

- bridge build passes
- handheld build still passes
- live bridge on `COM26` accepts serial JSON commands
- serial `status` returns the same core truth the HTTP API exposes
- at least one real control command and one real status readback are verified on
  live hardware
