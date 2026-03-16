# Ohmic Audio Labs Source-Visible Product Surface Cleanup Wave

Date: 2026-03-16
Project: ohmic-audio-labs

## Purpose

Package the next cleanup wave across tracked active product surfaces so real
source work can be reviewed without mixing in rebuildable junk, local evidence,
or exploratory nonproduct domains.

## In-Scope Source-Visible Product Surfaces

### Components

Tracked modifications and deletions across:

- `components/Hardware/**`
- `components/Mobile/**`
- `components/Layout/**`
- `components/Modals/**`
- `components/Shared/**`
- `components/Tabs/**`
- `components/Visualizations/**`
- selected `components/Education/**` and `components/Report/**`

This is the heaviest active source-visible cleanup surface.

### Services

Tracked modifications across:

- `services/backend/README.md`
- `services/hardware/dsp/index.ts`
- `services/measurementCaptureAssets.ts`
- `services/measurementIngest.ts`
- `services/measurementRunController.ts`
- `services/measurementRunPlan.ts`
- `services/micCalibrationLibrary.ts`

Plus untracked source-visible service additions such as:

- `services/browserTabRole.ts`
- `services/linkDeviceOrigins.ts`
- `services/measurementIdentity.ts`
- `services/ui-runtime/**` source files
- `services/hardware/dsp/*.ts` source additions

### Contracts, Tests, And Support Truth

- `schemas/contracts.manifest.v1.json`
- untracked `schemas/examples/**`
- untracked `schemas/dsp.firmware.transport.v1.schema.json`
- `test/components/**`
- `test/services/**`
- `test/utils/**`
- `utils/api.ts`
- `utils/enclosureGenerator.*.ts`
- untracked `scripts/**` source tooling

## Explicit Hold-Outs

Do not mix into this packet:

- `node_modules/**`
- `dist/**`
- `services/backend/storage/**`
- `index/**`
- `docs/**`
- `archive/**`
- `android/**`
- `research/**`
- `knowledge/**`
- `site/**`
- `content-work/**`

These are already covered by separate cleanup or classification lanes.

## Cleanup Packet Shape

The first source-visible product cleanup wave should:

1. separate tracked deletions from tracked modifications
2. bucket active product code into:
   - hardware shell lane
   - measurement/backend lane
   - mobile/supporting shell lane
3. keep untracked but source-visible additions visible instead of hiding them
   behind junk cleanup

## Suggested Review Order

### 1. Hardware Shell And Measurement Surface

Highest priority because the largest tracked churn sits under:

- `components/Hardware/**`
- `services/measurement*.ts`
- related `test/services/**`

### 2. Mobile And Shared Shell

- `components/Mobile/**`
- `components/Shared/**`
- `components/Layout/**`
- `components/Modals/**`

### 3. Contract And Schema Support

- `schemas/**`
- `scripts/**`
- `utils/**`
- support tests

## Outcome

This packet turns the active product-source dirt into a real cleanup wave
instead of leaving it buried under generated churn and local runtime clutter.
