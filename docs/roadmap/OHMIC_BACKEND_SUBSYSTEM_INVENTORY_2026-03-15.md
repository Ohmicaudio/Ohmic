Status: inventory
Date: 2026-03-15

# Ohmic Backend Subsystem Inventory

## Purpose

Inventory `services/backend` as its own completion lane so backend work can be
split cleanly instead of being mixed into generic repo cleanup.

## Snapshot

Repo surface:

- `B:\ohmic\repos\ohmic-audio-labs\services\backend`

Current rough dirty shape:

- `3` tracked source changes
- `11` untracked paths

The important reality is that most of the apparent churn is not active backend
feature work.

## What Is Actually Active

Tracked source edits:

- `README.md`
- `src/index.ts`
- `src/wsHub.ts`

Untracked source additions:

- `src/measurementCaptureStore.ts`
- `src/measurementReferenceAnalyzer.ts`
- `src/networkStatus.ts`
- `tools/chirp_analyzer.py`
- `tools/generate_chirp_fixture.py`
- `tools/verify_chirp_fixture.py`

Assessment:

- the live backend lane appears to be a narrow hub-plus-measurement support
  expansion
- there is no evidence here of broad auth, feature-gate, OSM, or registry
  source churn in the dirty set

## What Is Noise Instead Of Product Work

These untracked paths look like runtime/build/install residue:

- `dist/`
- `node_modules/`
- `storage/auth-control-plane.v1.sqlite`
- `storage/auth-control-plane.v1.sqlite-shm`
- `storage/auth-control-plane.v1.sqlite-wal`
- `storage/measurement-captures.v1.json`
- `storage/measurement-captures/`
- `tools/__pycache__/`

Assessment:

- these should not be treated as meaningful backend source work
- they are cleanup, fixture, or runtime-state material

## Active Backend Families

## 1. Hub and runtime entry surface

Files:

- `src/index.ts`
- `src/wsHub.ts`
- `README.md`

Assessment:

- likely the runtime integration layer for the new backend additions
- should stay bundled with whichever new backend domain it wires in

## 2. Measurement capture/reference support lane

Files:

- `src/measurementCaptureStore.ts`
- `src/measurementReferenceAnalyzer.ts`
- `src/networkStatus.ts`

Assessment:

- this is the strongest coherent new source family in the current dirty set
- likely safe as the main backend commit slice if paired with the needed
  `index.ts` and `wsHub.ts` wiring

## 3. Backend tooling support

Files:

- `tools/chirp_analyzer.py`
- `tools/generate_chirp_fixture.py`
- `tools/verify_chirp_fixture.py`

Assessment:

- potentially useful support tooling
- should not automatically ride with the runtime backend slice unless the code
  path depends on it directly
- likely best as a separate later tooling slice

## What Looks Safe To Commit Next

### Best candidate

Backend measurement support slice:

- `src/measurementCaptureStore.ts`
- `src/measurementReferenceAnalyzer.ts`
- `src/networkStatus.ts`
- `src/index.ts`
- `src/wsHub.ts`
- `README.md`

Why:

- this is the only clearly active backend feature family
- it has a coherent runtime story
- it avoids bundling runtime-state artifacts or backend tooling by accident

### Secondary candidate

Backend tooling/fixture support slice:

- `tools/chirp_analyzer.py`
- `tools/generate_chirp_fixture.py`
- `tools/verify_chirp_fixture.py`

Why:

- logically separate from the live backend runtime
- easier to review and maintain as tooling rather than transport/runtime code

## What Should Be Frozen Or Ignored

- `dist/`
- `node_modules/`
- SQLite database files
- `measurement-captures` runtime data
- `measurement-captures.v1.json`
- `tools/__pycache__/`

These should be treated as generated/runtime residue, not source-of-truth
backend work.

## Final Call

The backend subsystem is not a giant active rewrite.

Right now it is:

- one narrow measurement-support runtime expansion
- one optional backend-tooling support lane
- plus a pile of generated/runtime noise that should stay out of commit slices
