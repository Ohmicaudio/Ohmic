# Ohmic Remote To DSP Control Vs Audio Plane Split

Date: 2026-03-16
Project: ohmic

## Purpose

Define the architectural split between command and state control and any future
audio or media path so the remote stack does not become a confused hybrid.

## Core Rule

The first remote-to-DSP wireless link is a control and telemetry system.

Audio or media transport is a separate plane unless a real Ohmic use case makes
it mandatory.

## Why The Split Matters

If "wireless remote link" is treated as one undifferentiated thing, the system
quickly confuses:

- command delivery
- state and telemetry updates
- heavy preset or sync payloads
- audio or media streaming

Those planes do not share the same latency, reliability, or bandwidth needs.

## Plane Definitions

### 1. Control Plane

Purpose:

- send operator intent to the DSP

Typical traffic:

- parameter changes
- preset recall
- mute/bypass
- session ownership changes
- bounded administrative commands

Primary properties:

- low perceived latency
- explicit acknowledgment
- safe retry behavior
- bounded command authority

### 2. Telemetry Plane

Purpose:

- reflect DSP state back to the remote

Typical traffic:

- current parameter values
- metering or health summaries
- preset/mode state
- link state
- session ownership state

Primary properties:

- steady update cadence
- stale/offline signaling
- graceful degradation under weak link conditions

Telemetry may share some infrastructure with control, but it is not the same
thing as control.

### 3. Audio Or Media Plane

Purpose:

- move audio or media payloads, if Ohmic later requires that capability

Typical traffic:

- audio stream
- media payloads
- high-bandwidth time-sensitive content

Primary properties:

- very different bandwidth and latency expectations
- likely different buffering and transport tradeoffs
- likely stronger device and codec constraints

This plane should not be assumed in the first remote-control architecture.

## What Can Share Infrastructure

Control and telemetry may share:

- device discovery
- session ownership
- pairing/auth identity
- one base transport family if it satisfies both use cases
- one connection lifecycle

## What Should Stay Logically Separate

Keep separate:

- command semantics versus telemetry semantics
- control acknowledgments versus telemetry freshness
- audio/media transport assumptions from control-plane design
- safety-critical remote authority from bulk-data handling

Even if two planes use the same transport, they should still remain logically
distinct in the architecture.

## First Implementation Boundary

The first implementation should include:

- control plane
- telemetry plane
- pairing/session ownership
- reconnect and stale-state handling

The first implementation should not automatically include:

- full audio streaming
- generic media relay
- hybrid transport assumptions designed around audio

## Failure Boundary

Control-plane failure means:

- command did not apply or acknowledgment was not received

Telemetry-plane failure means:

- UI state is stale or disconnected

Audio-plane failure, if it exists later, means:

- media transport quality or continuity failed

These should not collapse into one generic "wireless link failed" state.

## Example Architectural Shape

```text
remote UI
-> control plane
-> DSP command handler

DSP state
-> telemetry plane
-> remote UI

optional future media source
-> audio/media plane
-> DSP/media endpoint
```

## Current Default Position

For Ohmic right now:

- control plane is required
- telemetry plane is required
- audio or media plane is optional and future-facing

So the remote stack should be designed around control and telemetry first.

## Immediate Follow-On

This split should feed:

1. wireless transport-family comparison
2. prototype transport choice
3. later remote UI and DSP session design
