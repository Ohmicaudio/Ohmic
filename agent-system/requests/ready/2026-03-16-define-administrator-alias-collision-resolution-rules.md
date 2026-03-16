Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

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
