Status: done
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T185855Z-4e682ee1

# Implement Next Hardware AmpLab Control Bridge Slice

## Goal

Take the next AmpLab control bridge slice from packet to code while still
keeping discovery, telemetry, DSP internals, and Android out of scope.

## Source

- `docs/roadmap/OHMIC_HARDWARE_NEXT_SERVICE_BRIDGE_SAFE_SLICE_2026-03-15.md`

## Focus

- AmpLab session and command contract edges
- host-to-surface bridge behavior
- narrow service touchpoints only
- no broad hardware service expansion

## Acceptance

- one real bridge slice lands cleanly
- touched files stay inside the documented bridge boundary
- follow-on scope is easier to isolate afterward

## Outcome

Completed on 2026-03-15 as stale ready-state.

Result:

- retired this request because the exact bridge slice was already implemented
- confirmed the bounded bridge files landed in commit `3695099` with message `Add AmpLab control bridge slice`
- verified the packet stayed inside the documented bridge boundary instead of reopening the wider hardware service surface
- narrowed the truthful follow-on from "implement the bridge" to "add direct coverage for the bridge files"

## Artifact

- commit `3695099` in `B:\ohmic\repos\ohmic-audio-labs`
- `B:\ohmic\repos\ohmic-audio-labs\components\Hardware\AmpLabControlHost.tsx`
- `B:\ohmic\repos\ohmic-audio-labs\components\Hardware\AmpLabControlSurfaces.tsx`
- `B:\ohmic\repos\ohmic-audio-labs\components\Hardware\useAmpLabControlPlane.ts`
- `B:\ohmic\repos\ohmic-audio-labs\services\hardware\amplab\commandPolicy.ts`
- `B:\ohmic\repos\ohmic-audio-labs\services\hardware\amplab\types.ts`

## Verification

- `git log --oneline --` on the bounded bridge file set surfaced commit `3695099 Add AmpLab control bridge slice`
- `git status --short --` on the bounded bridge file set returned no file changes during this review
