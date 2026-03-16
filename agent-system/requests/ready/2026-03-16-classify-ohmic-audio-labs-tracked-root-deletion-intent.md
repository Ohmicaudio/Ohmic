Status: ready
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs

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
