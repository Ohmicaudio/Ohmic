Status: ready
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs

# Freeze Generated And Dependency Dirt In Ohmic Audio Labs

## Goal

Fence off generated output, dependency installs, caches, logs, and local
capture exhaust in `ohmic-audio-labs` so active product work becomes readable
again.

## Focus

- `node_modules/*`
- `dist/*`
- `.pio/*`
- backend sqlite and runtime artifacts
- local logs and capture folders
- temp zip or staging bundles

## Acceptance

- generated/dependency/local exhaust is classified and fenced
- active product work is easier to read in `git status`
- cleanup no longer depends on remembering which junk is safe to ignore
