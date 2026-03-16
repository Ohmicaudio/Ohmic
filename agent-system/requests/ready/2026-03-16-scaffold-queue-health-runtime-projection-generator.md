Status: ready
Priority: medium
Date: 2026-03-16
Project: ohmic

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
