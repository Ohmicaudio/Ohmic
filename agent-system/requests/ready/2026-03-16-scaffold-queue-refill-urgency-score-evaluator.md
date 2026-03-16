Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

# Scaffold Queue Refill Urgency Score Evaluator

## Goal

Scaffold the evaluator seam that computes refill urgency from queue pressure and
staleness inputs.

## Focus

- urgency inputs
- score bands
- family-vs-global urgency
- override hooks
- projection output

## Acceptance

- one urgency-evaluator packet is explicit
- refill urgency has a first implementation seam
