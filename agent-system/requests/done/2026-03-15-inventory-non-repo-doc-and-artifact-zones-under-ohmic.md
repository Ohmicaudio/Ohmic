Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T133404Z-f8715a2c

# Inventory Non-Repo Doc And Artifact Zones Under Ohmic

## Goal

Identify the files and folders under `B:\ohmic` that are neither product-repo
truth nor shared-system truth.

## Focus

- loose reports
- duplicate exports
- local-only bundles
- ad hoc artifacts that should move to `B:\ohmic-local\*` or `B:\junk`

## Acceptance

- one inventory exists
- obvious move candidates are grouped by destination zone
- repo-owned and umbrella-owned truth is left out of the sweep

## Outcome

Completed on 2026-03-15.

Result:

- inventoried the three current non-canonical top-level zones already fenced by
  `.gitignore`: `harvest\`, `ohmic-audio-universe\`, and
  `ohmic-audio-universe-db-reference\`
- grouped the obvious move candidates by destination zone across `B:\junk\`,
  `B:\ohmic-local\working\`, `B:\ohmic-local\archive\`, and
  `B:\ohmic-local\reports\`
- left repo-owned and umbrella-owned truth out of the sweep so the follow-on
  migration packet can stay bounded

## Artifact

- `docs/systems/OHMIC_NON_REPO_DOC_AND_ARTIFACT_ZONE_INVENTORY_2026-03-15.md`
