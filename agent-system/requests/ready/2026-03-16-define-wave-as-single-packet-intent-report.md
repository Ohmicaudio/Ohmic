Status: ready
Priority: medium
Date: 2026-03-16
Project: ohmic

# Define Wave As Single Packet Intent Report

## Goal

Define the worker-facing report that marks a queue wave as one coherent packet
family rather than many unrelated singles.

## Focus

- parent packet id
- family id
- child count
- grouped intent flag
- parallel family context

## Acceptance

- one wave-intent report packet is explicit
- workers can plan around grouped wave intent instead of atomizing it
