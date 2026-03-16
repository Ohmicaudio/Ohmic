Status: ready
Priority: medium
Date: 2026-03-16
Project: ohmic

# Define Burst Packet Generation Rules

## Goal

Define how the system should generate grouped child packets in bursts when a
lane starts moving quickly.

## Focus

- parent-to-child burst rules
- family grouping
- promotion timing
- duplication guards
- queue floor protection

## Acceptance

- one burst-generation packet is explicit
- fast lanes can be refilled in coherent bursts instead of one-offs
