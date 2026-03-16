Status: done
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T034114Z-c5433f54

# Isolate Ohmic Audio Labs Active Product Surfaces

## Goal

Identify the current active product surfaces in `ohmic-audio-labs` and separate
them from nonproduct and generated churn so real implementation lanes can
continue cleanly.

## Focus

- `products/*`
- `services/*`
- `components/*`
- `test/*`
- supporting `schemas/*`, `utils/*`, `scripts/*`

## Acceptance

- active product surfaces are explicitly named
- nonproduct and generated neighbors are called out
- the next safe implementation packets can be drawn from the active surfaces

## Result

- isolated the current live product surfaces in
  `docs/roadmap/OHMIC_AUDIO_LABS_ACTIVE_PRODUCT_SURFACE_ISOLATION_2026-03-16.md`
- separated active product code from frozen/nonproduct domains and generated or
  local exhaust in the current `ohmic-audio-labs` worktree
- named the safest next implementation lanes so product work can continue
  without competing with docs, archive, android, and generated churn
