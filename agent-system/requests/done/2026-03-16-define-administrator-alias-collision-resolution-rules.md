Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T052208Z-52dcd815

# Define Administrator Alias Collision Resolution Rules

## Goal

Define how the system detects and handles collisions between administrator
action aliases within one overlay scope.

## Focus

- duplicate labels
- hidden versus active alias conflicts
- deprecated alias precedence
- rejection behavior
- audit visibility

## Acceptance

- one alias-collision packet is explicit
- ambiguous action inputs are rejected instead of guessed

## Result

- Added [OHMIC_MASTER_ADMINISTRATOR_ALIAS_COLLISION_RESOLUTION_RULES_2026-03-16.md](B:\ohmic\docs\architecture\OHMIC_MASTER_ADMINISTRATOR_ALIAS_COLLISION_RESOLUTION_RULES_2026-03-16.md) with explicit collision classes, reject-versus-prefer rules, and audit expectations for alias conflicts.
