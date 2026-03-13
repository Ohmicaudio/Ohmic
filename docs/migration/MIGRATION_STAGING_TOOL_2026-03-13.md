# Migration Staging Tool

Date: 2026-03-13
Tool: `tools/migration/stage_repo_from_manifest.py`

## Purpose

Turn the import-surface manifests into a real staged local mirror without touching the source repos.

This is for:

- `amplab-firmware`
- `cyd-remote`
- later, any other manifest-driven clean repo staging

It is not for:

- rewriting source history
- deleting from source repos
- replacing the preserve-history workflow for `ohmic-audio-labs`

## Why this exists

The migration docs already define what belongs in each new repo.
This tool makes those docs executable so migration day is not hand-copy chaos.

## Usage

Dry run:

```bash
python3 /mnt/b/ohmic/tools/migration/stage_repo_from_manifest.py \
  /mnt/b/ohmic/manifests/import-surfaces/cyd-remote.yaml \
  /mnt/b/ohmic/repos/cyd-remote \
  --dry-run
```

Materialize a clean staged mirror:

```bash
python3 /mnt/b/ohmic/tools/migration/stage_repo_from_manifest.py \
  /mnt/b/ohmic/manifests/import-surfaces/cyd-remote.yaml \
  /mnt/b/ohmic/repos/cyd-remote \
  --clean-dest
```

AmpLab firmware staging:

```bash
python3 /mnt/b/ohmic/tools/migration/stage_repo_from_manifest.py \
  /mnt/b/ohmic/manifests/import-surfaces/amplab-firmware.yaml \
  /mnt/b/ohmic/repos/amplab-firmware \
  --clean-dest
```

## Current rule

Use this for the clean-import repos first.

For `ohmic-audio-labs`, the current plan is still:

- preserve history
- clean by boundary
- move static/archive/content-work surfaces out later

That repo should not be reconstituted as a clean-room copy unless the migration strategy changes on purpose.
