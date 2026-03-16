Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T095256Z-1a650d8b

# Scaffold Queue Health Runtime Projection Generator

## Goal

Scaffold the generator seam that produces a compact runtime queue-health
projection from queue, claim, and worker-state inputs.

## Focus

- queue-health input set
- generated snapshot shape
- claim-aware counts
- status band projection
- timestamping

## Acceptance

- one queue-health generator packet is explicit
- runtime queue health has a clear first scaffold seam

## Result

Implemented the first queue-health runtime generator in tools/sync/queue-health/health-runtime-snapshot.ps1.
