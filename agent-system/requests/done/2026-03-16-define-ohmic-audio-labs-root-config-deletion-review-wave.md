Status: done
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T041642Z-ba452ff0

# Define Ohmic Audio Labs Root Config Deletion Review Wave

## Goal

Define the review wave for risky root config deletions so setup-critical files
are not lost under general cleanup pressure.

## Focus

- root config files
- workflow files
- editor and formatter config
- environment examples

## Acceptance

- one review packet is explicit
- root config deletions can be audited without mixing into product cleanup

## Result

- defined the review packet in
  `docs/roadmap/OHMIC_AUDIO_LABS_ROOT_CONFIG_DELETION_REVIEW_WAVE_2026-03-16.md`
- bounded it to the six risky root config deletions only
- made the review order and required decision shape explicit so the next
  restore-or-replace wave can execute without guessing
