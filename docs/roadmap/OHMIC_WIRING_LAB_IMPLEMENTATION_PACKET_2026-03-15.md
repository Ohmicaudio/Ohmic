Status: implementation packet
Date: 2026-03-15

# Ohmic Wiring Lab Implementation Packet

## Purpose

Define the first implementable smart `Wiring Lab` version so a later UI pass
can build it without guessing.

This packet sits between:

- the product/rules notes
- and the later state-model/UI implementation details

## Version Scope

This packet defines:

- the first smart `Wiring Lab` result model
- the first supported amp-target presets
- the minimum UI structure
- the explanation and warning expectations

This packet does not define:

- full amp database support
- full speaker recommendation engine behavior
- exact React component structure
- model-specific amplifier performance claims

## Product Goal

The first smart `Wiring Lab` should help users answer:

1. what final load their wiring creates
2. whether that load fits the intended amp target
3. why the result is good, awkward, or unsafe
4. what one better next move might be

## Minimum Inputs

### Speaker wiring inputs

- `sub_count`
- `voice_coil_type`
  - `SVC`
  - `DVC`
  - `QVC`
- `coil_impedance_ohms`
- `wiring_method`
  - `series`
  - `parallel`

### Amplifier intent inputs

- `amp_mode`
  - `mono`
  - `bridged`
  - `stereo`
- `amp_target_min_load_ohms`
- optional `amp_preferred_load_ohms`

### First practical presets

The first UI should offer quick presets for:

- `1 ohm mono`
- `2 ohm mono`
- `4 ohm mono`
- `4 ohm bridged`
- `2 ohm stereo per channel`
- `4 ohm stereo per channel`

Manual override should remain possible, but the preset path should be the
primary path.

## Minimum Outputs

The result area should always show:

- `final_load_ohms`
- `fit_class`
  - `good_match`
  - `usable_but_awkward`
  - `unsafe_or_poor_fit`
- `what_happened`
- `fit_explanation`
- optional `next_better_direction`

## Result Layout

### Block 1: Final load

Show:

- final impedance/load number
- wiring diagram

Job:

- answer the old calculator question immediately

### Block 2: Fit badge

Show one clear badge:

- `Good Match`
- `Usable but Awkward`
- `Unsafe or Poor Fit`

Job:

- give instant classification without making the user parse prose first

### Block 3: Explanation

Show three short lines:

1. what wiring created
2. how that fits the selected amp target
3. what to do next if it is not ideal

### Block 4: Warning or advisory note

Show only when needed:

- below-minimum warning
- high-load underuse warning
- oddball-load explanation
- bridged-load caution

## Wording Classes

### Good Match wording

Tone:

- confident
- practical
- not overhyped

Example pattern:

- `This wiring creates a 1-ohm final load, which matches the selected mono target and is a normal high-output configuration.`

### Usable But Awkward wording

Tone:

- calm
- advisory
- not alarmist

Example pattern:

- `This load is electrically safe, but it is higher than the preferred target and may leave amplifier output on the table.`

### Unsafe Or Poor Fit wording

Tone:

- direct
- plain-language
- no macho ambiguity

Example pattern:

- `This load falls below the selected amplifier minimum and should not be used on this setup.`

## First Recommendation Types

When the result is not `good_match`, the tool should recommend only one primary
next direction:

- switch series/parallel method
- choose a different coil option
- change sub count
- use a different amp target

The first version should not emit a giant ranked option tree.

## Out-Of-Scope For V1

Do not include yet:

- model-specific amp database matching
- RMS power predictions
- thermal modeling
- enclosure-aware recommendations
- crossover or DSP recommendations
- vehicle electrical-system assumptions

## UI Flow

Recommended first flow:

1. choose speaker wiring inputs
2. choose amp target preset or manual amp target
3. calculate final load
4. classify fit
5. render explanation and next suggestion

## Trust Rule

The first smart `Wiring Lab` should be implemented so that:

- the load math is deterministic
- the fit class is deterministic
- the explanation is template-driven from the result class

Do not let the first version depend on freeform heuristics.

## Verification Expectations

The later UI implementation should be paired with:

- unit checks for final-load classification
- a few canonical result fixtures
- app-local render/build verification in the toolbox surface

## Follow-On Task

The next direct implementation step after this packet is:

- convert this packet plus the rules note into a concrete UI/state model

That is a separate task and should not be merged into this one.

## Summary

The first smart `Wiring Lab` version should be:

- clearer than a raw ohms calculator
- honest about safety and awkwardness
- small enough to trust
- structured enough to implement cleanly
