Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T224700Z-placeholdernotes
Owner: d
Claim ID: 20260315T224700Z-placeholdernotes

# Externalize Required UI Placeholder Notes

## Goal

Move any still-useful placeholder or staging notes out of live UI copy and into
external documentation where they can guide implementation without leaking into
user-facing surfaces.

## Focus

- public-site captions and metadata
- app-shell copy and empty states after current claims clear
- any asset or surface that still exposes rough placeholder wording instead of a
  user-trust-safe description

## Acceptance

- the external-doc boundary is recorded
- the next cleanup passes follow that rule
- useful staging notes are preserved in docs instead of deleted blindly

## Result

- anchored this rule to
  `docs/roadmap/OHMIC_EXTERNAL_UI_PLACEHOLDER_DOCUMENTATION_BOUNDARY_2026-03-15.md`
- clarified that raw scaffold markers like `[VISUAL PLACEHOLDER: ...]` do not
  belong in public metadata or UI copy
- clarified that input `placeholder=` hints are allowed and that `planned` is
  acceptable only on honest planning/index surfaces
- future cleanup passes can now preserve staging truth in docs without leaking
  internal scaffolding into live surfaces
