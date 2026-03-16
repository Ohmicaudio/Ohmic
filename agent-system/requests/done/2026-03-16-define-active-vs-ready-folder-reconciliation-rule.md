Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T095256Z-1a650d8b

# Define Active Vs Ready Folder Reconciliation Rule

## Goal

Define how the system reconciles task status with physical folder placement when
active packets remain in `ready/`.

## Focus

- status precedence over folder path
- active packet treatment
- queue truth reporting
- migration safety
- operator interpretation

## Acceptance

- one reconciliation packet is explicit
- folder placement stops overriding task status truth

## Result

Defined the active-vs-ready folder reconciliation rule and carried it into the first queue-health runtime snapshot and dashboard surfaces.
