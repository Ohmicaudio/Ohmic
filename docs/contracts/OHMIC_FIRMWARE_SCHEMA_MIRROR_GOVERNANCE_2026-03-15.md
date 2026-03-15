Status: governance note
Date: 2026-03-15

# Ohmic Firmware Schema Mirror Governance

## Purpose

State the current rule for schema ownership and firmware-side mirrors so schema
files do not silently drift across repos.

## Canonical Owner

Current canonical schema owner:

- `B:\ohmic\repos\ohmic-audio-labs\schemas`

This is the file-authority source for the shared schema family right now.

Reason:

- `ohmic-audio-labs` is still the main software center of gravity
- it carries the widest runtime and test surface
- schema breakage is most likely to show up there first

This rule is operational and temporary. It is not the final dedicated-schema
architecture.

## Current Mirror Repos

Firmware mirror:

- `B:\ohmic\repos\amplab-firmware\schemas`
- `B:\ohmic\repos\amplab-firmware\docs\ohmic-firmware-handoff\schemas`

Handheld mirror:

- `B:\ohmic\repos\cyd-remote\schemas`
- `B:\ohmic\repos\cyd-remote\docs\ohmic-firmware-handoff\schemas`

Mirror rule:

- these repos are reviewed consumers of the schema family
- they are not peer-authority authoring surfaces

## When Firmware May Edit Locally

Firmware may edit a mirrored schema locally only when all of these are true:

1. the firmware lane is actively blocked by the current mirrored copy
2. the change is needed to unblock build, transport, or contract verification
3. the edit is treated as a temporary mirror hotfix, not a new authority source

If those conditions are not true, firmware should not author schema changes
first.

## Propagation Rule

Normal propagation path:

1. edit canonically in `B:\ohmic\repos\ohmic-audio-labs\schemas`
2. review the contract impact there first
3. mirror the updated files into `amplab-firmware` and `cyd-remote`
4. update any firmware/handheld handoff copies that intentionally track the
   same schema family
5. commit the mirror update as contract-sync work, not as an unrelated side
   effect

## Emergency Mirror Hotfix Rule

If firmware has to patch a mirror first to unblock itself:

1. record that the local edit is a mirror hotfix
2. propagate the same schema change back to the canonical source as soon as the
   block is understood
3. re-mirror outward so all repos converge again
4. do not leave the firmware copy as the only place where the change exists

## What Counts As Drift

Treat these as schema drift:

- firmware schema files differ from canon without an explicit sync reason
- handheld schema files differ from canon without an explicit sync reason
- docs/handoff schema copies no longer match their intended mirrored source
- a mirror repo gains schema fields or versions that never landed in the
  canonical source

## Current Safe Rule

The safe operating rule right now is:

- author schemas in `ohmic-audio-labs`
- mirror outward to firmware and handheld
- allow local firmware edits only as temporary unblock hotfixes
- sync back to canon immediately after any such hotfix

That is enough governance to prevent quiet contract drift without starting a
new schema-repo migration lane yet.
