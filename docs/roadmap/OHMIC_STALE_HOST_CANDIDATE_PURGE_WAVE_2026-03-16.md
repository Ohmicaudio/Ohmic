Status: completed_wave
Date: 2026-03-16
Project: ohmic-audio-labs

# Ohmic Stale Host Candidate Purge Wave

## Purpose

Prevent stale self-host identities from surviving inside discovery and
live-link candidate surfaces after a desktop LAN rollover.

## Why This Exists

The current host truth changed, and older host identities like `192.168.1.91`
have already proven they can linger longer than they should in smoke inputs and
discovery reasoning.

## Included Outputs

- `B:\ohmic\agent-system\requests\done\2026-03-16-purge-stale-host-identity-from-live-link-candidate-surfaces-wave.md`
- `B:\ohmic\agent-system\requests\done\2026-03-16-drop-stale-self-host-candidates-after-host-ip-rollover.md`
- `B:\ohmic\agent-system\requests\done\2026-03-16-add-regression-coverage-for-host-ip-rollover-in-discovery-state.md`
- `B:\ohmic\repos\ohmic-audio-labs\services\ohmicLiveLink\ConnectionManager.ts`
- `B:\ohmic\repos\ohmic-audio-labs\test\services\ohmicLiveLinkConnectionManager.test.ts`

## Unified Outcome

Host self-identities that are no longer current should stop polluting discovery
state and candidate selection.

## Implementation

- stale host-service bases such as app/backend self-host ports are now filtered
  out of stored live-link discovery state
- `rememberEndpoint()` now ignores likely self-host service bases instead of
  re-persisting them
- rollover coverage now explicitly checks that real device candidates survive
  while stale host-service candidates are dropped

## Verification

- `npx vitest run test/services/ohmicLiveLinkConnectionManager.test.ts`
