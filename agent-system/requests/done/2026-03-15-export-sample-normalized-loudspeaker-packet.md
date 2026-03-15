Status: done
Priority: low
Date: 2026-03-15
Project: cross-project
Owner: d
Claim ID: 20260315T000239Z-6b73f2a1

# Export Sample Normalized Loudspeaker Packet

## Goal

Turn the grouped-field parser proof into one tiny machine-readable sample packet.

## Why

The parser prototype now proves the semantic-block rule, but the loudspeaker
lane still lacks one concrete generated payload that later extraction and page
work can point at.

## Inputs

- `B:\ohmic\tools\loudspeaker\prototype-grouped-field-parser.ps1`
- `B:\junk\loudspeakerdatabase.csv`
- `B:\ohmic\docs\architecture\OHMIC_GROUPED_LOUDSPEAKER_FIELD_PARSER_PROTOTYPE_2026-03-15.md`

## Deliverable

One tiny generated JSON packet plus a short note that explains:

- what the sample packet contains
- which fields are safe
- which ambiguous fields still stay quarantined

## Constraints

- do not mass-convert the dataset
- keep the sample set to a few representative rows

## Outcome

Completed on 2026-03-15.

Output:

- `B:\ohmic\generated\loudspeaker\sample-normalized-loudspeaker-packet-2026-03-15.json`
- `B:\ohmic\docs\architecture\OHMIC_SAMPLE_NORMALIZED_LOUDSPEAKER_PACKET_2026-03-15.md`

Result:

- the grouped-field parser now emits one real machine-readable packet
- the sample packet proves a safe narrow output shape across both full-block
  and shifted-row source variants
- ambiguous leftover values remain preserved but explicitly quarantined

## Completion

- updated `B:\ohmic\tools\loudspeaker\prototype-grouped-field-parser.ps1` to support optional file output
- generated `B:\ohmic\generated\loudspeaker\sample-normalized-loudspeaker-packet-2026-03-15.json`
- added `B:\ohmic\docs\architecture\OHMIC_SAMPLE_NORMALIZED_LOUDSPEAKER_PACKET_2026-03-15.md`
- verified the generated packet against representative Beyma, SICA, and EUPHORIA rows
