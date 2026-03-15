Status: state model
Date: 2026-03-15

# Ohmic Wiring Lab UI State Model

## Purpose

Translate the current `Wiring Lab` rules and implementation packet into a
concrete UI/state model for the first smart version.

This is still one step before actual UI build work.

## Top-Level State Shape

Recommended top-level state:

```ts
interface WiringLabState {
  input: WiringLabInputState;
  preset: AmpTargetPresetKey | null;
  result: WiringLabResultState | null;
}
```

## Input State

```ts
type VoiceCoilType = 'SVC' | 'DVC' | 'QVC';
type WiringMethod = 'series' | 'parallel';
type AmpMode = 'mono' | 'bridged' | 'stereo';

interface WiringLabInputState {
  subCount: number;
  voiceCoilType: VoiceCoilType;
  coilImpedanceOhms: number;
  wiringMethod: WiringMethod;
  ampMode: AmpMode;
  ampTargetMinLoadOhms: number;
  ampPreferredLoadOhms?: number | null;
}
```

## Preset Model

```ts
type AmpTargetPresetKey =
  | 'mono_1'
  | 'mono_2'
  | 'mono_4'
  | 'bridged_4'
  | 'stereo_2'
  | 'stereo_4'
  | 'custom';

interface AmpTargetPreset {
  key: AmpTargetPresetKey;
  label: string;
  ampMode: AmpMode;
  ampTargetMinLoadOhms: number;
  ampPreferredLoadOhms: number | null;
}
```

## Result State

```ts
type WiringFitClass = 'good_match' | 'usable_but_awkward' | 'unsafe_or_poor_fit';

interface WiringLabResultState {
  finalLoadOhms: number;
  fitClass: WiringFitClass;
  fitReasonCode: WiringFitReasonCode;
  explanation: WiringLabExplanation;
  suggestion: WiringLabSuggestion | null;
}
```

## Fit Reason Codes

Use explicit reason codes instead of free text:

```ts
type WiringFitReasonCode =
  | 'matches_preferred_target'
  | 'safe_matches_minimum_target'
  | 'safe_but_above_preferred_target'
  | 'safe_but_high_load_underuse'
  | 'safe_but_oddball_load'
  | 'below_minimum_target'
  | 'bridged_below_minimum_target';
```

## Explanation Object

```ts
interface WiringLabExplanation {
  whatHappened: string;
  fitExplanation: string;
  nextStep: string | null;
  warning: string | null;
}
```

This keeps the UI simple:

- one factual line
- one fit line
- optional next-step line
- optional warning line

## Suggestion Model

```ts
type WiringSuggestionKind =
  | 'change_wiring_method'
  | 'change_voice_coil_option'
  | 'change_sub_count'
  | 'change_amp_target';

interface WiringLabSuggestion {
  kind: WiringSuggestionKind;
  label: string;
  reason: string;
}
```

Only one primary suggestion should be emitted in v1.

## UI Blocks Mapped To State

### Input block

Consumes:

- `input`
- `preset`

### Final load block

Consumes:

- `result.finalLoadOhms`

### Fit badge block

Consumes:

- `result.fitClass`

### Explanation block

Consumes:

- `result.explanation`

### Suggestion block

Consumes:

- `result.suggestion`

## First Calculation Flow

1. user edits `input` or selects `preset`
2. system derives effective amp target values
3. system calculates `finalLoadOhms`
4. system assigns `fitClass` and `fitReasonCode`
5. system generates `explanation`
6. system generates zero or one `suggestion`

## First Validation Rules

The UI should reject or correct:

- `subCount < 1`
- `coilImpedanceOhms <= 0`
- `ampTargetMinLoadOhms <= 0`
- `ampPreferredLoadOhms <= 0` when provided

The UI should not allow:

- empty amp mode
- empty wiring method
- empty voice coil type

## V1 Simplicity Rules

Do not add to the state model yet:

- amplifier brand/model database keys
- power prediction objects
- thermal estimates
- enclosure assumptions
- multi-suggestion trees

## Summary

The first smart `Wiring Lab` state model should be:

- small
- explicit
- enum-driven
- easy to render
- easy to test
