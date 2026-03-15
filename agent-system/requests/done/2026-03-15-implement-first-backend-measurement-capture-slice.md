Status: done
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs

# Implement First Backend Measurement Capture Slice

## Goal

Take the first bounded backend measurement-capture slice from the packet into a
real commit.

## Source Packet

- `docs/roadmap/OHMIC_BACKEND_FIRST_SAFE_SLICE_2026-03-15.md`

## Exact Focus

- `services/backend/src/measurementCaptureStore.ts`
- `services/backend/src/measurementReferenceAnalyzer.ts`
- `services/backend/src/networkStatus.ts`
- `services/backend/tools/chirp_analyzer.py`
- related backend tests only:
  - `test/backend/measurementCaptureEndpoint.test.ts`
  - `test/backend/measurementCaptureStore.test.ts`
  - `test/backend/networkStatus.test.ts`

## Acceptance

- stays within the packet boundary
- excludes generated backend artifacts and storage noise
- excludes auth/control-plane churn
- lands as one coherent backend service family commit
