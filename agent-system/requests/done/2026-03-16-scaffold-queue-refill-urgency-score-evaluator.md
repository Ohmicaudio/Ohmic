Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T095256Z-1a650d8b

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

## Result

Implemented the first refill urgency evaluator in tools/sync/queue-health/refill-urgency-score.ps1.
