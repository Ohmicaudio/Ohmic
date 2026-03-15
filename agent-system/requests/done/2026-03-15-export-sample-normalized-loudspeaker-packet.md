Status: done
Priority: medium
Date: 2026-03-15
Project: loudspeaker-data
Owner: d
Claim ID: 20260315T174108Z-0bd17cd0

# Export Sample Normalized Loudspeaker Packet

## Goal

Export one sample normalized loudspeaker packet from the parser path so the
static-content and product lanes have a real specimen to work from.

## Source

- `docs/architecture/OHMIC_SAMPLE_LOUDSPEAKER_NORMALIZATION_MAP_2026-03-15.md`
- grouped loudspeaker parser prototype

## Focus

- one representative normalized packet
- raw-source traceability
- field naming and shape sanity
- durable sample output

## Acceptance

- one sample normalized packet is exported
- the packet preserves source traceability
- downstream page/template work can consume it

## Outcome

Completed on 2026-03-15.

Result:

- regenerated the committed sample packet from the grouped parser prototype
- added `display_name`, `nominal_impedance_ohms`, and a per-record
  `source_trace` block
- preserved raw-field lineage so downstream template work can consume the
  packet without losing provenance

## Artifact

- `B:\ohmic\generated\loudspeaker\sample-normalized-loudspeaker-packet-2026-03-15.json`
- `B:\ohmic\docs\architecture\OHMIC_SAMPLE_NORMALIZED_LOUDSPEAKER_PACKET_2026-03-15.md`
