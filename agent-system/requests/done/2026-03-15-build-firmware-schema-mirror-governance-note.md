Status: done
Priority: low
Date: 2026-03-15
Project: amplab-firmware
Owner: d
Claim ID: 20260315T002141Z-b9a5d22f

# Build Firmware Schema Mirror Governance Note

## Goal

Document the current mirror-governance rule for firmware-side schemas so future
edits do not drift from the canonical source.

## Why

Schema drift is a cross-repo risk even when firmware work is otherwise calm.

## Deliverable

A short note that states:

- canonical schema owner
- mirror repos
- when firmware may edit locally
- how changes should propagate

## Constraints

- governance only
- no schema migration in this step

## Outcome

Completed on 2026-03-15.

Output:

- `B:\ohmic\docs\contracts\OHMIC_FIRMWARE_SCHEMA_MIRROR_GOVERNANCE_2026-03-15.md`

Result:

- the canonical schema owner is explicit again
- firmware and handheld are reaffirmed as mirrors, not peer authorities
- the local-edit hotfix rule and propagation path are now written down

## Completion

- added `B:\ohmic\docs\contracts\OHMIC_FIRMWARE_SCHEMA_MIRROR_GOVERNANCE_2026-03-15.md`
- grounded the note on the real schema paths in `ohmic-audio-labs`,
  `amplab-firmware`, and `cyd-remote`
- defined when firmware may edit locally and how changes must propagate back to
  canon
