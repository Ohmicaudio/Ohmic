Status: done
Priority: low
Date: 2026-03-15
Project: cross-project
Owner: d
Claim ID: 20260315T035535Z-22bf96e4

# Prototype Grouped Loudspeaker Field Parser

## Goal

Build one tiny parsing prototype for the grouped-symbol loudspeaker CSV fields
identified in the sample normalization map.

## Why

The sample mapping proved that blind column renaming is not enough.

The next useful move is a small parser proof for grouped field families such as:

- `Xmax`
- sensitivity
- power

## Inputs

- `B:\junk\loudspeakerdatabase.csv`
- `B:\ohmic\docs\architecture\OHMIC_SAMPLE_LOUDSPEAKER_NORMALIZATION_MAP_2026-03-15.md`

## Deliverable

A short prototype note or script that shows one grouped parsing rule working on
a few sample rows.

## Constraints

- do not mass-convert the dataset
- keep it to one prototype slice

## Outcome

Completed on 2026-03-15.

Output:

- `B:\ohmic\tools\loudspeaker\prototype-grouped-field-parser.ps1`
- `B:\ohmic\docs\architecture\OHMIC_GROUPED_LOUDSPEAKER_FIELD_PARSER_PROTOTYPE_2026-03-15.md`

Result:

- the prototype successfully recovered grouped technical fields from both the
  full-block and shifted-row variants
- `xmax`, sensitivity, and max-power parsing now have one concrete proof path
  that does not depend on fixed value-column positions

## Completion

- added `B:\ohmic\tools\loudspeaker\prototype-grouped-field-parser.ps1`
- added `B:\ohmic\docs\architecture\OHMIC_GROUPED_LOUDSPEAKER_FIELD_PARSER_PROTOTYPE_2026-03-15.md`
- verified the parser against representative Beyma, SICA, and EUPHORIA rows
- demonstrated that semantic block detection survives the missing-`xmax`
  shifted-row layout
