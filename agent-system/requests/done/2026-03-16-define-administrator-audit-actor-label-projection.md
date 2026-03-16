Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T051522Z-15572a66

# Define Administrator Audit Actor Label Projection

## Goal

Define the projection fields used to render human-readable actor labels in
administrator audit surfaces.

## Focus

- actor ids
- display labels
- actor types
- fallback labels
- unresolved actor behavior

## Acceptance

- one audit-actor label packet is explicit
- audit views can render actors consistently without custom client mapping

## Result

- Added [OHMIC_MASTER_ADMINISTRATOR_AUDIT_ACTOR_LABEL_PROJECTION_2026-03-16.md](B:\ohmic\docs\architecture\OHMIC_MASTER_ADMINISTRATOR_AUDIT_ACTOR_LABEL_PROJECTION_2026-03-16.md) with normalized actor labels and actor classes for audit rows.
