Status: implementation_packet
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Backend First Safe Slice

## Purpose

Define the first backend implementation slice tightly enough to avoid mixing it
with frontend/runtime churn.

## Recommended First Slice

Take the measurement-capture and network-status additions as the first backend
slice.

## Exact Candidate Files

- `services/backend/src/measurementCaptureStore.ts`
- `services/backend/src/measurementReferenceAnalyzer.ts`
- `services/backend/src/networkStatus.ts`
- `services/backend/tools/chirp_analyzer.py`
- related backend tests only:
  - `test/backend/measurementCaptureEndpoint.test.ts`
  - `test/backend/measurementCaptureStore.test.ts`
  - `test/backend/networkStatus.test.ts`

## Why This Slice First

- the new files are already naturally grouped
- they look more bounded than broad auth/device registry churn
- they offer a cleaner first backend lane than touching `index.ts`,
  `featureData.ts`, and multiple auth/policy files at once
- the analyzer dependency is still bounded to one helper script instead of
  dragging the whole backend toolchain into the first slice

## Explicitly Out Of Scope

- `services/backend/dist/`
- `services/backend/node_modules/`
- `services/backend/tools/__pycache__/`
- sqlite and json storage artifacts
- `services/backend/package.json`
- `services/backend/package-lock.json`
- `services/backend/tsconfig.json`
- auth/control-plane files
- `services/backend/src/index.ts`
- `services/backend/src/accessPolicy.ts`
- `services/backend/src/auth.ts`
- `services/backend/src/deviceRegistry.ts`
- `services/backend/src/featureData.ts`
- `services/backend/src/featureGatePolicy.ts`
- `services/backend/src/syncRelayAuth.ts`
- `services/backend/src/types.ts`
- `services/backend/src/wsHub.ts`
- frontend route/UI changes

## Verification

At minimum:

```bash
cd /mnt/b/ohmic/repos/ohmic-audio-labs
npm run backend:type-check
npm run test -- test/backend/measurementCaptureEndpoint.test.ts test/backend/measurementCaptureStore.test.ts test/backend/networkStatus.test.ts
```

## Finish Condition

- one backend service family lands cleanly
- generated artifacts and storage noise are excluded
- verification is specific to the chosen backend files
- only `services/backend/tools/chirp_analyzer.py` is allowed from the backend
  tool helper lane
