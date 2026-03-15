Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic-audio-labs

# Add Chirp Analyzer Bootstrap Script For PowerShell

## Goal

Add a small Windows/PowerShell companion bootstrap helper so the chirp analyzer
environment can be created cleanly on the same platform as the backend dev
shells.

## Source

- `agent-system/requests/done/2026-03-15-add-chirp-analyzer-bootstrap-script.md`
- `services/backend/tools/bootstrap-chirp-analyzer-env.sh`

## Focus

- PowerShell bootstrap only
- same narrow requirements artifact
- no broad Python tooling changes

## Acceptance

- one PowerShell companion helper exists for the chirp analyzer environment
- package scope stays narrow
- Windows backend operators no longer need to translate the shell flow by hand
