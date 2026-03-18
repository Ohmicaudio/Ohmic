Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T095256Z-1a650d8b

# Define Same Family Pressure Rollup Projection

## Goal

Define the projection shape that rolls same-family queue pressure into a compact
runtime/dashboard-friendly record.

## Focus

- family id
- same-family ready count
- warm reserve count
- active-worker ratio
- status band

## Acceptance

- one same-family rollup packet is explicit
- family pressure can be projected without raw queue scanning in the UI

## Result

Defined the same-family pressure rollup and implemented the first generator in tools/sync/queue-health/same-family-pressure-rollup.ps1.
