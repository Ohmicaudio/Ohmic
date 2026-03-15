Status: implementation_packet
Date: 2026-03-15
Project: ohmic-audio-labs

# Ohmic Hardware Next Discovery Telemetry Safe Slice

## Purpose

Define the next truthful hardware/control slice after the AmpLab control bridge
and its direct component coverage have both landed.

## Recommended Next Slice

Take an AmpLab discovery-and-telemetry plane slice that wires the hardware UI
to discovered units, auth-aware registry URLs, and live telemetry state without
opening BLE provisioning or low-level transport internals.

## Exact Candidate Files

### Hardware-side hooks

- `components/Hardware/useAmpLabDiscoveryPlane.ts`
- `components/Hardware/useAmpLabTelemetryStream.ts`

### Narrow supporting service/auth edges

- `services/hardware/amplab/DeviceRegistry.ts`
- `services/hardware/amplab/transports/auth.ts`

## Why This Slice Next

- it follows naturally after the host/control bridge is in place
- it forms one coherent runtime story: discover device endpoints, resolve auth,
  connect telemetry, and keep session state alive
- it is more bounded than reopening:
  - BLE provisioning
  - adapter/device internals
  - websocket/http transport implementations
  - broader measurement orchestration hooks

## Explicitly Out Of Scope

- `services/hardware/amplab/AmpLabBleProvisioner.ts`
- `services/hardware/amplab/AmpLabDevice.ts`
- `services/hardware/amplab/AmpLabSessionManager.ts`
- `services/hardware/amplab/Esp32S3AmpLabAdapter.ts`
- `services/hardware/amplab/schema.ts`
- `services/hardware/amplab/transports/HttpAmpLabTransport.ts`
- `services/hardware/amplab/transports/WebSocketAmpLabTransport.ts`
- `components/Hardware/useMeasureSmokeOrchestration.ts`
- `components/Hardware/useMeasureSmokeAutomation.ts`
- `components/Hardware/useMeasurementRunLifecycle.ts`
- `components/Hardware/useMeasurementRunArtifacts.ts`
- `components/Hardware/useDesktopPhoneCaptureOrchestration.ts`
- `components/Hardware/useDesktopMeasureControls.ts`
- Android wrapper files

## Verification

For the eventual implementation slice:

1. run the best narrow hardware tests available for the touched discovery/telemetry files
2. if no direct tests exist yet, record the exact gap rather than widening into repo-wide checks
3. confirm the bridge and its direct tests still pass after the discovery/telemetry additions

## Finish Condition

- one clear next hardware slice packet exists
- it follows the landed bridge work honestly
- the hardware lane stays bounded around discovery and telemetry rather than sprawling into every remaining hardware file
