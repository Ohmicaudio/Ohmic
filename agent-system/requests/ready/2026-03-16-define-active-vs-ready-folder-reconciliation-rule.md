Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

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
