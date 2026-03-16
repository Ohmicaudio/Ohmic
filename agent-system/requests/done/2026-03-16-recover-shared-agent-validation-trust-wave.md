Status: done
Priority: high
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T110947Z-9f0e4b2a

# Recover Shared Agent Validation Trust Wave

## Goal

Restore trustworthy behavior in the shared validation and indexing layer so the
coordination surfaces stop producing false positives and silent no-op outcomes.

## Source

- `docs/roadmap/OHMIC_SHARED_AGENT_VALIDATION_TRUST_RECOVERY_WAVE_2026-03-16.md`

## Focus

- validator input boundaries
- claim-file parsing reliability
- semantic-index operator feedback

## Acceptance

- one explicit shared-tooling family exists in `ready`
- the children are narrow enough to claim independently
- the family improves operator trust instead of expanding into abstract tooling
  redesign

## Result

- published the family closeout in
  `docs/roadmap/OHMIC_SHARED_AGENT_VALIDATION_TRUST_RECOVERY_WAVE_2026-03-16.md`
- repaired the README false-positive boundary across the validator/runtime
  readers
- repaired the CRLF-sensitive live-claim `# Files` heading check
- made unknown semantic-index repo selectors fail loudly instead of silently
  succeeding
- narrowed the remaining trust problem to the separate request-metadata
  contract mismatch
