Status: done
Priority: medium
Date: 2026-03-15
Project: loudspeaker-data
Owner: d
Claim ID: 20260315T174108Z-0bd17cd0

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

## Outcome

Completed on 2026-03-15.

Result:

- kept the grouped parser prototype as the narrow semantic-block extractor for
  sample loudspeaker rows
- strengthened the prototype output with record-level `source_trace`
  information and display-safe identity fields
- preserved grouped technical block recovery without widening into bulk
  extraction

## Artifact

- `B:\ohmic\tools\loudspeaker\prototype-grouped-field-parser.ps1`
- `B:\ohmic\docs\architecture\OHMIC_GROUPED_LOUDSPEAKER_FIELD_PARSER_PROTOTYPE_2026-03-15.md`
