# Ohmic Audio Labs Branch-To-Launch Review

Date: 2026-03-20

## Scope

Launch-cut review for:

- `B:\ohmic\repos\ohmic-audio-labs`
- web
- backend
- Android wrapper

This review treats firmware as an adjacent moving target, not the primary cut
surface for this repo.

## Current Branch Posture

- active local branch: `device-identity-schema-convergence`
- remotes:
  - `origin` -> `Ohmicaudio/ohmic-audio-labs`
  - `legacy-origin` -> historical upstream still present
- active repo state is not launch-frozen; there is live hardware-routing work in
  progress on this branch

## Current Launch-Relevant Surfaces

### Web

- root Vite/React app remains the primary interactive product shell
- runtime entry is still broad and root-based:
  - `App.tsx`
  - `index.tsx`
  - `components/`
  - `hooks/`
  - `store/`

### Backend

- backend is clearly separated under `services/backend/`
- there is a real service README and broad endpoint coverage
- backend still describes itself as a `skeleton`, which is directionally honest
  but not launch-language

### Android

- Android wrapper exists under `android/`
- there is a concrete smoke path in:
  - `docs/MEASURE_ANDROID_SMOKE.md`
  - `docs/ANDROID_WRAPPER_SETUP.md`
- Android launch/testing still depends on explicit environment and device setup;
  it is not yet a one-command launch posture

## Findings

### 1. Branch posture is still development-shaped, not launch-shaped

Severity: high

The repo is on `device-identity-schema-convergence`, not a clear launch branch
or stabilized `main` cut. That may be correct for active work, but it means the
launch question is still unresolved:

- merge forward to `main`
- cut a release branch from the current work
- or keep this as an active integration branch and launch from elsewhere

That choice needs to be made explicitly before calling this repo launch-ready.

### 2. Repo shape is broad enough that launch ownership is still blurry

Severity: high

The repo still carries a lot of mixed concerns in one tree:

- web/runtime
- backend
- Android
- firmware remnants
- docs and plans
- static-content transition surfaces

This is workable during build-out, but not ideal for launch-day clarity. The
largest operator risk is not lack of code; it is uncertainty about:

- where the launch truth lives
- which folders are part of the launch surface
- which folders are historical or transitional

### 3. Repo-root document clutter remains a launch risk

Severity: high

Even with the improved README/AGENTS guidance, the repo root still contains many
non-runtime planning and review artifacts, for example:

- `PROJECT_IMPROVEMENT_PLAN.md`
- `TECHNICAL_AUDIT.md`
- `repo_restructure_plan.md`
- `security_best_practices_report.md`
- `ohmic-audio-labs-threat-model.md`

That makes it harder for operators and agents to answer:

- where should I edit?
- which document is authoritative?
- which notes are launch-facing versus historical analysis?

### 4. Firmware remnants inside this repo still muddy the launch story

Severity: medium

The umbrella split now gives firmware proper homes:

- `B:\ohmic\repos\amplab-firmware`
- `B:\ohmic\repos\cyd-remote`

But `ohmic-audio-labs` still visibly contains firmware-related directories such
as:

- `firmware/`
- `esp32round128/`

That may be required for current compatibility or migration reasons, but it
weakens launch clarity for this repo unless the launch narrative explicitly says
what is still active here and what is not.

### 5. Validation exists, but launch-gate framing is still diffuse

Severity: medium

There are strong validation commands:

- `npm run validate:surfaces`
- `npm run validate:web`
- `npm run validate:backend`
- `npm run validate:osm`
- `npm run android:measure:smoke`

But they are still described as engineering/validation commands rather than as a
single launch checklist. Launch operators need a shorter, clearer answer to:

- what do I run before launch?
- what proves web/backend are healthy?
- what proves Android is healthy enough for launch?

### 6. Backend README language understates current role

Severity: medium

`services/backend/README.md` still leads with `Ohmic Backend (Skeleton)`.
That wording may have been useful earlier, but it now creates ambiguity about
how production-directional the backend actually is.

### 7. There is already active work on this branch

Severity: medium

At review time, the repo is not clean because another lane is actively moving:

- `components/Hardware/AmpLabControlSurfaces.tsx`
- `components/Hardware/MediaSourceStatusCard.tsx`
- `components/Hardware/useHardwareSourceRouting.ts`
- `components/Tabs/HardwareTab.tsx`
- `services/hardware/sourceArbitration.ts`

That means this review should be treated as a cut-planning document, not as a
"freeze now" command.

## Launch Cut Recommendation

### Recommended shape

Use `ohmic-audio-labs` as the launch repo for:

- web
- backend
- Android wrapper

Do not rely on it as the primary launch repo for firmware anymore.

### Required cut decisions

1. Decide the launch branch.
   Choose explicitly between:
   - merging `device-identity-schema-convergence` to `main`
   - cutting a dedicated launch branch from it
   - or defining `main` as launch and backporting only required changes

2. Define the launch surface boundary.
   Launch-facing surfaces should be named explicitly as:
   - root web app
   - `services/backend`
   - `android`

3. Freeze document boundaries.
   - cross-project and launch reviews stay in `B:\ohmic\docs\roadmap`
   - product docs stay in `docs/`
   - repo-root planning/audit clutter should stop growing

4. Define a single launch gate.
   Minimum candidate:
   - `npm run validate:web`
   - `npm run validate:backend`
   - Android smoke command with explicit backend/device origin

5. Mark firmware remnants as non-primary for launch.
   The repo should say clearly that device launch truth now lives in the
   dedicated firmware repos.

## Recommended Next Steps

1. Perform a branch-to-main delta review for `device-identity-schema-convergence`.
2. Write a short `launch checklist` doc for `ohmic-audio-labs`.
3. Decide which repo-root docs should be moved into `docs/` versus left in
   umbrella roadmap/history.
4. Update backend launch wording so `skeleton` does not undercut real launch
   posture if the backend is part of the launch surface.
5. Add a concise launch-boundary note explaining:
   - web/backend/android live here
   - firmware launch truth lives in the dedicated firmware repos
