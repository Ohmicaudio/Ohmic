# Ohmic Backend Chirp Regression And Bootstrap Wave

Date: 2026-03-15
Project: ohmic-audio-labs

## Purpose

Package the backend chirp lane so the already-proven bootstrap helpers and the
reference backend path do not drift while local-web analysis remains the
canonical product direction.

## Proven State To Preserve

Already verified:

- `services/backend/tools/bootstrap-chirp-analyzer-env.sh --help`
- `services/backend/tools/bootstrap-chirp-analyzer-env.ps1 -Help`

Those checks proved both helper entrypoints expose the expected usage contract
without mutating the environment.

Repo-local contract direction already says:

- `local-web` is the primary analyzer runtime
- `backend-reference` is optional and non-canonical
- backend chirp execution still matters as a comparison and durable reference
  path

## What This Packet Should Hold Together

This wave should keep four things together.

### 1. Bootstrap Helper Contract

Keep the helper scripts traveling together:

- `services/backend/tools/bootstrap-chirp-analyzer-env.sh`
- `services/backend/tools/bootstrap-chirp-analyzer-env.ps1`
- `services/backend/tools/requirements-chirp-analyzer.txt`

Regression target:

- both entrypoints still explain the same setup contract
- virtualenv target and requirements inputs stay aligned
- the expected `OHMIC_CHIRP_ANALYZER_PYTHON` outcome stays documented

### 2. Reference Runtime Boundary

Keep the backend path honest:

- it is a reference path
- it is not the default product runtime
- it should still be runnable and explainable when needed

Regression target:

- backend docs and helper copy must not drift into claiming backend as the
  canonical chirp runtime

### 3. Endpoint Smoke Durability

Keep one bounded smoke lane around the reference backend path.

Target surfaces:

- capture route shape
- analyze route shape
- analyzer runtime selection or environment assumptions

This does not need a full end-to-end analysis pipeline in every pass.

It does need one durable way to prove the reference path has not silently
rotted.

### 4. Minimal Operator Notes

Keep the operator-facing notes attached to the packet:

- what bootstrap script to run
- what environment variable matters
- what counts as a safe dry-path verification
- what counts as a real backend smoke path

## Recommended Packet Shape

The next backend chirp packet should contain:

1. helper regression coverage
2. one reference backend smoke harness
3. one short runtime/bootstrap note update if needed

That is enough to preserve the path without widening into full analyzer
implementation work.

## Suggested Checks

### Safe Checks

- shell helper help path
- PowerShell helper help path
- requirements file exists
- configured analyzer python path resolves when explicitly set

### Real Backend Smoke

One bounded smoke should verify:

- backend can start with chirp analyzer configuration present
- reference chirp route accepts the expected request shape
- failure mode is explicit if analyzer runtime is absent or misconfigured

The goal is explicit degradation, not fake green behavior.

## Out Of Scope

Do not mix these into this packet:

- full chirp UI/product wiring
- local-web analyzer work
- DSP measurement job implementation
- broad measurement schema redesign

Those are adjacent but separate waves.

## Immediate Follow-On

The next implementation slice should be:

- `add one reference backend chirp smoke harness plus helper regression check`

That packet should preserve the proven state while keeping the backend path
clearly secondary to the local-web runtime.
