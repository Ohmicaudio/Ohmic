Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Verify Chirp Bootstrap Helpers In Both Shells

## Goal

Verify the chirp analyzer bootstrap helpers from both shell families so the
backend setup path is proven, not just committed.

## Source

- commit `e358179` in `ohmic-audio-labs`
- commit `a2a4672` in `ohmic-audio-labs`
- `services/backend/tools/bootstrap-chirp-analyzer-env.sh`
- `services/backend/tools/bootstrap-chirp-analyzer-env.ps1`

## Focus

- safe `--help` or dry-path verification
- shell parity
- exact notes about any platform mismatch

## Acceptance

- both helper entrypoints are exercised or blocked precisely
- the bootstrap path is clearer for later operators
- no accidental environment mutation is required
