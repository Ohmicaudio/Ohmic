Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
# Define Hybrid Mode Switch Threshold Policy

## Goal

Define the thresholds that should trigger a hybrid worker to be treated as more
administrator-heavy or more orchestrator-heavy.

## Focus

- mode switch thresholds
- continuity vs rescue balance
- audit compatibility
- transient mixed state
- operator override

## Acceptance

- one mode-threshold packet is explicit
- hybrid dominant mode gets a clearer policy boundary
Claim ID: 20260316T103411Z-13ddc46f

## Result

Defined the threshold policy that governs when a hybrid stack may switch dominant mode.
