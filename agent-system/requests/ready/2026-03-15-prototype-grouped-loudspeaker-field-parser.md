Status: ready
Priority: low
Date: 2026-03-15
Project: cross-project

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
