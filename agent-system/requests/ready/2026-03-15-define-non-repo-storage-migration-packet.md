Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic

# Define Non Repo Storage Migration Packet

## Goal

Define the migration packet for moving non-repo clutter out of the shared repo
tree once the pushes are calm enough for cleanup.

## Source

- `docs/systems/OHMIC_REPO_STORAGE_BOUNDARY_2026-03-15.md`
- inventory of non-repo zones

## Focus

- move order
- target folders
- safety and rollback notes
- what should remain in git

## Acceptance

- one concrete migration packet exists
- it is specific enough to execute later without rediscovery
- repo truth and local-only truth are clearly separated
