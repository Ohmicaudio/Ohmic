Status: done
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T033954Z-1726d5b7

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

## Result

- recorded the classification in
  `docs/roadmap/OHMIC_OHMIC_AUDIO_LABS_LOCAL_OUTPUT_AND_LOG_EXHAUST_CLASSIFICATION_2026-03-16.md`
- classified logs and test reports as disposable local exhaust
- classified captures, output, and backend measurement captures as temporary
  runtime output that needs retention or relocation rules
- classified `content-work/*` and zip bundles as local staging material that
  should move out of the repo root
