Status: done
Priority: low
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T172723Z-f4b7e621

# Add Scriptable Ohmic Audio Labs Trusted Check Runner

## Goal

Turn the current minimum trusted runtime checks into a scriptable runner so the
surface-by-surface checks are easy to invoke consistently.

## Source

- `docs/roadmap/OHMIC_AUDIO_LABS_MINIMUM_TRUSTED_RUNTIME_CHECKS_2026-03-15.md`
- `docs/systems/OHMIC_MINIMUM_TRUSTED_CHECKS_2026-03-15.md`

## Focus

- scriptable check entrypoints
- surface-specific invocation
- documentation for usage and scope

## Acceptance

- one scriptable runner exists for the trusted check matrix
- the runner can target at least toolbox, shared math, static boundary, backend, and OSM surfaces
- usage is documented without pretending to bless the entire repo

## Outcome

Completed on 2026-03-15.

Result:

- added a single trusted-check runner with named surface entrypoints
- wired package scripts for toolbox, shared math, static boundary, host smoke,
  backend, and OSM checks
- documented the runner so it stays surface-specific instead of turning into a
  fake whole-repo gate

## Artifact

- `B:\ohmic\repos\ohmic-audio-labs\scripts\trusted-surface-checks.ps1`
- `B:\ohmic\repos\ohmic-audio-labs\docs\TRUSTED_SURFACE_CHECK_RUNNER.md`
- `B:\ohmic\repos\ohmic-audio-labs\package.json`
