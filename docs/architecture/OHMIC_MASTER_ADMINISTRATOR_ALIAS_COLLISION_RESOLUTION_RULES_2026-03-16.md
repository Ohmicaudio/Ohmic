# Ohmic Master Administrator Alias Collision Resolution Rules

Date: 2026-03-16
Project: ohmic

## Purpose

Define how the system detects and handles collisions between administrator
action aliases inside one overlay scope.

## Core Rule

Action aliases should resolve deterministically or be rejected.

The system should never guess between two plausible alias targets.

## Collision Types

Suggested first collision types:

- exact active-active label collision
- active versus deprecated alias collision
- hidden versus visible alias collision
- overlay-local alias shadowing a shared alias

## Resolution Rules

### Exact active-active collision

Reject alias registration or input resolution and surface a collision error.

### Active versus deprecated collision

Prefer the active alias, but record the deprecated overlap so future cleanup is
possible.

### Hidden versus visible collision

Prefer the visible alias only when the hidden alias is not otherwise reachable
from the same input path. If both remain resolvable, reject as ambiguous.

### Overlay-local shadowing

Overlay-local aliases may override shared aliases only when the override is
explicit and auditable.

## Audit Rule

Collision handling should record:

- `alias_value`
- `collision_type`
- `candidate_action_ids[]`
- `resolution_outcome`

## First Safe Implementation

The first implementation only needs:

- collision-type detection
- explicit reject-versus-prefer rules
- audit visibility for collisions

That is enough to keep action alias inputs honest.
