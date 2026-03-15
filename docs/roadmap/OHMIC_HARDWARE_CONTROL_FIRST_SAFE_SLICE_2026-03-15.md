Status: implementation_packet
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Hardware Control First Safe Slice

## Purpose

Turn the hardware/control inventory into one first executable shell/deck slice
that matches the current dirty tree instead of the earlier broader shell plan.

## First Slice Decision

The first slice should focus on deck and host composition only:

- new deck bodies
- new deck/host composition files
- the minimum tracked shell companions needed to render those hosts cleanly

Do not open control-plane, transport, measurement lifecycle, or DSP service work
in this packet.

## Include In This Slice

### New deck and host files

- `components/Hardware/DashLabDeck.tsx`
- `components/Hardware/DeckContentHost.tsx`
- `components/Hardware/DesktopMeasureTopologyControls.tsx`
- `components/Hardware/DesktopMeasureTopologyHost.tsx`
- `components/Hardware/PhoneLabDeck.tsx`
- `components/Hardware/PhoneLabDeckHost.tsx`
- `components/Hardware/PhoneLabSurfaceHost.tsx`
- `components/Hardware/SettingsDeck.tsx`

### Minimal tracked shell companions allowed in the same commit

- `components/Hardware/DeviceInputsPanel.tsx`
- `components/Hardware/DeviceModals.tsx`
- `components/Hardware/DeviceViews.tsx`
- `components/Hardware/DspControlStrip.tsx`
- `components/Hardware/HubInputsPanel.tsx`
- `components/Hardware/README.md`

These tracked companions are only in-bounds if they are required to wire the
new host/deck files into the visible shell. If one of them drifts into device
logic or protocol work, split it back out.

## Why This Slice First

- this is the strongest architecture boundary in the current dirty tree
- the files tell one story: split `HardwareLayout` into named deck/host
  surfaces without claiming the deeper control plane is settled
- it avoids mixing host extraction with AmpLab discovery, telemetry, DSP
  contracts, or measurement automation
- it matches the current actual dirty files better than the earlier
  presentation-hook-only packet

## Explicitly Out Of Scope

- `components/Hardware/ActiveInstrumentHost.tsx`
- `components/Hardware/AmpLabAlertCenter.tsx`
- `components/Hardware/AmpLabControlHost.tsx`
- `components/Hardware/AmpLabControlSurfaces.tsx`
- `components/Hardware/DesktopMicCalibrationCard.tsx`
- `components/Hardware/DspDeckSummary.tsx`
- `components/Hardware/MobileInstrumentHost.tsx`
- `components/Hardware/useAmpLabDiscoveryPlane.ts`
- `components/Hardware/useAmpLabTelemetryStream.ts`
- `components/Hardware/useBrowserAudioMonitor.ts`
- `components/Hardware/useDesktopMeasureControls.ts`
- `components/Hardware/useDesktopPhoneCaptureOrchestration.ts`
- `components/Hardware/useDspAppPresets.ts`
- `components/Hardware/useDspReadback.ts`
- `components/Hardware/useHardwareSourceRouting.ts`
- `components/Hardware/useHardwareSyncPlane.ts`
- `components/Hardware/useHardwareSyncSummaries.ts`
- `components/Hardware/useMeasureSmokeAutomation.ts`
- `components/Hardware/useMeasureSmokeOrchestration.ts`
- `components/Hardware/useMeasurementRunArtifacts.ts`
- `components/Hardware/useMeasurementRunLifecycle.ts`
- `components/Hardware/useRemoteSessionFrame.ts`
- `components/Hardware/useRemoteSessionRouting.ts`
- `components/Hardware/useStoredApiKeyAuth.ts`
- Android wrapper files
- `services/hardware/*`
- `components/Landing/*`
- `components/Layout/*`
- `components/Mobile/*`
- `BrandingPanel.tsx`
- `SalesContent.tsx`
- placeholder deletions and AmpLab live replacements

## Keep Out Unless Proven Necessary

- `components/Hardware/AmpLabCustomizerModal.tsx`
- `components/Hardware/HardwareDeckPanel.tsx`
- `components/Hardware/HardwareModalLayer.tsx`
- `components/Hardware/HardwareTopBar.tsx`
- `components/Hardware/UniversalOverlayWorkspace.tsx`

These may be adjacent to the shell, but they should not ride along
automatically. Pull them in only if the host/deck files fail to compile or
render without them.

## Verification

At minimum:

- run `npm run build` in `B:\ohmic\repos\ohmic-audio-labs`
- do one honest hardware-route smoke pass with the shell rendering:
  - deck host mounts
  - deck switching does not explode immediately
  - no new missing-import or undefined-host errors appear in the console

Do not pretend root `type-check` or full-repo lint is a clean gate for this
slice. Record the actual narrower validation used.

## Finish Condition

- one bounded hardware shell/deck slice lands
- the commit is mostly new host/deck files plus the smallest necessary tracked
  companions
- service-heavy bridge work stays out
- the result is ready for a later AmpLab control-plane or DSP bridge slice
