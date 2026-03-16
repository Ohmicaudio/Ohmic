Status: ready
Priority: medium
Date: 2026-03-16
Project: ohmic-audio-labs

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
