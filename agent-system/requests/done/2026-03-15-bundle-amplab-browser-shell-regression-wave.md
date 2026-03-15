Status: done
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T235456Z-40dd0614

# Bundle AmpLab Browser Shell Regression Wave

## Goal

Define the next grouped regression wave around the AmpLab browser shell, deck
readiness, and linked-device path so the live-link progress does not drift.

## Focus

- browser shell
- deck body readiness
- linked-device state surfaces
- direct regression coverage that should travel together

## Acceptance

- one grouped regression packet is defined
- test and smoke boundaries are clear
- follow-on implementation can proceed without rediscovering the whole path

## Result

- defined the grouped regression packet in
  `docs/roadmap/OHMIC_AMPLAB_BROWSER_SHELL_REGRESSION_WAVE_2026-03-15.md`
- bundled route smoke, deck readiness, discovery telemetry, and
  linked/current-device shell checks into one browser-shell packet
- made the follow-on implementation wave explicit so these checks can travel as
  one slice instead of reopening as microtasks
