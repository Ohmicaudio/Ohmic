Status: inventory
Date: 2026-03-15

# Ohmic Hardware Control Subsystem Inventory

## Purpose

Inventory the combined hardware/control UI lane in `ohmic-audio-labs` so it
can be finished in slices instead of treated like one giant mixed hardware
blob.

## Snapshot

Repo:

- `B:\ohmic\repos\ohmic-audio-labs`

Primary surface:

- `components/Hardware`
- related touchpoints in `components/Mobile`, `components/Landing`,
  `components/Layout`
- related service layer in `services/hardware`

Current rough dirty shape:

- about `24` tracked changes in the targeted hardware/control surface
- about `43` untracked files, mostly new hosts, hooks, deck panels, and DSP
  support files

## Active Surface Families

## 1. Hardware shell and host decomposition

The untracked `components/Hardware/README.md` already describes the intended
split:

- shell and hosts
- device/deck surfaces
- orchestration hooks

This appears to be the dominant change pattern.

Key files in this family:

- `HardwareTopBar.tsx`
- `HardwareModalLayer.tsx`
- `DeckContentHost.tsx`
- `DesktopMeasureTopologyHost.tsx`
- `PhoneLabSurfaceHost.tsx`
- `HardwareDeckPanel.tsx`
- `DashLabDeck.tsx`
- `PhoneLabDeck.tsx`
- `SettingsDeck.tsx`
- `UniversalOverlayWorkspace.tsx`

Assessment:

- real architectural slice
- likely safest major unit if kept together
- should not be mixed with unrelated helper utilities

## 2. AmpLab control, discovery, and telemetry lane

This family groups the live control-plane behavior replacing older placeholder
surfaces.

Key files:

- `AmpLabAlertCenter.tsx`
- `AmpLabControlHost.tsx`
- `AmpLabControlSurfaces.tsx`
- `DeskLabNodeControls.tsx`
- `useAmpLabControlPlane.ts`
- `useAmpLabDiscoveryPlane.ts`
- `useAmpLabTelemetryStream.ts`
- `useStoredApiKeyAuth.ts`

Tracked companions:

- deletion of `AmpLabAlertCenterPlaceholder.tsx`
- deletion of `DeskLabNodeControlsPlaceholder.tsx`

Assessment:

- should be committed as one slice if taken
- placeholder deletions should stay bundled with the live replacements
- splitting those apart would make the lane harder to reason about

## 3. Measurement and instrument surfaces

This family covers the actual measurement/test UI bodies and their related
automation hooks.

Tracked files:

- `AudioTestSandbox.tsx`
- `DatsInstrument.tsx`
- `MasterPlot.tsx`
- `RtaAnalyzer.tsx`
- `SpectrumPlot.tsx`
- `components/Mobile/MobileDATS.tsx`
- `components/Mobile/MobileRTAView.tsx`
- `components/Mobile/AmpLabBleTestSuite.tsx`

Untracked hook family:

- `ActiveInstrumentHost.tsx`
- `MobileInstrumentHost.tsx`
- `useMeasureSmokeAutomation.ts`
- `useMeasureSmokeOrchestration.ts`
- `useMeasurementRunArtifacts.ts`
- `useMeasurementRunLifecycle.ts`
- `useDesktopMeasureControls.ts`
- `useDesktopPhoneCaptureOrchestration.ts`

Assessment:

- coherent slice, but broad
- should stay separate from the shell/deck extraction slice if possible
- likely a later second safe commit after the shell/control structure lands

## 4. DSP bridge and contract lane

The service layer shows a small but meaningful DSP contract expansion.

Key files:

- `services/hardware/dsp/index.ts`
- `services/hardware/dsp/firmwareContract.ts`
- `services/hardware/dsp/graphSurfaceManifest.ts`
- `components/Hardware/DspDeckSummary.tsx`
- `components/Hardware/useDspAppPresets.ts`
- `components/Hardware/useDspReadback.ts`

Assessment:

- should be kept together with the service export update
- small enough to be a distinct safe slice
- avoid mixing this with unrelated measurement UI churn

## 5. App-shell integration touchpoints

These appear to be entry-point and navigation hookups around the hardware lane.

Tracked files:

- `components/Landing/FeatureGateWorkspace.tsx`
- `components/Layout/Sidebar.tsx`
- `BrandingPanel.tsx`
- `SalesContent.tsx`

Assessment:

- important, but easy to over-bundle
- should be isolated from the core control-plane refactor unless the exact
  dependency is clear

## Things That Should Be Kept Together

- placeholder deletions with their live replacements
- host/deck shell files with the README/ownership split that explains them
- DSP manifest/contract files with `services/hardware/dsp/index.ts`
- mobile measurement wrappers with their instrument-host hooks if they now
  depend on them directly

## Things That Should Be Isolated Before Commit

- `BrandingPanel.tsx` and `SalesContent.tsx`
  - these feel adjacent to shell framing but are easy to turn into UI-noise
    hitchhikers
- `components/Mobile/SubwooferWiringHelper.tsx`
  - not obviously a hardware-control lane change
- `components/Mobile/TimeAlignmentHelper.tsx`
  - likely belongs to a separate utility/pro-helper lane
- `FeatureGateWorkspace.tsx` and `Sidebar.tsx`
  - app-shell integration should not silently ride along unless the hardware
    shell actually needs them in the same commit

## Likely Safe Next Commit Slices

### Slice 1: Hardware shell/deck extraction

Target:

- new host, deck, modal, and top-bar files
- `components/Hardware/README.md`
- minimal tracked companions that make the shell compile

Why:

- strongest architecture boundary
- explains most of the untracked file burst
- easiest to reason about as one intentional refactor

### Slice 2: AmpLab control-plane replacement

Target:

- alert center replacement
- desk-lab node controls replacement
- AmpLab control/discovery/telemetry hooks

Why:

- clear old-to-new replacement story
- keeps placeholder retirement paired with real surfaces

### Slice 3: DSP contract and graph surface support

Target:

- `services/hardware/dsp/*` contract/manifest additions
- related hardware DSP readback/preset helpers

Why:

- small
- cohesive
- lower blast radius than the full measurement lane

### Slice 4: Measurement/instrument lane

Target:

- DATS/RTA/spectrum/plot surfaces
- instrument hosts
- measurement-run hooks

Why:

- coherent, but larger
- should probably follow after the shell/control split is under control

## Freeze / Triage Later

- mobile helper tools not clearly tied to the hardware-control refactor
- broader shell-adjacent marketing/UI files unless their dependency is proven
- anything outside `components/Hardware` and `services/hardware` that looks
  like convenience bundling rather than subsystem ownership

## Final Call

This subsystem is not one commit.

The cleanest interpretation is:

- shell/deck extraction
- AmpLab control-plane replacement
- DSP contract/manifest support
- measurement/instrument surfaces

as separate lanes, with app-shell integration and stray mobile helpers kept
out unless they are truly required by the slice.
