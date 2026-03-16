Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T105600Z-e51283b0

# Define Family Refill During Closeout Report

## Goal

Define the worker-facing report emitted when a task family is refilled during
closeout of a packet in that same family.

## Focus

- family id
- closing task id
- refill event linkage
- actor attribution
- timestamping

## Acceptance

- one closeout-refill report packet is explicit
- workers can tell healthy refill from random underfoot churn

## Result

- defined the durable closeout linkage report in
  `docs/systems/OHMIC_FAMILY_REFILL_DURING_CLOSEOUT_REPORT_2026-03-16.md`
- separated the compact notice payload from the fuller
  `family_refill_during_closeout_report` record
