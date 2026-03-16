Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T094732Z-9a684b93

# Define Queue Refill Source Priority Order

## Goal

Define the order in which the system should pull refill material from hot, warm,
and colder queue sources.

## Focus

- warm reserve first vs cold backlog
- same-family promotion preference
- burst parent packet preference
- stale ready replacements
- manual override

## Acceptance

- one refill-source packet is explicit
- refill becomes consistent instead of opportunistic

## Result

Done. Refill source priority order now lives in
`docs/systems/OHMIC_QUEUE_REFILL_SOURCE_PRIORITY_ORDER_2026-03-16.md`, defining
warm-before-cold priority, same-family preference, parent-packet preference,
and documented override behavior.
