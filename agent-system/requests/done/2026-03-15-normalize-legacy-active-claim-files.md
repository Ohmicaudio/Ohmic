Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T182420Z-43df7cd8

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

## Outcome

Completed on 2026-03-15.

Result:

- verified that live active claims no longer use the older header-style claim
  format
- simplified the active-claim parsers so they only accept the canonical flat
  schema for live coordination files
- documented the explicit exception that legacy header-style files remain only
  in the completed archive as historical trace

## Artifact

- `B:\ohmic\tools\sync\agent-claim.ps1`
- `B:\ohmic\tools\sync\sync-agent-state.ps1`
- `B:\ohmic\agent-system\jobs\README.md`
- `B:\ohmic\docs\systems\OHMIC_ACTIVE_CLAIM_SCHEMA_NORMALIZATION_AUDIT_2026-03-15.md`
