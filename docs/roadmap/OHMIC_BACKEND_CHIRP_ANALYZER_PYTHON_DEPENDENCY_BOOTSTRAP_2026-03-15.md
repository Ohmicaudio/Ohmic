Status: implementation_packet
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Backend Chirp Analyzer Python Dependency Bootstrap

## Purpose

Define the minimum reproducible Python runtime needed for the backend chirp
analyzer and the new chirp fixture helper tools so they stop depending on ad hoc
local environments.

## Required Python Packages

Hard runtime requirements for `services/backend/tools/chirp_analyzer.py`:

- `numpy`
- `scipy`

Current findings from this shell:

- `numpy` is not installed
- `scipy` is not installed

The new helper tools have lighter requirements:

- `services/backend/tools/generate_chirp_fixture.py`
  - standard library only
- `services/backend/tools/verify_chirp_fixture.py`
  - standard library only for its own code
  - but it delegates to `chirp_analyzer.py`, so effective verification still
    requires `numpy` and `scipy`

## Recommended Bootstrap Shape

Use one narrow backend-tool Python environment rather than assuming a
machine-global Python install.

Preferred model:

1. create a small virtual environment for backend analyzer tooling
2. install only the required numeric packages
3. point backend runtime to that interpreter explicitly when needed

## Recommended Commands

### Linux / WSL

```bash
cd /mnt/b/ohmic/repos/ohmic-audio-labs
python3 -m venv .venv-backend-tools
source .venv-backend-tools/bin/activate
python -m pip install --upgrade pip
python -m pip install numpy scipy
```

### Windows PowerShell

```powershell
Set-Location B:\ohmic\repos\ohmic-audio-labs
py -3 -m venv .venv-backend-tools
.venv-backend-tools\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install numpy scipy
```

## Runtime Wiring

For backend or operator execution, prefer setting:

- `OHMIC_CHIRP_ANALYZER_PYTHON`

Examples:

### Linux / WSL

```bash
export OHMIC_CHIRP_ANALYZER_PYTHON=/mnt/b/ohmic/repos/ohmic-audio-labs/.venv-backend-tools/bin/python
```

### Windows PowerShell

```powershell
$env:OHMIC_CHIRP_ANALYZER_PYTHON='B:\ohmic\repos\ohmic-audio-labs\.venv-backend-tools\Scripts\python.exe'
```

This is better than assuming plain `python` resolves to a correct environment.

## Verification Path

After bootstrap, the narrow verification path should be:

```bash
cd /mnt/b/ohmic/repos/ohmic-audio-labs
python3 services/backend/tools/generate_chirp_fixture.py --output-dir tmp/measure-chirp-fixtures --basename smoke-fixture
python3 services/backend/tools/verify_chirp_fixture.py --manifest tmp/measure-chirp-fixtures/smoke-fixture.json
```

If the backend service uses the analyzer endpoint, the same interpreter path
should be exercised through:

- `POST /api/measurement/analyze/chirp`

## Failure Behavior

When dependencies are absent, the truthful current failure is:

- `ModuleNotFoundError: No module named 'numpy'`

Previously observed smoke logs also showed:

- `ModuleNotFoundError: No module named 'scipy'`

Do not hide these behind generic backend errors. The runtime should surface the
missing package name clearly.

## What Not To Do Yet

- do not turn this into a broad Python packaging migration
- do not add unrelated scientific/audio dependencies until the analyzer truly
  needs them
- do not assume the main backend Node environment should also own Python setup

## Best Next Step

The next implementation slice should add one durable bootstrap artifact, such
as:

- a backend-tool requirements file, or
- a tiny bootstrap script, or
- explicit backend README install steps tied to the virtualenv path

Keep that next slice narrow and analyzer-specific.
