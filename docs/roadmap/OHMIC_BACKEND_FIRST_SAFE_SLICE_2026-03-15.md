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
- related backend tests only:
  - `test/backend/measurementCaptureEndpoint.test.ts`
  - `test/backend/measurementCaptureStore.test.ts`
  - `test/backend/networkStatus.test.ts`

## Why This Slice First

- the new files are already naturally grouped
- they look more bounded than broad auth/device registry churn
- they offer a cleaner first backend lane than touching `index.ts`,
  `featureData.ts`, and multiple auth/policy files at once

## Explicitly Out Of Scope

- `services/backend/dist/`
- `services/backend/node_modules/`
- sqlite and json storage artifacts
- auth/control-plane files
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
