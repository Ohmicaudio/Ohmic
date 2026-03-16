Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T015938Z-b1cb0161

# Run Ohmic Audio Labs Docs Truth Sweep

## Goal

Separate active canonical docs from backlog/spec churn in `docs/*` so the docs
lane becomes a grouped normalization pass instead of ambient drift.

## Source

- `docs/roadmap/OHMIC_AUDIO_LABS_NONPRODUCT_DIRTY_DOMAIN_CLASSIFICATION_2026-03-15.md`

## Focus

- canonical operational docs
- backlog-heavy or speculative docs
- one bounded normalization packet

## Acceptance

- active docs vs speculative docs are separated clearly
- the next safe docs normalization packet is obvious
- docs stop competing with active product execution by default

## Result

- corrected the active canonical docs that still described repo-local
  `public/*` ownership:
  - `docs/THREE_TIER_WEB_ARCHITECTURE.md`
  - `docs/specs/STATIC_TOOL_DATA_GUIDELINES.md`
  - `docs/specs/SHIP_EXECUTION_QUEUE.md`
- labeled `docs/specs/WEB_THREE_TIER_CONTENT_PIPELINE.md` as a historical
  import-surface note instead of leaving the older `software/web/public/*`
  model looking like live repo truth
- recorded the canonical-vs-historical split and the next safe packet in
  `docs/roadmap/OHMIC_AUDIO_LABS_DOCS_TRUTH_SWEEP_2026-03-15.md`
- verified:
  - `git -C 'B:\\ohmic\\repos\\ohmic-audio-labs' grep -n 'public/' -- 'docs/THREE_TIER_WEB_ARCHITECTURE.md' 'docs/specs/STATIC_TOOL_DATA_GUIDELINES.md' 'docs/specs/SHIP_EXECUTION_QUEUE.md' 'docs/specs/WEB_THREE_TIER_CONTENT_PIPELINE.md'`
