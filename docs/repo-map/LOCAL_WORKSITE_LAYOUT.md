# Local Worksite Layout

`B:/ohmic` is the local umbrella root.

## What goes here

- migration docs
- architecture docs
- contract indexes
- repo manifests
- generated cross-project context
- local mirror landing zones under `repos/`

## What does not go here

- dumping full source trees into the umbrella repo
- one-off junk exports
- unrelated docs copied without ownership
- build artifacts from product repos

## Local mirror rule

The folders under `repos/` are for local clones or mirrors:

- `repos/ohmic-audio-labs`
- `repos/amplab-firmware`
- `repos/cyd-remote`
- `repos/ohmic-audio-static-content`
- `repos/hardware-specs`

They are intentionally ignored by the umbrella repo so this root can stay clean.
