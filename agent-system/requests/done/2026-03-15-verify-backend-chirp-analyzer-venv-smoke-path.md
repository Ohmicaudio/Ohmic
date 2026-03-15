Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: codex
Claim ID: 20260315T192644Z-3cb6e6a1

# Verify Backend Chirp Analyzer Venv Smoke Path

## Goal

Run the first reproducible venv-backed chirp analyzer smoke path and record the
truthful result.

## Source

- `docs/roadmap/OHMIC_BACKEND_CHIRP_ANALYZER_VENV_SMOKE_VERIFICATION_SLICE_2026-03-15.md`
- `services/backend/tools/bootstrap-chirp-analyzer-env.sh`
- `services/backend/tools/bootstrap-chirp-analyzer-env.ps1`

## Focus

- one bootstrapped Python environment
- fixture generation
- verifier execution
- exact success or failure note

## Acceptance

- one shell path is exercised end-to-end
- result is recorded precisely
- follow-on stays narrow if a shell-specific gap remains

## Outcome

Completed on 2026-03-15.

Result:

- WSL bootstrap remained blocked because local Python lacks `ensurepip` /
  `python3-venv`
- Windows PowerShell bootstrap succeeded after fixing a narrow helper bug in
  `bootstrap-chirp-analyzer-env.ps1`
- Windows venv installed `numpy` and `scipy` successfully
- fixture generation succeeded under the Windows venv
- verifier executed and produced a structured timing mismatch instead of an
  environment error

## Verification

- `bash services/backend/tools/bootstrap-chirp-analyzer-env.sh --venv-dir /mnt/b/ohmic-local/runtime/chirp-analyzer-venv`
- `cmd.exe /C "cd /D B:\ohmic\repos\ohmic-audio-labs && powershell.exe -ExecutionPolicy Bypass -File services\backend\tools\bootstrap-chirp-analyzer-env.ps1 -VenvDir B:\ohmic-local\runtime\chirp-analyzer-venv-win"`
- `cmd.exe /C "cd /D B:\ohmic\repos\ohmic-audio-labs && B:\ohmic-local\runtime\chirp-analyzer-venv-win\Scripts\python.exe services\backend\tools\generate_chirp_fixture.py --output-dir B:\ohmic-local\exports\measure-chirp-fixtures --basename smoke-fixture-win && B:\ohmic-local\runtime\chirp-analyzer-venv-win\Scripts\python.exe services\backend\tools\verify_chirp_fixture.py --manifest B:\ohmic-local\exports\measure-chirp-fixtures\smoke-fixture-win.json"`

## Follow-On

- `B:\ohmic\docs\roadmap\OHMIC_BACKEND_CHIRP_ANALYZER_OFFSET_RECONCILIATION_SLICE_2026-03-15.md`
