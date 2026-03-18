Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T095256Z-1a650d8b

# Scaffold Same Family Pressure Projection Generator

## Goal

Scaffold the generator seam that emits same-family pressure rollups for runtime
and dashboard consumption.

## Focus

- family grouping
- same-family counts
- warm reserve counts
- active-worker ratio
- status band mapping

## Acceptance

- one same-family generator packet is explicit
- family pressure gets a first projection seam

## Result

Implemented the first same-family pressure projection generator in tools/sync/queue-health/same-family-pressure-rollup.ps1.
