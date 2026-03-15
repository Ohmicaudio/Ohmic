Status: pickup note
Date: 2026-03-15

# Ohmic Toolbox Surface Pickup

## Purpose

Capture the current `ohmic-toolbox` surface so another agent can pick it up
without re-discovering the app shape.

## Current Live Panels

- `Wiring Lab`
- `Box Volume`
- `Wire Gauge`
- `Acoustic Gain`
- `Ohm's Law`
- `Cone Area`

## Shared Math Dependencies

Primary shared source:

- `B:\ohmic\repos\ohmic-audio-labs\utils\toolboxMath.ts`

Current shared math lanes in use:

- `calculateWiringResult`
- `calculateBoxResult`
- `calculateWireGaugeResult`
- `calculateAcousticGainResult`
- `calculateElectricalResult`
- `calculateConeAreaResult`

Supporting files:

- `utils/toolboxMath.fixtures.ts`
- `test/utils/toolboxMath.test.ts`
- `apps/ohmic-toolbox/src/calculators.ts`

## Current Trust Model

Trusted checks for this surface:

```bash
cd /mnt/b/ohmic/repos/ohmic-audio-labs/apps/ohmic-toolbox
npm run test
npm run build
```

Add this when shared math changed:

```bash
cd /mnt/b/ohmic/repos/ohmic-audio-labs
npx vitest run test/utils/toolboxMath.test.ts
```

## Current Boundaries

- `Ohm's Law` is the generic electrical solver
- `Wiring Lab` owns the smarter speaker load and amp-match lane
- `Cone Area` is a comparison/support helper, not a full design workflow
- `Acoustic Gain` is a simple upgrade-comparison helper, not a full acoustic
  prediction engine

## Current Branch Reality

The toolbox wave currently lives on:

- `measurement/local-input-normalization`

The toolbox-critical paths are presently durable on that branch, even though
the wider repo is still heavily dirty.

## Next Obvious Extension Points

### 1. Smarter Wiring Lab

- fit classes
- explanation blocks
- amp-target presets

### 2. Standalone Ohm's Law extraction packet

- route
- copy role
- CTA flow

### 3. Future calculator expansion

Only after the current toolbox surface stays stable.

Good next candidates remain:

- stronger `Wiring Lab`
- later public extraction work

not:

- a giant calculator dump

## Pickup Rule

If picking up this surface:

- do not re-implement formulas locally
- keep panel-level work isolated
- verify with toolbox-local checks
- do not merge `Ohm's Law` into `Wiring Lab`
