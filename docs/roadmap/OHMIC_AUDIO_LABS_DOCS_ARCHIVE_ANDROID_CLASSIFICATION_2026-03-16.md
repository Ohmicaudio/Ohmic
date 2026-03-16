# Ohmic Audio Labs Docs Archive And Android Classification

Date: 2026-03-16
Project: ohmic-audio-labs

## Purpose

Turn the broad `docs/*`, `archive/*`, and `android/*` wave in
`ohmic-audio-labs` into explicit keep, freeze, or reopen buckets so
documentation truth work stops competing with active product surfaces.

## Core Rule

These three domains should not be treated as one shared dirt pile.

They serve different roles:

- `docs/*` contains a mix of live source truth and large deferred-spec churn
- `archive/*` is mostly nonproduct historical baggage
- `android/*` is a platform wrapper boundary with mostly frozen or generated
  behavior

## Domain Summary

Current worktree snapshot:

- `docs/*`: heavy dirty wave, about `71` status entries
- `archive/*`: small wave, about `3` status entries
- `android/*`: no active tracked dirt, but significant ignored/generated local
  exhaust

## Docs Classification

### Keep As Live Truth

These docs should stay source-visible and can be updated when tightly tied to
active product work:

- `docs/AGENT_CONTEXT.md`
- `docs/README.md`
- `docs/repository-map.md`
- `docs/subsystem-index.md`
- active product and backend contract docs under `docs/specs/**`
- active ADRs under `docs/specs/adr/**`
- active runtime/editor and DSP spec lanes that match current product work

Reason:

- these files still guide real product or system behavior

### Freeze By Default

Freeze unless an active implementation packet specifically needs them:

- broad historical planning docs
- old payload-boundary notes already superseded by migration decisions
- long-tail speculative specs not tied to an active product lane

Examples already showing this pattern:

- deleted transitional public payload notes
- older broad planning surfaces that are no longer the active source of truth

### Reopen As Separate Truth Sweep

Reopen under dedicated docs packets rather than mixing them into product work:

- broad spec churn across `docs/specs/**`
- DSP/UI research additions under `docs/specs/dsp-ui/**`
- large new DSP firmware research/spec packets
- `docs/specs/ui-runtime/**` exploratory additions

Reason:

- these are too wide to ride along with runtime implementation safely

## Archive Classification

### Freeze By Default

Freeze these domains unless a task explicitly calls for historical salvage:

- `archive/legacy-apps/**`
- `archive/lvgl_display/**`
- `archive/esp32round128/**`

Reason:

- historical or legacy value exists, but they should not compete with active
  product surfaces

### Keep Visible But Nonproduct

Keep visible for reference, but do not treat as active implementation lanes:

- `archive/README.md`
- `archive/root_platformio.ini`

### Reopen Only Under Targeted Recovery Packets

Do not let these spill into active implementation by default:

- `archive/generated-artifacts/**`
- `archive/temp-fixtures/**`

Reason:

- these are recovery or classification targets, not live product sources

## Android Classification

### Keep As Frozen Platform Wrapper Truth

Keep visible:

- `android/build.gradle`
- `android/settings.gradle`
- `android/gradle.properties`
- `android/app/**` source wrapper structure

Reason:

- this is still platform source truth when Android wrapper work is explicitly in
  scope

### Freeze By Default

Do not let Android wrapper work compete with current active product packets
unless specifically requested.

Reason:

- there is no current tracked Android change wave in `git status`
- the wrapper is a separate platform domain from active product surfaces

### Ignore Or Treat As Generated Local Exhaust

The following are local or generated and should not be mistaken for active
source work:

- `android/.gradle/**`
- `android/app/build/**`
- `android/build/**`
- `android/capacitor-cordova-android-plugins/**`
- `android/local.properties`
- `android/app/src/main/assets/**`

Reason:

- current status shows them as ignored/generated local exhaust, not tracked
  implementation truth

## Next-State Buckets

### Keep

- active source-truth docs tied to product behavior
- frozen Android wrapper source files
- minimal archive metadata files

### Freeze

- most archive surfaces
- Android wrapper work unless explicitly reopened
- broad speculative or historical docs not tied to current product lanes

### Reopen Under Dedicated Packets

- broad docs-truth sweeps
- DSP/UI exploratory spec clusters
- archive salvage or fixture recovery
- Android wrapper changes when a real product packet needs them

## Recommended Follow-On Order

1. keep active product implementation inside the isolated product surfaces
2. handle docs-truth work through dedicated doc packets
3. keep archive frozen unless a salvage task explicitly reopens it
4. keep Android frozen except for explicit mobile/wrapper packets

## Outcome

After this classification:

- `docs/*` stops competing with product work as one giant mixed wave
- `archive/*` is recognized as frozen historical terrain
- `android/*` is recognized as a separate platform wrapper with mostly ignored
  local exhaust rather than an active dirty implementation lane
