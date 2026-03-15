Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Next Public Trust Cleanup Slice After Freeze Boundary

## Goal

Define the next bounded public-site trust cleanup slice now that the
public/archive freeze boundary is explicit in the live handoff surfaces.

## Focus

- choose one lower-risk public trust cleanup family
- keep it below the active app implementation lanes
- avoid reopening broad legacy page churn

## Acceptance

- one explicit lower-pressure public cleanup packet exists
- it is safe to leave in `ready` without competing with the mandatory app lanes
