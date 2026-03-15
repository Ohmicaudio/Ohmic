# Ohmic AmpLab Browser Shell Regression Wave

Date: 2026-03-15
Project: ohmic-audio-labs

## Purpose

Bundle the next browser-shell regression packet around the AmpLab deck so live
link progress stops depending on scattered one-off checks.

This wave exists to enforce the parity target defined in:

- `docs/roadmap/OHMIC_POST_LINK_LIVE_PATH_PARITY_WAVE_2026-03-15.md`

## Why This Should Travel Together

Recent work already proved that these concerns are tightly coupled:

- shell route readiness
- deck body readiness
- discovery telemetry state
- linked/current-device presentation

If these checks are split apart, regressions show up as vague shell drift
instead of as a single broken live-link path.

## Regression Packet Contents

The next browser-shell regression wave should contain four pieces.

### 1. AmpLab Deck Surface Route Smoke

Goal:

- verify the browser shell can still reach the AmpLab deck surface without
  route or bootstrap drift

What to check:

- shell boots
- deck route or tab can be opened
- expected deck shell frame renders

Preferred tool:

- Playwright smoke

### 2. Deck Body Readiness Check

Goal:

- verify the deck body does not stop at a blank or half-ready shell when the
  shell frame itself renders

What to check:

- readiness/loading state is visible when expected
- deck content resolves into a real state, not an empty frame
- fallback and linked states are distinguishable

Preferred tool:

- Playwright

### 3. Hardware Discovery Telemetry Regression

Goal:

- keep discovery state shaping and shell-visible telemetry from drifting

What to check:

- discovery status transitions remain stable
- fallback candidate handling remains explicit
- linked/current-device state is not mislabeled as generic discovery state

Preferred tool:

- targeted Vitest coverage for discovery hooks and presentation helpers

### 4. Linked/Current-Device Shell State Regression

Goal:

- keep shell and deck wording/state consistent once parity fixes land

What to check:

- linked device is shown as current state
- current linked device is not rendered back into the ordinary discovery list
- device wording stays neutral at the shell layer
- AmpLab-specific readiness stays inside the instrument surface

Preferred tool:

- targeted component tests plus one shell-level browser assertion

## What Should Not Be In This Packet

Do not widen this regression wave into:

- full device-link-plane extraction
- broad mobile transport debugging
- backend chirp packaging
- unrelated OSM or product-lane regrouping

Those are separate packets.

## Minimum Execution Order

1. shell route smoke
2. deck body readiness check
3. discovery telemetry regression
4. linked/current-device regression
5. one live browser rerun against the real endpoint after the packet lands

## Success Condition

This packet is successful when a live-link change can land with one clear
browser-shell check set instead of rediscovering the shell/deck path from
scratch.

## Immediate Follow-On

After this regression packet is defined, the next implementation wave should
package these checks into one execution slice rather than reopening them as
independent microtasks.
