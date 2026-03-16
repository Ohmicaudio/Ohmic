Status: implementation_packet
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic OSM And Design Sandbox Regrouping Wave

## Purpose

Rebuild the next truthful grouped packet for the dirty `products` lane so OSM
and its adjacent design-sandbox support surfaces can move again without falling
back to stale one-file tasking or accidentally scooping generated noise.

## Current Honest State

### OSM product lane

Current `products/ohmic-osm` worktree read:

- no tracked source edits in `products/ohmic-osm`
- untracked noise only:
  - `apps/osm-web/dist/`
  - `node_modules/` under the workspace root, packages, and worker

That means OSM is not currently a live dirty-code lane. It is a clean product
surface surrounded by disposable install/build output.

### Design sandbox support lane

There is one real tracked support-surface edit outside `products/`:

- `components/DesignSandbox/StitchPreview.tsx`

That diff is small and truthful:

- one shell background token change from hard-coded `#0a0a0a` to `bg-surface`

### Local lab lane

There is also a large untracked local lab subtree:

- `labs/lvgl-gauge-lab/**`

This is not part of the OSM product lane and should not be allowed to ride
along with OSM or design-sandbox work by accident.

## Regrouping Decision

Treat the next lane as three separate classes:

1. active OSM app-shell work
2. active design-sandbox support work
3. frozen/generated/local-lab noise

Do not treat `products/*` plus `components/DesignSandbox/*` plus `labs/*` as
one giant dirty subsystem just because they all sit under the same repo root.

## Active Grouped Lanes

## 1. OSM Shell And Panel Composition Wave

This is the next real grouped OSM product packet.

Candidate file family:

- `products/ohmic-osm/apps/osm-web/src/components/TopBar.tsx`
- `products/ohmic-osm/apps/osm-web/src/components/VehicleSelector.tsx`
- `products/ohmic-osm/apps/osm-web/src/components/LeftPanel.tsx`
- `products/ohmic-osm/apps/osm-web/src/components/RightPanel.tsx`
- `products/ohmic-osm/apps/osm-web/src/components/VehicleLayout.tsx`
- `products/ohmic-osm/apps/osm-web/src/components/LibraryPanel.tsx`

Why this belongs together:

- these files define editor-shell chrome, side panels, and shell composition
- they can move as one bounded OSM app packet without widening into package or
  worker churn
- they are the natural grouped follow-on after the earlier one-file shell
  slices

## 2. OSM Workflow And Status Support Wave

This should remain a separate OSM packet, not folded into shell composition by
default.

Candidate file family:

- `products/ohmic-osm/apps/osm-web/src/components/BuildChecklist.tsx`
- `products/ohmic-osm/apps/osm-web/src/components/TelemetryLog.tsx`
- `products/ohmic-osm/apps/osm-web/src/components/EquipmentManager.tsx`
- `products/ohmic-osm/apps/osm-web/src/components/InspectorPanel.tsx`

Why this is separate:

- it is closer to workflow/status and editor-adjacent detail state than to pure
  shell framing
- it is more likely to widen into deeper state assumptions than the shell
  packet

## 3. Design Sandbox Support Slice

Treat the design sandbox as a support lane, not as an OSM product commit.

Candidate file family:

- `components/DesignSandbox/StitchPreview.tsx`
- `docs/STITCH_QUICKSTART.md`
- `docs/STITCH_WORKFLOW.md`

Why this is separate:

- it supports UI/design iteration across the repo
- it is not part of `products/ohmic-osm`
- its current truthful diff is tiny and should stay easy to commit alone

## Explicit Freeze Boundary

Keep these out of the regrouped wave unless a task explicitly targets them:

- `products/ohmic-osm/**/dist/`
- `products/ohmic-osm/**/node_modules/`
- `labs/lvgl-gauge-lab/**`
- `products/ohmic-osm/apps/osm-web/src/components/CanvasView.tsx`
- `products/ohmic-osm/apps/osm-web/src/components/PortHelpers.ts`
- `products/ohmic-osm/packages/**`
- `products/ohmic-osm/workers/**`

Reason:

- `dist/` and `node_modules/` are generated/install noise
- `labs/lvgl-gauge-lab` is a local lab lane
- canvas, helpers, packages, and worker surfaces widen into a different class
  of work than shell regrouping

## Verification Shape

For any OSM implementation packet that comes out of this regrouping wave, keep
the minimum check set bounded:

- `pnpm --dir products/ohmic-osm build`
- `pnpm --dir products/ohmic-osm test`

For the design-sandbox support slice, use the smallest truthful check:

- local render/smoke of the touched sandbox surface
- do not reopen OSM build/test if the change stays outside `products/ohmic-osm`

## Next Ready Packets

The next queue should stay grouped but narrow:

1. `implement OSM shell and panel composition wave`
2. `implement OSM workflow and status support wave`
3. `normalize design sandbox stitch support surface`

## Finish Condition

- the next grouped OSM packet is obvious again
- design sandbox support work has its own bounded lane
- generated/install and local-lab noise stay frozen out
