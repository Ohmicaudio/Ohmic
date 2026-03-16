Status: done
Priority: medium
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T050448Z-41e10cda

# Define Administrator Aggregation Bundle Model

## Goal

Define the object model for grouped intake packets that should be handled as a
bundle instead of isolated single items.

## Focus

- aggregation identity
- membership rules
- bundle summary fields
- recommended next action
- split or dissolve behavior

## Acceptance

- one aggregation-bundle packet is explicit
- grouped handling logic is separated from single-item intake logic
- the future admin shell aggregation panel has a stable object family

## Result

- Added [OHMIC_MASTER_ADMINISTRATOR_AGGREGATION_BUNDLE_MODEL_2026-03-16.md](B:\ohmic\docs\architecture\OHMIC_MASTER_ADMINISTRATOR_AGGREGATION_BUNDLE_MODEL_2026-03-16.md) with the bundle object, summary fields, member surface, and bundle status model.
