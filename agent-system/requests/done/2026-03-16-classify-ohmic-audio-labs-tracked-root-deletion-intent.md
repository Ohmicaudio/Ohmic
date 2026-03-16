Status: done
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T041407Z-7283519d

# Classify Ohmic Audio Labs Tracked Root Deletion Intent

## Goal

Classify the tracked root-level deletions in `ohmic-audio-labs` so intentional
cleanup, accidental churn, and risky removals stop living in one pile.

## Focus

- `.gitignore`
- `.env.example`
- `.github/*`
- `.claude/*`
- `.prettier*`
- `.vscode/*`
- `AGENT_MEMORY/*`

## Acceptance

- tracked root deletions are grouped by intent
- the next safe review or restore wave is obvious

## Result

- classified the root deletion set in
  `docs/roadmap/OHMIC_AUDIO_LABS_TRACKED_ROOT_DELETION_INTENT_CLASSIFICATION_2026-03-16.md`
- split the deletions into risky operating guardrails versus likely intentional
  AI/editor scaffolding retirements
- made the next review order explicit: root config and CI first, then
  per-repo scaffolding confirmation
