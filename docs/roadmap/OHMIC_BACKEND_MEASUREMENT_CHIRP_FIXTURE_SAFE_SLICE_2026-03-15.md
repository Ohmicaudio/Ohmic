Status: implementation_packet
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Backend Measurement Chirp Fixture Safe Slice

## Purpose

Define the next truthful backend follow-on slice after the already-landed
measurement capture family by focusing on the measurement chirp fixture helper
tools instead of broad router or control-plane churn.

## Recommended Next Slice

Take the chirp fixture helper family next:

- `services/backend/tools/generate_chirp_fixture.py`
- `services/backend/tools/verify_chirp_fixture.py`

This slice is the strongest semantic backend candidate currently visible because:

- it is real untracked backend tool work, not CRLF-only source churn
- it stays in the measurement-analysis lane rather than reopening auth/router
  ambiguity
- it pairs naturally with the existing reference analyzer at
  `services/backend/tools/chirp_analyzer.py`
- it has a clear practical purpose: bench playback fixtures and analyzer
  verification

## Exact Candidate Files

### Primary tool files

- `services/backend/tools/generate_chirp_fixture.py`
- `services/backend/tools/verify_chirp_fixture.py`

### Existing dependency context allowed for verification/documentation

- `services/backend/tools/chirp_analyzer.py`
- `services/backend/README.md`
- root `package.json` scripts:
  - `measure:chirp:generate`
  - `measure:chirp:verify`

## Why This Slice Next

- it is measurement-session-adjacent without reopening the whole backend server
- the current backend router/control-plane files do not show trustworthy
  semantic pressure
- the helper pair forms one coherent tool story: generate fixture, then verify
  analyzer correctness against the manifest
- previous smoke logs already show a known dependency weakness worth keeping
  visible: analyzer execution can fail when `scipy` is missing

## Explicitly Out Of Scope

- `services/backend/src/index.ts`
- `services/backend/src/accessPolicy.ts`
- `services/backend/src/auth.ts`
- `services/backend/src/deviceRegistry.ts`
- `services/backend/src/featureData.ts`
- `services/backend/src/featureGatePolicy.ts`
- `services/backend/src/syncRelayAuth.ts`
- `services/backend/src/types.ts`
- `services/backend/src/wsHub.ts`
- `services/backend/storage/*`
- `services/backend/dist/`
- `services/backend/node_modules/`
- `services/backend/tools/__pycache__/`
- frontend measurement UI/runtime changes

## Verification

For the eventual implementation slice, use a narrow tool-level check path:

```bash
cd /mnt/b/ohmic/repos/ohmic-audio-labs
python3 services/backend/tools/generate_chirp_fixture.py --output-dir tmp/measure-chirp-fixtures --basename smoke-fixture
python3 services/backend/tools/verify_chirp_fixture.py --manifest tmp/measure-chirp-fixtures/smoke-fixture.json
```

If local Python dependency gaps block the verifier:

- record the exact missing dependency or runtime failure
- do not widen the slice into backend server work

## Finish Condition

- one bounded backend helper slice exists for the chirp fixture tools
- the slice stays in the measurement-analysis helper lane
- router/control-plane churn remains excluded
- the next implementation task can point at one concrete backend tool family
