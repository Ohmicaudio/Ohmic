Status: done
Priority: high
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T110947Z-9f0e4b2a

# Exclude Non Queue READMEs From Agent Validator Input

## Goal

Stop the agent-system validator from treating support docs like queue entries
when scanning `requests/` and related folders.

## Source

- `docs/roadmap/OHMIC_SHARED_AGENT_VALIDATION_TRUST_RECOVERY_WAVE_2026-03-16.md`

## Focus

- validator file discovery rules
- non-queue Markdown exclusions
- false-positive reduction

## Acceptance

- support docs such as `README.md` are no longer interpreted as queue items
- validator output becomes quieter and more truthful

## Result

- stopped `README.md` support files from being treated as queue items in:
  - `tools/sync/validate-agent-system.ps1`
  - `tools/sync/agent-work-poll.ps1`
  - `tools/sync/reconcile-agent-json-runtime.ps1`
  - `tools/sync/agent-request.ps1`
- confirmed the validator no longer emits README-based false positives
