Status: ready
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs

# Define Ohmic Audio Labs Ignore And Cleanup Boundary

## Goal

Define the repo-level boundary between files that should be ignored, files that
should be cleaned locally, and files that must stay visible because they are
source truth.

## Focus

- generated install output
- runtime storage artifacts
- caches and tool residue
- local-only logs and captures
- tracked support artifacts that should remain visible

## Acceptance

- ignore vs cleanup vs source-visible classes are explicit
- later cleanup work can act without deleting truth by accident
