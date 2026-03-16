Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T105600Z-e51283b0

# Define Section Runway Shortfall Audit Event Family

## Goal

Define the audit events emitted when a section family falls below its runway
target.

## Focus

- family id
- active/successor counts
- shortfall reason
- actor attribution
- timestamping

## Acceptance

- one runway-shortfall audit packet is explicit
- section-runway failure becomes reviewable later

## Result

- defined the audit event family in
  `docs/systems/OHMIC_SECTION_RUNWAY_SHORTFALL_AUDIT_EVENT_FAMILY_2026-03-16.md`
- standardized the shortfall fields and first safe reason set for later review
