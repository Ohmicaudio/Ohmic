Status: active
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T105600Z-e51283b0

# Define Intentionally Stale Or Superseded Ready Report

## Goal

Define the worker-facing report that explains when a ready item is intentionally
stale, superseded, or waiting behind a better grouped packet.

## Focus

- stale reason
- replacement linkage
- intended state
- demotion vs ignore
- timestamping

## Acceptance

- one stale-or-superseded report packet is explicit
- workers can plan around stale-ready noise instead of misreading it
