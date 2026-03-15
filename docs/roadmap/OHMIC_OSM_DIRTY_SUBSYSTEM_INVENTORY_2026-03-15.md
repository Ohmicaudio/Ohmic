Status: inventory
Date: 2026-03-15

# Ohmic OSM Dirty Subsystem Inventory

## Purpose

Inventory the dirty `products/ohmic-osm` subsystem so it can be treated as one
contained product lane instead of generic repo churn.

## Snapshot

Repo surface:

- `B:\ohmic\repos\ohmic-audio-labs\products\ohmic-osm`

Current rough dirty shape:

- `7` tracked source changes
- `11` untracked paths, all of which are `dist/` or `node_modules/` style
  build/install noise

## What Is Actually Active

The real source edits are tightly concentrated in the web app surface:

- `apps/osm-web/src/components/BuildChecklist.tsx`
- `apps/osm-web/src/components/CanvasView.tsx`
- `apps/osm-web/src/components/EquipmentManager.tsx`
- `apps/osm-web/src/components/InspectorPanel.tsx`
- `apps/osm-web/src/components/TelemetryLog.tsx`
- `apps/osm-web/src/components/TopBar.tsx`
- `apps/osm-web/src/components/VehicleSelector.tsx`

That means the dirty subsystem is currently:

- mostly `osm-web` UI/editor work

not:

- packages-wide schema churn
- workers API churn
- integrations/storage/test package churn

## What Is Not Real Product Churn

The untracked paths are dominated by disposable install/build material:

- `apps/osm-web/dist/`
- top-level `node_modules/`
- package-level `node_modules/`
- worker-level `node_modules/`

Assessment:

- this is cleanup noise, not meaningful source work
- it should not be used to judge the real scope of the OSM lane

## Active Surface Families

## 1. Editor shell and navigation

Files:

- `TopBar.tsx`
- `VehicleSelector.tsx`

Assessment:

- likely shell-level entry controls
- safe to keep together if they share state and routing assumptions

## 2. Core canvas and inspection lane

Files:

- `CanvasView.tsx`
- `InspectorPanel.tsx`
- `EquipmentManager.tsx`

Assessment:

- appears to be the core interactive planning/editor surface
- strongest candidate for a coherent next commit slice

## 3. Workflow/status support surfaces

Files:

- `BuildChecklist.tsx`
- `TelemetryLog.tsx`

Assessment:

- likely secondary support surfaces around the editor
- should probably be committed with the editor slice only if they depend on the
  same state changes

## What Looks Safe To Commit Next

### Best candidate

One focused `osm-web` UI/editor slice covering:

- `CanvasView.tsx`
- `InspectorPanel.tsx`
- `EquipmentManager.tsx`
- any tightly coupled shell files such as `TopBar.tsx` or `VehicleSelector.tsx`

Why:

- all tracked source edits are in the same app
- no evidence of simultaneous package or worker contract churn
- easiest place to reason about intent and testability

### Possible second slice

Support/status UI:

- `BuildChecklist.tsx`
- `TelemetryLog.tsx`

Why:

- smaller adjunct surface
- may be separable if it is not deeply coupled to the editor refactor

## What Should Be Frozen Or Triaged Later

- `dist/`
- all `node_modules/` paths
- any package/worker changes that are not currently present in the dirty set

Do not let OSM cleanup balloon into workspace hygiene across the entire package
tree just because the monorepo-style workspace layout looks large.

## Final Call

`products/ohmic-osm` is currently a much narrower dirty subsystem than it first
appears.

The real active lane is:

- `apps/osm-web` component work

The rest is mostly generated/install noise and should be treated as cleanup,
not product scope.
