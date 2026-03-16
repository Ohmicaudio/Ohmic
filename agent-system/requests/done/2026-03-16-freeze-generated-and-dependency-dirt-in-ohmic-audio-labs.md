Status: done
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T033704Z-0055748e

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

## Result

- recorded the fence in
  `docs/roadmap/OHMIC_OHMIC_AUDIO_LABS_GENERATED_AND_DEPENDENCY_DIRT_FENCE_2026-03-16.md`
- separated untracked dependency/build/runtime exhaust from the tracked source
  cleanup problem
- explicitly excluded tracked source and tracked support artifacts from blind
  junk cleanup
- queued the next three cleanup slices for exhaust classification, ignore
  boundary definition, and generated-vs-source artifact separation
