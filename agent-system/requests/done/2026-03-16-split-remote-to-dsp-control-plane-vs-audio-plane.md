Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T033519Z-8417ca46

# Split Remote To DSP Control Plane Vs Audio Plane

## Goal

Define the architectural split between command/state control and any future
audio/media path so the remote stack does not become a confused hybrid.

## Focus

- control-plane responsibilities
- telemetry-plane responsibilities
- audio/media-plane responsibilities
- what can share infrastructure vs what must stay separate

## Acceptance

- the split is explicit
- future remote work can target the correct layer
- "wireless remote link" stops meaning three different things at once

## Result

- defined the plane split in
  `docs/architecture/OHMIC_REMOTE_TO_DSP_CONTROL_VS_AUDIO_PLANE_SPLIT_2026-03-16.md`
- separated control, telemetry, and optional future audio/media into distinct
  architectural concerns
- made the first remote stack explicitly control-plus-telemetry focused so
  later transport comparison can stop conflating command latency with media
  transport requirements
