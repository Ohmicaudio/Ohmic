Status: implementation_packet
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Backend Chirp Analyzer Venv Smoke Verification Slice

## Purpose

Define the first reproducible verification slice after the chirp helper and
bootstrap work so the analyzer path can be proven end-to-end in a controlled
Python environment.

## Why This Slice Next

The backend chirp lane now has:

- fixture generator
- analyzer verifier
- analyzer-specific requirements file
- shell and PowerShell bootstrap helpers

What it still lacks is one durable, repeatable smoke path that proves the
bootstrapped interpreter can:

1. create a fixture
2. run the reference analyzer through the verifier
3. report success or the exact remaining failure

That is the narrowest truthful next backend verification step.

## Exact Slice Scope

### Tool artifacts already in play

- `services/backend/tools/bootstrap-chirp-analyzer-env.sh`
- `services/backend/tools/bootstrap-chirp-analyzer-env.ps1`
- `services/backend/tools/requirements-chirp-analyzer.txt`
- `services/backend/tools/generate_chirp_fixture.py`
- `services/backend/tools/verify_chirp_fixture.py`
- `services/backend/tools/chirp_analyzer.py`

### Documentation context allowed

- `services/backend/README.md`
- root `package.json` chirp scripts

## Reproducible Smoke Path

### Linux / WSL

```bash
cd /mnt/b/ohmic/repos/ohmic-audio-labs
bash services/backend/tools/bootstrap-chirp-analyzer-env.sh --venv-dir /mnt/b/ohmic-local/runtime/chirp-analyzer-venv
/mnt/b/ohmic-local/runtime/chirp-analyzer-venv/bin/python services/backend/tools/generate_chirp_fixture.py --output-dir /mnt/b/ohmic-local/exports/measure-chirp-fixtures --basename smoke-fixture
/mnt/b/ohmic-local/runtime/chirp-analyzer-venv/bin/python services/backend/tools/verify_chirp_fixture.py --manifest /mnt/b/ohmic-local/exports/measure-chirp-fixtures/smoke-fixture.json
```

### Windows PowerShell

```powershell
Set-Location B:\ohmic\repos\ohmic-audio-labs
powershell -ExecutionPolicy Bypass -File services\backend\tools\bootstrap-chirp-analyzer-env.ps1 -VenvDir B:\ohmic-local\runtime\chirp-analyzer-venv-win
B:\ohmic-local\runtime\chirp-analyzer-venv-win\Scripts\python.exe services\backend\tools\generate_chirp_fixture.py --output-dir B:\ohmic-local\exports\measure-chirp-fixtures --basename smoke-fixture-win
B:\ohmic-local\runtime\chirp-analyzer-venv-win\Scripts\python.exe services\backend\tools\verify_chirp_fixture.py --manifest B:\ohmic-local\exports\measure-chirp-fixtures\smoke-fixture-win.json
```

## Acceptance

- one bootstrapped interpreter path is exercised end-to-end
- fixture generation succeeds in that environment
- verification succeeds or fails with one exact remaining runtime reason
- the outcome is recorded without widening into backend server churn

## Explicitly Out Of Scope

- backend API router work
- storage/index refactors
- frontend measurement UI
- broad Python packaging cleanup
- generalized scientific dependency policy

## Best Follow-On If This Passes

If the smoke path passes, the next backend step should be a small analyzer
verification packet that decides whether to:

- wire the venv-backed interpreter into backend endpoint docs/tests, or
- add one backend endpoint smoke check around `POST /api/measurement/analyze/chirp`

## Best Follow-On If This Passes Only In One Shell

If WSL or PowerShell succeeds first while the other fails, keep the next slice
narrow:

- fix only the shell-specific bootstrap/path gap
- do not reopen analyzer logic or backend service scope
