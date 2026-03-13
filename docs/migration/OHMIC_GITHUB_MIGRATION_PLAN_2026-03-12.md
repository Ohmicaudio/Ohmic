# Ohmic GitHub Migration Plan

Date: 2026-03-12
Target: `https://github.com/Ohmicaudio/Ohmic`
Status: migration planning draft

## Executive Summary

The best move is not to dump everything into one giant repo.

The best move is:

- use `Ohmic` as the private umbrella/context repo
- keep product code in separate private repos
- migrate in a controlled order
- preserve history where it matters
- re-root or clean history where the current local repo shape is noisy or misleading

That gives you:

- one company home
- less junk-drawer sprawl
- clean product boundaries
- one place for architecture, contracts, manifests, and migration notes
- a sane path for giving cloud/git access later

## Current State

### 1. Target repo

The target repo appears empty right now:

- `Ohmicaudio/Ohmic`

That is good. It means we can shape it intentionally instead of working around old structure.

### 2. Existing local repos

#### `ohmic-audio-labs`

- real git repo
- current remote:
  - `https://github.com/dadslands/ohmic-audio-labs.git`
- this is the main app/backend/mobile/contracts/docs surface today
- this repo has real history worth preserving

#### `masterfirmware`

- real git repo
- no remote configured locally
- current local history is minimal / ad hoc
- this should become the clean device firmware repo

#### `cyd_remote`

- real git repo
- no remote configured locally
- current local history is minimal / ad hoc
- this should become the handheld controller repo

## Recommended GitHub Structure

## Recommendation: use a private GitHub organization

Do not use a single personal account as the long-term system container if you can avoid it.

Best shape:

- GitHub org: `Ohmicaudio`
- repo: `Ohmic` as umbrella/context repo
- separate private repos for codebases

If the org already exists, use it.

## Target repo layout

### 1. `Ohmicaudio/Ohmic`

This should be the umbrella repo.

It should contain:

- top-level architecture docs
- migration docs
- repo registry and manifests
- contract index
- device family map
- release train notes
- generated context indexes
- cross-repo standards and ADRs

It should **not** be the place where all source code is dumped.

Recommended structure:

```text
Ohmic/
  README.md
  docs/
    architecture/
    adr/
    migration/
    systems/
    repo-map/
    contracts/
  manifests/
    repos.yaml
    surfaces.yaml
    contracts.yaml
    devices.yaml
    apps.yaml
  generated/
    context-index/
    ai-index/
  tools/
    sync/
```

### 2. `Ohmicaudio/ohmic-audio-labs`

Keep this as the main shared app/runtime repo.

Scope:

- web app
- Capacitor Android shell
- backend
- sync/session hub
- shared app-side contracts
- measurement pipeline
- future shared-core mini apps

Important note:

Do not split mini apps into separate repos yet. Keep them as thin shells over a shared core inside this repo until the architecture is settled.

### 3. `Ohmicaudio/amplab-firmware`

This should be the cleaned successor to the current `masterfirmware` folder.

Scope:

- AmpLab firmware
- DSP transport implementation
- measurement job implementation
- SigmaStudio extraction/manifests
- device-web API implementation
- board bring-up docs for the AmpLab-side hardware

### 4. `Ohmicaudio/cyd-remote`

This should be the handheld repo.

Scope:

- CYD firmware
- LVGL/TFT_eSPI display stack
- handheld UI
- handheld-side settings and UX
- CYD bring-up docs and working snapshots

### 5. `Ohmicaudio/hardware-specs`

Create later if needed, not first.

Scope:

- electrical specs
- sensor/channel definitions
- harnesses
- pinouts
- board-level references
- product hardware revision docs

### 6. Optional later repo: `Ohmicaudio/ohmic-contracts`

Do not create this first.

Create it only when:

- contract shapes are stable enough
- multiple repos truly need the same canonical package
- extraction reduces duplication instead of creating churn

For now, the contract can stay in `ohmic-audio-labs` while it is being normalized.

## Recommended Migration Order

## Phase 0. Freeze and inventory

Before moving anything:

- freeze the current working CYD baseline
- keep the current reports and contract drafts
- decide which repos need history preserved
- decide which repos are safe to re-root cleanly

Current recommendation:

- preserve history for `ohmic-audio-labs`
- treat `masterfirmware` and `cyd_remote` as safe to cleanly bootstrap if needed

Reason:

- `ohmic-audio-labs` has meaningful upstream history
- `masterfirmware` and `cyd_remote` currently look like locally bootstrapped repos with low-value history

## Phase 1. Bootstrap the umbrella repo

Create `Ohmicaudio/Ohmic` as private umbrella/context repo.

Initial contents:

- README
- architecture overview
- migration plan
- repo registry
- current roadmap docs
- canonical device contract draft

Seed docs from the current work:

- [OHMIC_SYSTEM_FIRMWARE_ROAD_FORWARD_2026-03-12.md](/mnt/a/cyd_remote/docs/OHMIC_SYSTEM_FIRMWARE_ROAD_FORWARD_2026-03-12.md)
- [OHMIC_WEB_ANDROID_AND_FIRMWARE_CONSOLIDATION_2026-03-12.md](/mnt/a/cyd_remote/docs/OHMIC_WEB_ANDROID_AND_FIRMWARE_CONSOLIDATION_2026-03-12.md)
- [OHMIC_CANONICAL_DEVICE_CONTRACT_DRAFT_2026-03-12.md](/mnt/a/cyd_remote/docs/OHMIC_CANONICAL_DEVICE_CONTRACT_DRAFT_2026-03-12.md)
- this migration plan

