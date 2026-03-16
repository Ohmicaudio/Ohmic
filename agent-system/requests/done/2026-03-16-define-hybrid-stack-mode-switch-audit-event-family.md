Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
# Define Hybrid Stack Mode Switch Audit Event Family

## Goal

Define the audit events emitted when a hybrid worker shifts between
administrator-heavy and orchestrator-heavy stack modes.

## Focus

- mode switch event
- old/new dominant mode
- trigger reason
- operator override
- timestamping

## Acceptance

- one mode-switch audit packet is explicit
- hybrid stack mode changes become reviewable later
Claim ID: 20260316T103411Z-13ddc46f

## Result

Defined the audit event family that records hybrid stack mode switches.
