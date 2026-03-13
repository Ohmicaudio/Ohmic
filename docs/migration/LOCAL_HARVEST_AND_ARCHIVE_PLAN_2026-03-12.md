# Local Harvest And Archive Plan

Date: 2026-03-12
Status: active staging note

## Goal

Prepare `B:/ohmic` as the stable local root before the older `A:` working folders are archived.

## Principle

Do not destroy the `A:` folders while they still contain:

- untracked DSP docs
- vendor bring-up material
- working firmware notes
- dirty but important in-progress code

Harvest first. Archive later.

## Current Source Roots

- `/mnt/a/ohmic-audio-labs`
- `/mnt/a/masterfirmware`
- `/mnt/a/cyd_remote`

## What belongs in the umbrella repo

- migration docs
- contract drafts
- firmware roadmaps
- system consolidation notes
- repo manifests
- docker/context tooling docs

## What belongs in local repo mirrors

Under `B:/ohmic/repos/`:

- `ohmic-audio-labs`
- `amplab-firmware`
- `cyd-remote`

These are local working copies or mirrors, not part of the umbrella repo history.

## Important migration truth

The current source repos are not equally clean:

- `ohmic-audio-labs` has meaningful history worth preserving
- `masterfirmware` is valuable but locally ad hoc and dirty
- `cyd-remote` is valuable but locally ad hoc and dirty

That means the right migration plan is:

1. preserve `ohmic-audio-labs` history
2. treat `masterfirmware` and `cyd-remote` as candidates for clean imports after harvest
3. keep local working copies until the new private repos are standing up cleanly

## Harvest checklist

### ohmic-audio-labs

- preserve current repo history
- preserve untracked DSP/docs/spec material
- preserve semantic-index tooling
- preserve backend and app assumptions about device APIs

### masterfirmware

- preserve DSP transport/control work
- preserve untracked handoff docs and SigmaStudio material
- preserve current measurement control slice
- preserve local docs that explain the current contract mismatch

### cyd-remote

- preserve working CYD bring-up stack
- preserve snapshots and display baseline notes
- preserve handheld UI direction docs

## Archive rule

Do not archive the `A:` roots until:

- umbrella docs exist in `B:/ohmic`
- important operational tooling is copied or documented
- local repo mirrors/work copies exist under `B:/ohmic/repos`
- target GitHub repo plan is settled

## Next Step

After GitHub auth is in place:

1. push `B:/ohmic` to `Ohmicaudio/Ohmic`
2. migrate or mirror source repos into their target private repos
3. only then freeze/archive the old `A:` roots
