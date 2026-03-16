Status: ready
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs

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
