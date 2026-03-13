# Local Repo Staging Status

Date: 2026-03-13
Root: `/mnt/b/ohmic/repos`

## Status

Three clean-import repos are now staged locally as independent git repos:

- `/mnt/b/ohmic/repos/cyd-remote`
- `/mnt/b/ohmic/repos/amplab-firmware`
- `/mnt/b/ohmic/repos/ohmic-static-content`

These were created by manifest-driven copy from the source repos.

Important:

- copied, not moved
- source repos under `A:` remain intact
- staged repos are clean local working repos, ready for future GitHub remotes

## Staged repo commits

### `cyd-remote`

- local root commit: `e23d583`
- commit message: `Stage clean handheld repo surface`

Verified build:

- command: `pio run -d B:/ohmic/repos/cyd-remote -e cyd24r`
- result: `SUCCESS`
- RAM: `26.2%`
- Flash: `44.0%`

### `amplab-firmware`

- local root commit: `08e7cf5`
- commit message: `Stage clean AmpLab firmware repo surface`

Verified build:

- command: `pio run -d B:/ohmic/repos/amplab-firmware -e esp32s3`
- result: `SUCCESS`
- RAM: `31.2%`
- Flash: `39.6%`

### `ohmic-static-content`

- local root commit: `8473e9d`
- commit message: `Stage static content repo surface`

Contains:

- `public/`
- `site/`
- `content-work/`

Notes:

- staged from the current `ohmic-audio-labs` working tree
- intended to become the dedicated static-content repo
- `ohmic-audio-labs` retains a transitional `public/` payload until static-host cutover is finalized

## Bootstrap content applied

The staged firmware repos use the clean bootstrap files from:

- `/mnt/b/ohmic/templates/repo-bootstrap/README.ohmic-cyd-remote.md`
- `/mnt/b/ohmic/templates/repo-bootstrap/README.ohmic-amplab-firmware.md`
- `/mnt/b/ohmic/templates/repo-bootstrap/gitignore.firmware`

This keeps them from inheriting stale framing from the source repos.

## `ohmic-audio-labs`

`ohmic-audio-labs` is intentionally not staged as a clean-room copy right now.

Current plan:

- preserve history
- clean by boundary
- keep the active app/runtime/backend/mobile/contract surface in place
- keep `public/` only as a transitional served payload for now
- move remaining static/content/archive sprawl out by dedicated repo

See:

- `/mnt/b/ohmic/docs/migration/OHMIC_AUDIO_LABS_CLEANUP_SURFACE_2026-03-13.md`

## Next migration step

Once GitHub auth is available:

1. connect `/mnt/b/ohmic` to `Ohmicaudio/Ohmic`
2. add remotes for the staged firmware repos
3. push `cyd-remote` and `amplab-firmware`
4. push `ohmic-static-content`
5. then handle `ohmic-audio-labs` as a preserve-history migration
