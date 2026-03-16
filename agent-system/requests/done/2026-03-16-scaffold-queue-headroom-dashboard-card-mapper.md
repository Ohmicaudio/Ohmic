Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T095256Z-1a650d8b

# Scaffold Queue Headroom Dashboard Card Mapper

## Goal

Scaffold the mapper seam that turns queue-health projections into dashboard card
data.

## Focus

- headroom card mapping
- family pressure card mapping
- refill cadence card mapping
- worker load card mapping
- status band propagation

## Acceptance

- one headroom-card mapper packet is explicit
- dashboard rendering has a first queue-capacity mapper seam

## Result

Implemented the first queue headroom dashboard card mapper in tools/sync/queue-health/dashboard-card-mapper.ps1.
