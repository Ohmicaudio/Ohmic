Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
# Define Queue Pressure Alert State Model

## Goal

Define the alert states used when queue pressure is surfaced to the operator.

## Focus

- alert open/acknowledged/cleared
- family-specific alert state
- global pressure state
- escalation hint
- stale alert handling

## Acceptance

- one alert-state packet is explicit
- queue pressure alerts get a stable lifecycle
Claim ID: 20260316T100756Z-ae12ccd3

## Result

Defined the queue-pressure alert lifecycle and surfaced the first alert-state fields in the shell model output.
