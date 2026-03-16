Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

# Define Section Wave Successor Pressure Warning

## Goal

Define the warning emitted when an active section family is running out of hot
or staged successors.

## Focus

- successor count threshold
- active-family pressure
- hot vs staged shortage
- operator visibility
- refill trigger hook

## Acceptance

- one successor-pressure packet is explicit
- section families warn before they collapse to one packet
