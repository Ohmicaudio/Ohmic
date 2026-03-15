Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Implement Backend Chirp Analyzer Offset Reconciliation Slice

## Goal

Reconcile the timing mismatch between the generated chirp fixture manifest and
the analyzer/verifier report.

## Source

- `docs/roadmap/OHMIC_BACKEND_CHIRP_ANALYZER_OFFSET_RECONCILIATION_SLICE_2026-03-15.md`

## Focus

- generator expected timestamps
- analyzer detected timestamps
- verifier comparison semantics

## Acceptance

- one narrow timing-semantics fix lands
- smoke verification either passes or fails with a smaller exact residual gap
- backend server and UI churn stay out
