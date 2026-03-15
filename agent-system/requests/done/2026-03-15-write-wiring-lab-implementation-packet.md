Status: ready
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs

# Write Wiring Lab Implementation Packet

## Goal

Convert the current `Wiring Lab` rules into one implementation packet that a
later UI/build pass can follow without guessing.

## Why

The safe amp-match rules exist, but the product lane still lacks the concrete
implementation guidance for UI states, result classes, explanation blocks, and
first supported presets.

## Inputs

- `B:\ohmic\docs\roadmap\OHMIC_SMART_WIRING_LAB_SPEAKER_MATCH_LANE_2026-03-14.md`
- `B:\ohmic\docs\roadmap\OHMIC_WIRING_LAB_SAFE_AMP_MATCH_RULES_2026-03-15.md`
- `B:\ohmic\repos\ohmic-audio-labs\apps\ohmic-toolbox`

## Deliverable

A short implementation packet that defines:

- result classes
- wording classes
- first supported amplifier targets
- the minimum UI/result structure

## Constraints

- no major UI build in this step
- implementation packet only

## Outcome

Completed on 2026-03-15.

Output:

- `B:\ohmic\docs\roadmap\OHMIC_WIRING_LAB_IMPLEMENTATION_PACKET_2026-03-15.md`

Result:

- the first smart `Wiring Lab` version now has a concrete implementation packet
- result layout, presets, wording classes, and scope boundaries are defined
- the follow-on state-model task remains separate
