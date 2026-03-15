Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Implement First Backend Measurement Capture Slice

## Goal

Take the first bounded backend slice from the split packet into a real commit.

## Source Packet

- `docs/roadmap/OHMIC_BACKEND_FIRST_SAFE_SLICE_2026-03-15.md`

## Acceptance

- stays within the packet boundary
- excludes storage artifact noise and frontend churn
- verification commands are run or explicitly recorded if blocked
