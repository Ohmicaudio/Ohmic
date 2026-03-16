# Ohmic Remote To DSP Wireless Link Requirements

Date: 2026-03-16
Project: ohmic

## Purpose

Define the real Ohmic requirements for a remote-to-DSP wireless link before
locking in a protocol or transport.

## Core Rule

We should define the job first, then choose the transport.

The remote-to-DSP link may involve:

- control commands
- telemetry/state updates
- optional audio or media transport

Those should not be assumed to be one identical requirement.

## Primary Use Cases

The likely first Ohmic remote-to-DSP wireless needs are:

- remote UI controlling DSP parameters
- remote reading live DSP state
- remote receiving enough telemetry to feel responsive
- remote session ownership and pairing control

Audio or media transport may be a future need, but it should not be assumed to
be required for the first link.

## Control Requirements

The control plane should support:

- parameter change commands
- preset recall
- mute/bypass or safety actions
- session ownership changes
- simple administrative commands

Desired characteristics:

- low enough latency to feel immediate to the user
- high command delivery confidence
- clear acknowledgment or failure state

This is an interactive control problem, not a bulk-data problem.

## Telemetry Requirements

The telemetry plane should support:

- current state reflection
- parameter value updates
- preset or mode changes
- link health
- relevant metering or status summaries

Desired characteristics:

- steady enough update rate for responsive UI
- graceful degradation if bandwidth drops
- explicit stale/offline state when telemetry is delayed

Telemetry should be treated separately from command delivery even if both share
the same transport family at first.

## Pairing And Session Ownership

The link should define:

- how a remote discovers or selects a DSP target
- who owns the active control session
- whether multiple listeners are allowed
- how session takeover is handled
- how stale sessions expire

This matters as much as transport speed because wireless control without clear
ownership becomes confusing fast.

## Reliability Requirements

The first implementation should optimize for:

- predictable reconnection
- explicit online/offline state
- safe handling of packet loss or disconnects
- no silent state divergence between remote and DSP

Failure should be visible rather than mysteriously ignored.

## Latency Requirements

The system needs "control-immediate" latency, not necessarily "audio-stream"
latency.

Practical interpretation:

- parameter changes should feel near-instant to a human operator
- telemetry should refresh fast enough to support interactive tuning
- reconnection and session recovery should be quick enough not to break the
  workflow

If audio/media transport is added later, it will likely need a different
latency envelope than control and telemetry.

## Update Rate Expectations

The first requirements packet should distinguish:

- command latency expectation
- telemetry update cadence
- heavy-state sync or preset payload cadence

This prevents one transport benchmark from being misapplied to every kind of
traffic.

## Audio Or Media Requirement Check

Current default assumption:

- control is required
- telemetry is required
- audio/media transport is optional and not part of the first mandatory link

Until a real Ohmic use case proves otherwise, audio/media should stay out of
the core remote-link requirement set.

## Security And Safety Expectations

The link should support:

- explicit pairing or authorization
- session ownership visibility
- safe fallback on disconnect
- bounded remote authority for critical actions

This does not require a full security architecture packet yet, but the
requirements should not ignore it.

## First Safe Requirement Summary

Required now:

- low-latency control
- responsive telemetry
- pairing/session ownership
- reconnect and stale-state handling

Not automatically required now:

- full audio streaming
- generalized media transport
- arbitrarily many simultaneous active controllers

## Immediate Follow-On

This requirements packet should feed:

1. control-plane versus audio-plane split
2. wireless transport-family comparison
3. later prototype transport selection
