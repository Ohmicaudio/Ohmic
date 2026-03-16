Status: ready
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs

# Classify Ohmic Audio Labs Local Output And Log Exhaust

## Goal

Classify the local logs, captures, temp bundles, and output folders in
`ohmic-audio-labs` so disposable exhaust is separated from anything that still
has operational value.

## Focus

- `backend_*.txt`
- `dev*.log`
- `captures/*`
- `output/*`
- `tmp/*`
- local zip bundles and staging folders

## Acceptance

- each local exhaust bucket is classified as disposable, retain-temporarily, or
  needs relocation
- logs and captures stop competing with source cleanup
