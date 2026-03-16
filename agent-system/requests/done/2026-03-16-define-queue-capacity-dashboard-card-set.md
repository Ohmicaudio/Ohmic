Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T095256Z-1a650d8b

# Define Queue Capacity Dashboard Card Set

## Goal

Define the minimal shared card set that should expose queue-capacity health in
the administrator/shared runtime dashboards.

## Focus

- headroom card
- family pressure card
- refill cadence card
- worker load pressure card
- card ordering

## Acceptance

- one queue-capacity card-set packet is explicit
- the dashboard layer gets a coherent headroom surface instead of ad hoc cards

## Result

Defined the first queue-capacity dashboard card set and wired the matching card mapper seam in tools/sync/queue-health/dashboard-card-mapper.ps1.
