Status: execution_packet
Date: 2026-03-16
Project: ohmic-audio-labs

# Ohmic Audio Labs Local-Only Relocation Plan

## Purpose

Stage the first concrete move plan for local-only retained evidence and staging
material so `ohmic-audio-labs` can reduce repo clutter without losing useful
temporary artifacts.

## Current Candidate Set

### Purge Rather Than Relocate

These are session-local exhaust and should not get long-term relocation unless
an active debugging loop explicitly says otherwise:

- `backend_err.txt`
- `backend_final_log.txt`
- `backend_log.txt`
- `backend_new_log.txt`
- `dev.log`
- `dev-mobile.log`
- `playwright-report/*`
- `test-results/*`
- `tmp/*`

Default action:

- purge after the current review loop

### Relocate To Local-Only Retained Evidence

These may still matter briefly and should move out of the repo if retained:

- `captures/*`
- `output/*`
- `services/backend/storage/measurement-captures/*`
- `services/backend/storage/measurement-captures.v1.json`

Target:

- `B:\ohmic-local\retained-evidence\ohmic-audio-labs\captures\*`
- `B:\ohmic-local\retained-evidence\ohmic-audio-labs\output\*`
- `B:\ohmic-local\retained-evidence\ohmic-audio-labs\measurement-captures\*`

### Relocate To Local-Only Staging

These are staging/import bundles and should leave the repo root:

- `content-work/*`
- `content-work.zip`
- `sigma-flow-xml-skill-v3.zip`

Target:

- `B:\ohmic-local\staging\ohmic-audio-labs\content-work\*`
- `B:\ohmic-local\staging\ohmic-audio-labs\bundles\*`

## Important Hold

Do not move source-support scripts casually.

Example:

- `scripts/_reorganize-content-work.py`

Reason:

- script-like helpers are source-adjacent and should stay visible until their
  source role is classified separately

## First Safe Relocation Wave

Safe first move candidates:

- `content-work/*`
- `content-work.zip`
- `sigma-flow-xml-skill-v3.zip`

Safe first retained-evidence move candidates:

- `captures/*`
- `output/*`

Hold for explicit decision if needed:

- `services/backend/storage/measurement-captures/*`
- `services/backend/storage/measurement-captures.v1.json`

Reason:

- these may still support backend measurement review, so they should move only
  if the current backend loop is cold or the evidence is explicitly retained

## Outcome Standard

If this plan is followed:

- obvious local-only staging clutter leaves the repo first
- useful temporary evidence can survive outside the repo
- cleanup execution can begin without guessing what to preserve
