Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic-audio-static-content
Owner: d
Claim ID: 20260316T111500Z-6d3a1e2c

# Audit Static Content Predeploy Validation Surface

## Goal

Map the current static-content preview/deploy path and make explicit what
validation checks are missing before deploy.

## Source

- `docs/roadmap/OHMIC_STATIC_CONTENT_VALIDATION_GATE_WAVE_2026-03-16.md`

## Focus

- current package scripts
- preview vs deploy path
- missing validation checks

## Acceptance

- the current predeploy gap is documented from repo truth
- the next validation command can be scoped cleanly

## Result

- documented the predeploy gap in
  `docs/roadmap/OHMIC_STATIC_CONTENT_VALIDATION_GATE_WAVE_2026-03-16.md`
- captured that the repo previously exposed deploy commands but no first-class
  validation entrypoint between edit and publish
