Status: implementation_packet
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Phone-Assisted AmpLab Live Smoke Slice

## Purpose

Define the smallest honest phone-assisted live validation pass now that one
live AmpLab DSP unit is reachable on the local network and phones can be
plugged in on demand.

## Current Truth

The hardware path is already proven through:

- live device discovery over HTTP at `192.168.1.113`
- live status, telemetry, and input reads from the DSP unit
- browser-side link flow still unproven against the live unit

That means the next phone lane is not a broad mobile workflow. It is one
same-Wi-Fi browser smoke confirming that a phone can reach the UI, link to the
known live unit, and show live telemetry without rediscovering setup details.

## Exact Slice Scope

- one phone only
- one browser session only
- local network path only
- existing hardware UI surfaces only

## Preconditions

- live AmpLab DSP unit remains reachable at `192.168.1.113`
- phone can join the same local network as the dev machine and DSP
- local app host is available to the phone browser
- browser-side discovery or manual-link path exists in the current hardware UI

## Validation Steps

1. Open the current Ohmic hardware UI from one phone on the same Wi-Fi.
2. Navigate to the AmpLab hardware surface.
3. Confirm one honest link path:
   - live discovery list shows the unit, or
   - manual link using the known live IP succeeds.
4. Confirm at least one live telemetry surface updates after linking.
5. Record exact pass/fail behavior and any device/browser-specific blocker.

## Expected Signals

- phone browser reaches the running UI without special packaging work
- live unit appears or accepts manual link at `192.168.1.113`
- telemetry values update after linking
- failure, if any, is attributable to one precise layer:
  - browser reachability
  - discovery/manual-link behavior
  - live telemetry stream behavior

## Acceptance

- one clean phone-assisted live smoke note exists
- setup does not need to be rediscovered later
- pass or blocker is recorded precisely enough to guide the next fix

## Explicitly Out Of Scope

- native Android wrapper behavior
- multi-phone comparisons
- measurement capture orchestration
- BLE pairing
- long-duration telemetry soak testing