## Phase 2. Move `ohmic-audio-labs`

Best move:

- transfer or mirror the existing repo into `Ohmicaudio/ohmic-audio-labs`

Do not flatten it into `Ohmic`.

Reason:

- it already has real history
- it is already the main app/backend/mobile surface
- it should stay independently clonable and testable

## Phase 3. Create `amplab-firmware`

Take `A:\masterfirmware` and move it into:

- `Ohmicaudio/amplab-firmware`

Recommended approach:

- create a clean new repo root
- copy the current firmware tree in
- commit it with a clear first real import commit
- keep old local branch state only as reference if needed

Why:

- current history is not strong enough to justify preserving confusion
- this is the right moment to rename and clean the product boundary

## Phase 4. Create `cyd-remote`

Take `A:\cyd_remote` and move it into:

- `Ohmicaudio/cyd-remote`

Recommended approach:

- create a clean new repo root
- keep the working display baseline docs and binary snapshot
- import the current stable handheld firmware as the first meaningful commit

Seed with:

- CYD bring-up guide
- baseline snapshot note
- working binary if you want binary checkpoints kept with releases or a dedicated artifacts area

## Phase 5. Normalize cross-repo references

Once the three main repos exist:

- add repo registry entries to `Ohmic`
- add surface ownership map
- add contract/source-of-truth map
- add device family map
- add cross-repo migration notes

This is where `Ohmic` becomes the place that explains the system without becoming the system.

## Phase 6. Lock the contracts before more repo splitting

Do not create more repos until:

- AmpLab pilot contract is reviewed
- untracked DSP docs are promoted
- `masterfirmware` is normalized to the canonical contract

Only then decide whether to extract:

- `ohmic-contracts`
- `hardware-specs`
- mini-app packages

## What Goes In `Ohmic` vs What Stays Out

## Put in `Ohmic`

- architecture docs
- ADRs
- migration plans
- repo registry
- contract index
- device/surface ownership maps
- generated context indices
- release train and roadmap coordination

## Do not put in `Ohmic`

- full web app source
- full firmware source for every device
- large generated content dumps
- raw measurement captures
- random archives

`Ohmic` should be the map, not the junk drawer.

## Suggested Initial Repo Registry

Create a simple `manifests/repos.yaml` in `Ohmic` with entries like:

```yaml
repos:
  - id: ohmic-audio-labs
    role: app-backend-mobile
    source_of_truth_for:
      - app_runtime
      - backend_api
      - sync_session_hub
      - measurement_pipeline
      - shared_app_side_contracts

  - id: amplab-firmware
    role: device-firmware
    source_of_truth_for:
      - amplab_runtime
      - dsp_transport_impl
      - measurement_job_impl
      - device_web_api

  - id: cyd-remote
    role: handheld-controller
    source_of_truth_for:
      - handheld_ui
      - cyd_bringup
      - handheld_control_surface
```

That one file alone will reduce confusion fast.

## Best Way Forward For Git Access

## Best practical path

1. Create or confirm the private GitHub org/repo layout.
2. Let me finish the migration docs locally.
3. Then give the working environment authenticated git access.

That can be done by:

- logging the cloud environment into GitHub
- or giving the environment a valid credential helper/session
- or cloning/pulling the target repos into the accessible workspace with working auth

I do **not** need Chroma or a database for push access.
That tooling is useful for repo awareness, not for Git migration itself.

## What you need to do

### Before migration work

- decide whether `Ohmicaudio` is the private org home
- keep `Ohmic` private
- decide whether `ohmic-audio-labs` will be transferred or mirrored

### Before I can push

- make sure the environment can authenticate to GitHub for that org
- or give me a workspace clone that already has working authenticated remotes

### Nice to have

- enable branch protection on `main`
- create default private repo settings
- decide whether releases or binaries should live in GitHub Releases instead of in-repo snapshots

## What I can do once Git access exists

Once authenticated Git access is available, I can:

- bootstrap `Ohmic`
- seed the umbrella docs and manifests
- add clean remotes for the local repos
- stage the migration order
- write the initial repo registry and cross-repo maps
- prepare clean imports for `amplab-firmware` and `cyd-remote`
- preserve or reset history intentionally instead of accidentally

## Recommended Immediate Sequence

1. Use `Ohmic` as the empty private umbrella/context repo.
2. Transfer or mirror `ohmic-audio-labs` into the org unchanged first.
3. Create clean new repos for `amplab-firmware` and `cyd-remote`.
4. Seed `Ohmic` with the current roadmap and contract docs.
5. Only then start moving deeper contract/code ownership around.

## Bottom Line

The clean move is:

- `Ohmic` becomes the private system map
- `ohmic-audio-labs` stays the main shared app/runtime repo
- `masterfirmware` becomes `amplab-firmware`
- `cyd_remote` becomes `cyd-remote`
- contracts stay where they are until stabilized

That is the least messy top-down migration path and the best base for giving cloud/git access afterward.
