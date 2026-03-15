Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T134549Z-5b0fc251

# Define Non-Repo Storage Migration Packet

## Goal

Define the first safe cleanup/migration packet for moving local-only clutter out
of Git-centered project zones.

## Use

- `docs/systems/OHMIC_REPO_STORAGE_BOUNDARY_2026-03-15.md`

## Acceptance

- one bounded move packet exists
- it names exact source zones and exact destination zones
- it does not move active repo truth or shared system truth

## Outcome

Completed on 2026-03-15.

Result:

- defined the first safe move packet as a `harvest\`-only cleanup
- fixed the packet to three exact source zones and three exact destination
  zones
- explicitly held back `ohmic-audio-universe\` and
  `ohmic-audio-universe-db-reference\` for later archive packets

## Artifact

- `docs/systems/OHMIC_NON_REPO_STORAGE_FIRST_MIGRATION_PACKET_2026-03-15.md`
