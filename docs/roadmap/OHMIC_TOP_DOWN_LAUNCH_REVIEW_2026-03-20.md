# Ohmic Top-Down Launch Review

Date: 2026-03-20

## Scope

Top-down launch readiness review across:

- `ohmic-administrator`
- `ohmic-audio-labs` web/backend/android
- `amplab-firmware`
- `cyd-remote`
- umbrella board, doc, and startup surfaces

## Current State

### Administrator

- active product repo: `B:\ohmic\repos\ohmic-administrator`
- branch: `main`
- remote: `Ohmicaudio/ohmic-administrator`
- status: clean
- launch posture:
  - operator desk is real
  - business-ops screen is split correctly
  - board recommendation, follow-up seeding, and claim flow are materially
    tighter than earlier in the week

### Ohmic Audio Labs

- active product repo: `B:\ohmic\repos\ohmic-audio-labs`
- remote: `Ohmicaudio/ohmic-audio-labs`
- current branch: `device-identity-schema-convergence`
- status: clean
- launch posture:
  - this is still the main web/backend/android runtime repo
  - startup docs exist and are stronger than Administrator was before this
    review
  - the repo shape is still broad and busy for launch-day operator clarity
  - there is visible doc clutter in both repo root and `docs/`, which makes
    "where do I edit?" and "where is the truth?" harder than they should be

### AmpLab Firmware

- active product repo: `B:\ohmic\repos\amplab-firmware`
- remote: `Ohmicaudio/amplab-firmware`
- current branch: `amplab-live-status-carry-forward`
- status: clean
- launch posture:
  - firmware contract and transport work are active
  - branch integration and launch cutover posture are not yet simplified into a
    single launch-facing surface

### CYD Remote

- active product repo: `B:\ohmic\repos\cyd-remote`
- remote: `Ohmicaudio/cyd-remote`
- current branch: `remote-shared-runtime-core`
- status: clean
- launch posture:
  - startup and bring-up docs are stronger than Administrator
  - remote is still clearly in active integration rather than launch-final mode

## Findings

### 1. Missing administrator project overlay

Severity: high

Before this review, `ohmic-administrator` had no `agent-system/projects`
overlay, even though the umbrella startup rule expects one. That made
administrator onboarding less reliable than firmware onboarding.

Action in this review:

- added `B:\ohmic\agent-system\projects\ohmic-administrator.md`

### 2. Missing administrator repo-local AGENTS bridge

Severity: high

Before this review, `ohmic-administrator` had no repo-local `AGENTS.md`, while
the umbrella startup rule explicitly tells agents to read one when entering the
active repo. That made the startup funnel inconsistent across projects.

Action in this review:

- added `B:\ohmic\repos\ohmic-administrator\AGENTS.md`

### 3. Document-location rules were implicit, not obvious

Severity: medium

There was no clear in-repo statement telling operators where to put:

- product-local decision notes
- launch reviews
- cross-project roadmap docs

This makes it too easy to scatter launch and coordination notes inside product
repos or source folders.

Action in this review:

- added explicit document-location guidance to:
  - `B:\ohmic\repos\ohmic-administrator\AGENTS.md`
  - `B:\ohmic\repos\ohmic-administrator\README.md`

### 4. ohmic-audio-labs has better startup docs than Administrator did, but weaker launch clarity

Severity: high

`ohmic-audio-labs` already has:

- project overlay
- repo-local `AGENTS.md`
- quick-start and validation commands

But it also has:

- many repo-root docs and planning artifacts
- broad mixed ownership across web, backend, android, firmware remnants, and
  static-content transition surfaces
- a non-launch branch posture: `device-identity-schema-convergence`

That makes it the biggest "where is the real thing, and where should I edit?"
risk in the current launch picture.

Action in this review:

- added explicit document-location guidance to:
  - `B:\ohmic\repos\ohmic-audio-labs\AGENTS.md`
  - `B:\ohmic\repos\ohmic-audio-labs\README.md`

### 5. Firmware launch posture is ahead in documentation discipline but not yet unified

Severity: medium

Both `amplab-firmware` and `cyd-remote` have clearer startup bridges than
Administrator did, but they are still sitting on active integration branches:

- `amplab-live-status-carry-forward`
- `remote-shared-runtime-core`

That is workable during build-out, but it is not yet "launch-simple."

### 6. Board filtering is better, but launch steering is still mostly administrator-centric

Severity: medium

The system now steers `ohmic-administrator` work much better, but the umbrella
board still contains unrelated firmware and lab work in the same global `ready`
surface. That remains a launch-risk for casual operators unless project
filtering becomes the default user posture.

## Launch Priorities

### Priority 1

Make the startup/document/discoverability path boring and reliable.

- every active repo should have:
  - project overlay
  - repo-local `AGENTS.md`
  - clear "where docs go" guidance

### Priority 2

Choose the launch branch posture for web/backend/android and firmware/remote.

- decide what needs to merge or stabilize from:
  - `device-identity-schema-convergence`
  - `amplab-live-status-carry-forward`
  - `remote-shared-runtime-core`

### Priority 3

Define the launch-facing operator path.

Minimum clean story:

- Administrator:
  - intake
  - queue
  - approvals
  - runtime truth
- Ohmic Audio Labs:
  - web entry
  - backend entry
  - Android wrapper/smoke path
  - where product docs live versus where launch/system docs live
- Business Ops:
  - draft / reply / publish work
- Firmware / Remote:
  - one obvious startup + build + validation path per repo

### Priority 4

Make project-filtered board views the operator default.

Global umbrella board context should still exist, but launch-day operators
should not have to mentally filter unrelated project packets by hand.

## Recommended Next Steps

1. Add the same explicit document-location section to firmware/remote repo-local
   startup docs where needed.
2. Do a branch-to-launch review for:
   - `ohmic-audio-labs`
   - `amplab-firmware`
   - `cyd-remote`
3. Decide the minimum launch checklist per repo:
   - build
   - smoke
   - operator path
   - doc path
4. Keep cross-project launch reviews in `B:\ohmic\docs\roadmap\`.
