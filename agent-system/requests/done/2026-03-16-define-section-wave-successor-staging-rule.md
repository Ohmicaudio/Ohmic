Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T105600Z-e51283b0

# Define Section Wave Successor Staging Rule

## Goal

Define exactly when and how successor packets should be staged behind an active
section wave.

## Focus

- successor timing
- hot-ready successor requirement
- staged successor requirement
- completion-prep staging
- family exceptions

## Acceptance

- one successor-staging packet is explicit
- section waves stop waiting for depletion before replacing themselves

## Result

- defined the staging rule in
  `docs/systems/OHMIC_SECTION_WAVE_SUCCESSOR_STAGING_RULE_2026-03-16.md`
- locked successor staging to begin before depletion instead of after collapse
