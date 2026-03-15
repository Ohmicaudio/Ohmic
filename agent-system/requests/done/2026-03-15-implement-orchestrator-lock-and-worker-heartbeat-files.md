Status: done
Priority: high
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T175156Z-3244d41e

# Implement Orchestrator Lock And Worker Heartbeat Files

## Goal

Put the orchestrator lock and worker heartbeat model into concrete files that a
runner can use to coordinate multi-agent activity safely.

## Source

- `docs/systems/OHMIC_ORCHESTRATOR_LOCK_AND_WORKER_HEARTBEAT_MODEL_2026-03-15.md`
- `docs/systems/OHMIC_ORCHESTRATOR_PERFORMER_MODEL_2026-03-15.md`

## Focus

- lock file location and shape
- heartbeat file location and shape
- expiration and takeover fields
- safe bootstrap behavior

## Acceptance

- one concrete lock file and one concrete heartbeat format exist
- the files are aligned with the documented takeover rules
- initial examples are present for immediate runner use

## Outcome

Completed on 2026-03-15.

Result:

- created `agent_locks.json` beside the other runtime seed files
- seeded one illustrative worker lease plus an empty orchestrator lease for
  bootstrap
- kept the location and ownership rules explicit so live locks do not get
  mistaken for markdown claim authority

## Artifact

- `B:\ohmic\generated\agent-work\runtime\agent_locks.json`
- `B:\ohmic\docs\systems\OHMIC_AGENT_JSON_RUNTIME_BOOTSTRAP_2026-03-15.md`
