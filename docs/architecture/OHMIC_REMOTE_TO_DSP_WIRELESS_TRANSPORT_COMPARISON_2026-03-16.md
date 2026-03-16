# Ohmic Remote To DSP Wireless Transport Comparison

Date: 2026-03-16
Project: ohmic

## Purpose

Compare the likely transport families for remote-to-DSP linking without
pretending one consumer-facing buzzword solves every Ohmic requirement.

## Core Rule

Transport choice should follow plane requirements.

For Ohmic right now, the important first comparison is:

- which transport fits control well
- which transport fits telemetry well
- whether anything should be selected for audio or media later

## Transport Families Considered

### 1. BLE GATT

Good at:

- pairing and discovery
- low-bandwidth control
- low-rate state exchange
- battery-friendly remote scenarios

Weak at:

- heavier telemetry throughput
- large state sync payloads
- audio/media transport

Ohmic fit:

- plausible for simple control and small telemetry
- likely weak if the remote UI expects richer or faster telemetry

### 2. Wi-Fi LAN With TCP Or WebSocket

Good at:

- interactive control
- richer telemetry
- state sync
- browser-friendly remote surfaces

Weak at:

- requires network presence and session handling
- pairing/discovery may need extra product work
- can be more infrastructure-heavy than BLE

Ohmic fit:

- strong candidate for first control-plus-telemetry implementation
- especially good if the remote is phone/tablet/browser-driven

### 3. UDP-Based Local Link

Good at:

- low-latency lightweight state push
- telemetry-style streaming when occasional loss is acceptable

Weak at:

- command reliability unless extra protocol work is added
- browser friendliness
- pairing/session semantics without additional layers

Ohmic fit:

- possible telemetry helper layer
- weak as the only first-link solution unless reliability and ownership layers
  are built around it

### 4. Bluetooth Classic / Serial-Like Link

Good at:

- simpler command-style link on some platforms
- moderate control traffic

Weak at:

- uneven platform support
- browser integration limits
- not a clean future media or telemetry story

Ohmic fit:

- possible niche control path
- less attractive than Wi-Fi-based browser-friendly routes if Ohmic wants a
  modern remote surface

### 5. Hybrid BLE Plus Wi-Fi

Good at:

- BLE for discovery/pairing
- Wi-Fi for control and telemetry payloads

Weak at:

- more system complexity
- more state transitions to manage
- more pairing and fallback edge cases

Ohmic fit:

- attractive longer-term if product polish needs both easy discovery and richer
  control bandwidth
- probably too complex for the very first link unless discovery is otherwise a
  serious blocker

## Plane Suitability

### Control Plane

Best fit:

- Wi-Fi LAN with TCP/WebSocket

Viable but narrower:

- BLE GATT
- Bluetooth classic

Weak:

- raw UDP alone

Why:

- control needs acknowledgment, bounded retry, and browser-friendly pathways

### Telemetry Plane

Best fit:

- Wi-Fi LAN with TCP/WebSocket

Potential helper:

- UDP if used carefully for non-critical streaming-style telemetry

Viable but limited:

- BLE for lighter telemetry only

Why:

- telemetry needs more steady throughput than simple command traffic

### Audio Or Media Plane

Likely separate treatment:

- not a first-link requirement
- if later required, should be evaluated with a different bandwidth and
  buffering lens

Weak choices for audio/media:

- BLE GATT
- simple command-oriented Bluetooth paths

This is where conflation causes bad decisions fastest.

## Complexity Tradeoff

Lowest conceptual complexity:

- single Wi-Fi control and telemetry link

Lowest discovery friction:

- BLE-first approaches

Highest combined complexity:

- hybrid BLE plus Wi-Fi

The most tempting "best of both worlds" design is also the easiest to overbuild
too early.

## Durability And Failure Handling

Strong first-link candidates should support:

- explicit reconnect behavior
- visible stale/offline state
- one clear session owner
- non-mysterious command failure

Wi-Fi control-plus-telemetry routes generally fit these needs better than BLE
alone for a richer remote surface.

## Likely First Implementation Direction

Based on the current Ohmic requirements:

- first choice: Wi-Fi LAN with a reliable control-plus-telemetry protocol
  suitable for app/browser remotes
- optional later helper: BLE for discovery or initial pairing only
- defer audio/media-plane transport until a real use case exists

## Recommendation Summary

Recommended first direction:

- treat Wi-Fi control and telemetry as the primary implementation path
- keep BLE as an optional discovery/pairing enhancer, not the core data plane
- do not choose an audio/media-oriented transport until audio/media is a real
  requirement

## Immediate Follow-On

This comparison should feed:

1. prototype transport selection
2. remote session and pairing design
3. later DSP remote UX architecture
