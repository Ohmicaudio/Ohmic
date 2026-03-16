Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T124119Z-fabe40cd

# Demote Stale MDNS Aliases Below Explicit Live Addresses

## Goal

Reduce the chance that stale `*.local` aliases outrank a directly observed AP or
LAN address for the same live device.

## Focus

- alias ordering
- stale alias persistence
- explicit address preference
- linked-label truth

## Acceptance

- explicit live addresses outrank stale aliases
- alias fallback still exists without becoming the dominant truth source

## Result

Completed on 2026-03-16.

Output:

- `B:\ohmic\docs\roadmap\OHMIC_LIVE_LINK_CANDIDATE_NORMALIZATION_FIRST_SLICE_2026-03-16.md`

Outcome:

- explicit AP/LAN identities are now promoted alongside a reachable alias path
- alias-only live truth is no longer the only candidate shape the manager can
  produce
