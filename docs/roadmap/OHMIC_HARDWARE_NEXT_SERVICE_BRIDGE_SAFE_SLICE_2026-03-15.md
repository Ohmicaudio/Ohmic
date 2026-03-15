Status: implementation_packet
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Hardware Next Service Bridge Safe Slice

## Purpose

Define the next bounded hardware/control implementation slice after the shell
host wave.

## Recommended Next Slice

Take an AmpLab control bridge slice that connects the new hardware shell hosts
to a narrow live-control service contract.

This should be the first bridge between the new shell and the underlying
AmpLab control plane, not a broad hardware-services rewrite.

## Exact Candidate Files

### Hardware-side bridge files

- `components/Hardware/AmpLabControlHost.tsx`
- `components/Hardware/AmpLabControlSurfaces.tsx`
- `components/Hardware/useAmpLabControlPlane.ts`

### Narrow supporting service contract

- `services/hardware/amplab/AmpLabSessionManager.ts`
- `services/hardware/amplab/commandPolicy.ts`
- `services/hardware/amplab/types.ts`

## Why This Slice Next

- these files form a coherent host-to-control bridge
- they are more bounded than dragging in discovery, telemetry, BLE, transport,
  and DSP lanes at the same time
- they line up with the new shell host work already landed
- they create a cleaner second hardware wave than grabbing all remaining
  `services/hardware/*` churn

## Explicitly Out Of Scope

- `components/Hardware/useAmpLabDiscoveryPlane.ts`
- `components/Hardware/useAmpLabTelemetryStream.ts`
- `components/Hardware/useHardwareSyncPlane.ts`
- `components/Hardware/useHardwareSyncSummaries.ts`
- `components/Hardware/useMeasurementRunLifecycle.ts`
- `components/Hardware/useMeasurementRunArtifacts.ts`
- `components/Hardware/useMeasureSmokeOrchestration.ts`
- `components/Hardware/useMeasureSmokeAutomation.ts`
- `components/Hardware/useRemoteSessionFrame.ts`
- `components/Hardware/useRemoteSessionRouting.ts`
- `components/Hardware/useDesktopPhoneCaptureOrchestration.ts`
- `components/Hardware/useDesktopMeasureControls.ts`
- `components/Hardware/useBrowserAudioMonitor.ts`
- `components/Hardware/useStoredApiKeyAuth.ts`
- `services/hardware/amplab/AmpLabBleProvisioner.ts`
- `services/hardware/amplab/DeviceRegistry.ts`
- `services/hardware/amplab/Esp32S3AmpLabAdapter.ts`
- `services/hardware/amplab/transports/*`
- all `services/hardware/dsp/*`
- all Android wrapper files

## Verification

Truthful verification for the eventual implementation should stay narrow:

1. run the best available hardware slice check floor in the correct shell
2. verify imports/build coverage for the touched host/control files
3. if no narrow trusted check exists yet, record that plainly instead of
   pretending repo-wide commands bless the slice

## Finish Condition

- the next hardware slice is clearly named and bounded
- it does not reopen the whole hardware/control subsystem
- the next ready task can point at one concrete AmpLab control bridge
