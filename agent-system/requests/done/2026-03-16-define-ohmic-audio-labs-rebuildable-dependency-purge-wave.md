Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T043020Z-33c59647

# Define Ohmic Audio Labs Rebuildable Dependency Purge Wave

## Goal

Define the purge wave for rebuildable dependency and build-output dirt once the
source-visible cleanup lanes are better isolated.

## Focus

- `node_modules/*`
- `dist/*`
- `.pio/*`
- backend dist and similar rebuildable output

## Acceptance

- one rebuildable-junk purge packet is explicit
- dependency cleanup stops competing with source-visible review

## Result

- defined the purge packet in
  `docs/roadmap/OHMIC_AUDIO_LABS_REBUILDABLE_DEPENDENCY_PURGE_WAVE_2026-03-16.md`
- bounded it to rebuildable `node_modules`, `dist`, `.pio`, and comparable
  install/build output only
- made the rebuild order explicit so the later purge can clean junk without
  pretending it is product cleanup
