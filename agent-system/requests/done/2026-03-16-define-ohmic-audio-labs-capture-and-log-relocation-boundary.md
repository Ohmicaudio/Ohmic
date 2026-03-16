Status: done
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T034328Z-75332219

# Define Ohmic Audio Labs Capture And Log Relocation Boundary

## Goal

Define where local logs, staging bundles, and capture folders should live if
they still have operational value but do not belong in the repo root.

## Focus

- local logs
- `content-work/*`
- local zip bundles
- capture relocation targets
- local-only storage boundary

## Acceptance

- relocation targets are explicit
- repo root clutter has a defined way out
- useful local artifacts can survive without pretending to be source

## Result

- defined relocation targets in
  `docs/roadmap/OHMIC_OHMIC_AUDIO_LABS_CAPTURE_AND_LOG_RELOCATION_BOUNDARY_2026-03-16.md`
- routed retained evidence to `B:\ohmic-local\retained-evidence\ohmic-audio-labs\*`
- routed staging/import material to `B:\ohmic-local\staging\ohmic-audio-labs\*`
- made loose logs and zip bundles explicitly non-permitted as ambient repo-root
  clutter
