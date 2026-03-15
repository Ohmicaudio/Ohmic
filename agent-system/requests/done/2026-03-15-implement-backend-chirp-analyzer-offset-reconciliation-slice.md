Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: codex

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

## Outcome

Completed on 2026-03-15.

Result:

- fixed a real generator waveform bug where list-slice `+=` extended the audio
  instead of mixing samples in place
- aligned fixture manifest expected detection times to the analyzer timing
  convention by storing chirp-center detection times while preserving start
  times separately
- reran the Windows venv smoke verification successfully end-to-end

## Artifact

- `B:\ohmic\repos\ohmic-audio-labs\services\backend\tools\generate_chirp_fixture.py`

## Verification

- `cmd.exe /C "cd /D B:\ohmic\repos\ohmic-audio-labs && B:\ohmic-local\runtime\chirp-analyzer-venv-win\Scripts\python.exe services\backend\tools\generate_chirp_fixture.py --output-dir B:\ohmic-local\exports\measure-chirp-fixtures --basename smoke-fixture-win-reconciled && B:\ohmic-local\runtime\chirp-analyzer-venv-win\Scripts\python.exe services\backend\tools\verify_chirp_fixture.py --manifest B:\ohmic-local\exports\measure-chirp-fixtures\smoke-fixture-win-reconciled.json"`
