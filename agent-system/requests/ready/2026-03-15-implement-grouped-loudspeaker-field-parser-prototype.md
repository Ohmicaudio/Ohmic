Status: ready
Priority: medium
Date: 2026-03-15
Project: loudspeaker-data

# Implement Grouped Loudspeaker Field Parser Prototype

## Goal

Build the first grouped loudspeaker field parser so the imported data can start
becoming normalized packets instead of staying raw.

## Source

- `docs/architecture/OHMIC_SAMPLE_LOUDSPEAKER_NORMALIZATION_MAP_2026-03-15.md`
- loudspeaker files staged in `B:\\junk`

## Focus

- grouped source fields
- normalization mapping
- one sample subset
- preserve raw data lineage

## Acceptance

- one parser prototype exists
- it can normalize at least a sample subset
- the mapping is inspectable and not hand-wavy
