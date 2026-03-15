Status: ready
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs

# Implement First Backend Measurement Capture Slice

## Goal

Take the first bounded backend slice from the split packet into a real commit.

## Source Packet

- `docs/roadmap/OHMIC_BACKEND_FIRST_SAFE_SLICE_2026-03-15.md`

## Exact Focus

- `services/backend/src/measurementCaptureStore.ts`
- `services/backend/src/measurementReferenceAnalyzer.ts`
- `services/backend/src/networkStatus.ts`
- `services/backend/tools/chirp_analyzer.py`
- `test/backend/measurementCaptureEndpoint.test.ts`
- `test/backend/measurementCaptureStore.test.ts`
- `test/backend/networkStatus.test.ts`

## Acceptance

- stays within the packet boundary
- excludes storage artifact noise and frontend churn
- excludes auth, registry, package, and backend bootstrap churn
- verification commands are run or explicitly recorded if blocked
