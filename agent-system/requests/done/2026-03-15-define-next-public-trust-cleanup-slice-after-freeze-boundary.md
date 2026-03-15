Status: done
Priority: low
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T143601Z-74ff1fd8

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

## Outcome

Completed on 2026-03-15.

Result:

- chose static metadata/support-file canonical-host cleanup as the next bounded
  public trust slice
- kept the packet fully inside `ohmic-audio-static-content` and outside frozen
  app-side public/archive surfaces
- left one concrete follow-on request in `ready` so the trust lane stays
  actionable without reopening broad content churn

## Artifact

- `docs/systems/OHMIC_NEXT_PUBLIC_TRUST_CLEANUP_SLICE_2026-03-15.md`
- `agent-system/requests/ready/2026-03-15-sweep-static-generated-metadata-and-support-files-for-canonical-trust.md`
