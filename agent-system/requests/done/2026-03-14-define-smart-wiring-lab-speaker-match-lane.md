Status: done
Priority: medium
Date: 2026-03-14
Project: ohmic-audio-labs

# Define Smart Wiring Lab Speaker Match Lane

## Goal

Define the next evolution of `Wiring Lab` as a real speaker load and amp-match tool rather than a generic final-ohms calculator.

## Why

The current market is full of weak speaker impedance calculators that stop at:

- a raw final load
- maybe a diagram

The better tool should explain:

- which wiring options exist
- which ones are useful
- which amp target loads they fit
- which combinations are bad or unsafe
- why the result makes sense

## Inputs

- `B:\ohmic\docs\roadmap\OHMIC_TOOLBOX_CALCULATOR_INVENTORY_2026-03-14.md`
- `B:\ohmic\docs\roadmap\OHMIC_TOOLBOX_SECOND_WAVE_PUBLIC_MINI_TOOLS_2026-03-14.md`
- `B:\ohmic\repos\ohmic-audio-labs\apps\ohmic-toolbox`

## Deliverable

A scoped design note for a smarter `Wiring Lab` that defines:

- target inputs
- target outputs
- amp-load recommendation layer
- explanation layer
- future distinction from generic `Ohm's Law`

## Constraints

- do not implement the whole smarter wiring engine yet
- keep this as a definition and planning slice
- preserve the current first-wave `Wiring Lab` behavior while the better version is designed

## Completion

- added `B:\ohmic\docs\roadmap\OHMIC_SMART_WIRING_LAB_SPEAKER_MATCH_LANE_2026-03-14.md`
- defined target inputs, outputs, amp-load recommendation layer, and explanation layer
- made the boundary from generic `Ohm's Law` explicit
- scoped the next useful version as a smarter speaker-load and amp-match tool instead of a giant expert system
