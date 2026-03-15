# Ohmic Active Claim Schema Normalization Audit

Date: 2026-03-15
Status: implementation note

## Goal

Confirm that live active claims can now be treated as canonical YAML-style
records only, without preserving older header-based parsing in the active
tooling.

## Findings

- `agent-system/jobs/active` is the only live claim authority
- active claims are now expected to use only:
  - `claim_id:`
  - `status:`
  - `owner:`
  - `project:`
  - `task:`
  - `started:`
  - `expires:`
  - `# Files`
- older `Status:` / `Owner:` / `Task:` / `Date:` header styles still exist in
  the completed archive, but those files are historical trace, not live
  coordination input

## Repair

The active parsers in:

- `B:\ohmic\tools\sync\agent-claim.ps1`
- `B:\ohmic\tools\sync\sync-agent-state.ps1`

now parse only the canonical flat-header schema for active claims.

## Exception

Completed claim history was not bulk-rewritten.

That is intentional because:

- completed claim files are local trace, not authority
- rewriting hundreds of historical files would add churn without improving live
  overlap protection
- the live safety rule is satisfied once active claim parsing is unambiguous
