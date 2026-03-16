Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T105600Z-e51283b0

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

## Result

- defined the grouped wave report in
  `docs/systems/OHMIC_WAVE_AS_SINGLE_PACKET_INTENT_REPORT_2026-03-16.md`
- connected the worker-facing report to the reusable section wave intent flag
