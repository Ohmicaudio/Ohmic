Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T094242Z-d330879d

# Define Hot Vs Warm Queue Tier Model

## Goal

Define the actual state model that separates hot ready tasks from warm queued
reserves without losing queue truth.

## Focus

- tier definitions
- promotion rules
- demotion rules
- reporting boundary
- interaction with blocked and done states

## Acceptance

- one queue-tier packet is explicit
- hot and warm queue behavior is no longer implicit

## Result

Done. The explicit tier model now lives in
`docs/systems/OHMIC_HOT_VS_WARM_QUEUE_TIER_MODEL_2026-03-16.md`, defining hot,
warm, and cold queueable layers, their transitions, reporting boundary, and
truth-preservation rules.
