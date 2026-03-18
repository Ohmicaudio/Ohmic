Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T095256Z-1a650d8b

# Define Queue Pressure Status Band Model

## Goal

Define the shared status-band vocabulary and thresholds used by queue-pressure
and headroom surfaces.

## Focus

- healthy/watch/pressure/critical bands
- threshold ownership
- family-vs-global banding
- derived flag alignment
- dashboard reuse

## Acceptance

- one status-band packet is explicit
- queue health surfaces stop inventing local severity labels

## Result

Defined the shared four-band queue-health severity model and aligned it with the first queue-health runtime helpers under tools/sync/queue-health.
