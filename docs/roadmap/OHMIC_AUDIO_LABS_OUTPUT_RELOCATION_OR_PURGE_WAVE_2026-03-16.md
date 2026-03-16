# Ohmic Audio Labs Output Relocation Or Purge Wave

Date: 2026-03-16
Project: ohmic-audio-labs

## Purpose

Resolve the remaining `output/*` repo clutter by relocating the retained
artifacts into the established local-only holding root.

## Local-Only Target

Moved into:

- `B:\\ohmic-local\\working\\ohmic-audio-labs-retained\\2026-03-16-first-local-only-relocation-wave\\output\\`

## Moved In This Wave

Relocated:

- `output/fold-base.apk`
- `output/last-pc2a-session.txt`
- `output/ohmic-ui-fold.xml`
- `output/pc2a-sync-state.json`

Already present from the earlier relocation wave in the same local-only target:

- `output/android-measure-smoke/**`
- `output/playwright/**`
- `output/pc2a-web.log`

## Verification

After relocation:

- repo `output/` no longer exists
- `git status --short --ignored -- output` is empty
- the local-only target now contains both the smoke-output subtrees and the
  remaining phone-session artifacts

## Result

`output/*` is no longer ambiguous repo-root clutter. The entire retained output
surface now lives under the local-only holding root.
