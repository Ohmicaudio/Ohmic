# Ohmic Audio Labs Rebuildable Dependency Purge Wave

Date: 2026-03-16
Project: ohmic-audio-labs

## Purpose

Define the later purge wave for rebuildable dependency and build-output dirt so
it can be removed as junk without competing with source-visible cleanup.

## In-Scope Rebuildable Dirt

### Untracked Rebuildable Output

- `dist/**`
- `node_modules/**`
- `products/ohmic-osm/apps/osm-web/dist/**`
- `products/ohmic-osm/apps/osm-web/node_modules/**`
- `products/ohmic-osm/node_modules/**`
- `products/ohmic-osm/packages/**/node_modules/**`
- `products/ohmic-osm/workers/osm-api/node_modules/**`
- `services/backend/dist/**`
- `services/backend/node_modules/**`

### Ignored Rebuildable Output Already Behaving Like Junk

- `apps/ohmic-toolbox/dist/**`
- `apps/ohmic-toolbox/node_modules/**`
- `docs/specs/dsp-ui/sigma-dsp-web-controller/dist/**`
- `docs/specs/dsp-ui/sigma-dsp-web-controller/node_modules/**`
- `labs/lvgl-gauge-lab/node_modules/**`

## Explicit Out Of Scope

Do not mix into this wave:

- source-visible code and docs
- `services/backend/storage/**`
- `index/**`
- `services/ui-runtime/generated/**`
- Android wrapper exhaust
- local-only retained evidence already moved under `B:\\ohmic-local\\*`

## Why This Wave Is Separate

Rebuildable dependency and dist cleanup is safe in principle, but noisy in
practice:

- it can be large
- it can interrupt active local dev loops
- it can hide whether source cleanup actually reduced repo truth debt

So it should run after source-visible and retention lanes are isolated.

## Execution Order

1. verify source-visible cleanup lanes are already packaged
2. verify no active local session needs the target installs or build output
3. purge the rebuildable directories
4. rerun only the minimum rebuild commands for the active product surfaces

## Suggested Rebuild Commands

After purge, rebuild only the active surfaces that matter:

- root install for active web shell
- `npm run osm:install` and `npm run osm:build`
- backend install/build if backend work is live
- toolbox install/build if toolbox work is live

Do not blindly reinstall every historical or experimental subproject.

## Verification

Before purge:

- snapshot `git status --short --ignored`
- confirm purge targets are rebuildable and not source

After purge:

- rebuildable target paths disappear from repo status
- no source-visible files are removed
- chosen active product surfaces can be rebuilt on demand

## Outcome

This wave turns rebuildable install/build dirt into a bounded cleanup task
instead of letting it obscure source-visible review.
