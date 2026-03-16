Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

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
