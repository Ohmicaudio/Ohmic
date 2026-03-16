Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T094242Z-d330879d

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

## Result

Done. Burst generation rules now live in
`docs/systems/OHMIC_BURST_PACKET_GENERATION_RULES_2026-03-16.md`, covering
parent-to-child burst rules, family-only batching, promotion timing,
duplication guards, queue floor protection, and parent-child linkage fields.
