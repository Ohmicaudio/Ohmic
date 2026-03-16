Status: working_packet
Date: 2026-03-16
Project: ohmic

# Ohmic Remote To DSP Wireless Link Wave

## Purpose

Capture the remote-to-DSP wireless-link lane as a real system wave instead of a
loose future wish.

## Why It Matters

The remote/controller experience gets much stronger if it can:

- control the DSP over a modern local wireless link
- optionally consume rich state/telemetry streams
- potentially support higher-bandwidth media or analysis paths later

This should be treated as a platform capability, not just a one-off remote
feature.

## Hard Rule

Do not collapse these into one vague “wireless” blob:

- control plane
- telemetry/state plane
- audio/media plane

They have different requirements and should be designed separately even if they
share a transport family.

## Immediate Design Questions

### 1. Control Plane

Needs:

- low-latency commands
- reliable state sync
- device discovery
- pairing/session ownership

### 2. Telemetry Plane

Needs:

- state updates
- meter/plot streaming
- bounded bandwidth
- graceful degradation

### 3. Audio Or Media Plane

Needs:

- explicit decision on whether the remote should ever carry actual audio/media
  streams or just control and visualization
- separate bandwidth and buffering expectations from the control plane

## Constraint

The first design pass should not assume a branded codec or a specific consumer
audio protocol.

It should first define:

- Ohmic requirements
- acceptable tradeoffs
- whether “lossless-like remote experience” actually means:
  - control only
  - telemetry plus control
  - or true audio/media transport

## Immediate Next Tasks

1. define remote-to-DSP wireless-link requirements
2. compare remote-to-DSP wireless transport options
3. split remote-to-DSP control plane vs audio plane

## Boundary

This packet does not commit to a final transport yet.

It makes sure the lane is real, scoped, and ready for deliberate design instead
of wishful drift.
