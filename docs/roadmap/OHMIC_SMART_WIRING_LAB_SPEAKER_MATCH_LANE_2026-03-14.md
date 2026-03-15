Status: design note
Date: 2026-03-14

# Ohmic Smart Wiring Lab Speaker Match Lane

## Purpose

Define the next evolution of `Wiring Lab` as a real speaker load and amp-match tool.

This is distinct from:

- generic `Ohm's Law`
- simple final-load calculators
- one-shot series/parallel charts with no explanation

## Problem With Typical Tools

Most speaker impedance calculators stop at:

- a final ohm number
- a generic diagram

That leaves out the parts users actually need:

- whether a wiring option is useful
- whether it matches the intended amplifier load
- whether the result is safe or questionable
- what alternative driver or coil choices would fit better
- why the tool is recommending one option over another

## Product Job

`Wiring Lab` should become the speaker-load intelligence layer for:

- subwoofer wiring
- voice-coil configuration
- target amp-load matching
- quick lead-gen utility use
- future BassBuilder support

## Target Inputs

Phase 1 inputs:

- sub count
- voice coil type
- coil impedance
- series or parallel wiring

Phase 2 inputs:

- amplifier target minimum load
- amplifier preferred load
- channel or bridge mode
- desired final use case
  - single channel
  - bridged pair
  - mono block

Phase 3 inputs:

- candidate driver options
- desired power range
- safe operating margin preferences

## Target Outputs

Minimum outputs:

- final load
- wiring diagram
- plain-language explanation

Recommended outputs:

- fit to common target loads
  - `0.5`
  - `1`
  - `2`
  - `4`
  - `8`
- useful vs awkward combo rating
- warning when a combo is likely a poor fit
- nearby alternative recommendations

## Recommendation Layer

The smarter version should not only calculate.

It should classify:

- `good match`
- `usable but awkward`
- `unsafe or poor fit`

Classification should depend on:

- final load
- amp target load
- whether the result is an oddball configuration
- whether power distribution is likely to be sensible

## Explanation Layer

Every result should explain:

- what the final load means
- why the wiring produced it
- what kind of amp setup it tends to fit
- why an option is discouraged when it is discouraged

This explanation layer is part of the product, not optional garnish.

## Boundary From Ohm's Law

`Ohm's Law` stays the generic electrical solver for:

- volts
- amps
- ohms
- watts

`Wiring Lab` owns:

- speaker impedance combinations
- final load for driver/coil wiring
- amp-target matching guidance
- speaker-specific diagrams and explanations

Do not merge those two lanes.

## Future Consumers

The smarter `Wiring Lab` output should be reusable in:

- `ohmic-toolbox`
- BassBuilder helper panels
- subwoofer design pages
- future install planning helpers

## Recommended Build Order

1. keep current first-wave `Wiring Lab` stable
2. define target amp-load model
3. define recommendation categories
4. define explanation templates
5. then implement the smarter lane

## Rule

Do not turn this into a giant all-speaker expert system first.

The next useful version is:

- better than a raw final-ohms calculator
- still simple enough to trust
- explicit about why it says what it says
