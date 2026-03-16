Status: ready
Priority: medium
Date: 2026-03-16
Project: ohmic

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
- “wireless remote link” stops meaning three different things at once
