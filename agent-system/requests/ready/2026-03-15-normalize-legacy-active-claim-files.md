Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic

# Normalize Legacy Active Claim Files

## Goal

Repair any remaining legacy claim-file shapes so active claim parsing is fully
consistent and the tooling no longer has to carry old ambiguity.

## Source

- `docs/systems/OHMIC_SHARED_AGENT_SYSTEM_CONSISTENCY_AUDIT_2026-03-15.md`
- `agent-system/jobs/README.md`

## Focus

- active claim file schema
- any old header-based files
- consistent metadata fields
- repair note if no legacy files remain

## Acceptance

- active claims are normalized to the canonical schema
- any exceptions are documented explicitly
- claim parsing becomes simpler or verifiably consistent
