Status: done
Priority: high
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T110947Z-9f0e4b2a

# Make Active Claim Files Heading Parse CRLF Safe

## Goal

Make active-claim heading detection robust to CRLF line endings so valid claim
files are not falsely reported as malformed.

## Source

- `docs/roadmap/OHMIC_SHARED_AGENT_VALIDATION_TRUST_RECOVERY_WAVE_2026-03-16.md`

## Focus

- claim parser heading detection
- Windows line-ending compatibility
- false invalid-claim reports

## Acceptance

- valid active claim files with CRLF line endings parse correctly
- the validator stops mislabeling the known heading case

## Result

- made the live-claim `# Files` heading check CRLF-safe in
  `tools/sync/validate-agent-system.ps1`
- confirmed the validator still recognizes the current active claim as valid
  after the change
