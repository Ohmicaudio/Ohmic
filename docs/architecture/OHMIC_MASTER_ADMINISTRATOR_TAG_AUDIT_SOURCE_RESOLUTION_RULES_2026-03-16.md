# Ohmic Master Administrator Tag Audit Source Resolution Rules

Date: 2026-03-16
Project: ohmic

## Purpose

Define how tag audit entries resolve the visible source of a tag assignment.

## Core Rule

Tag audit should preserve the highest-value source explanation instead of
showing ambiguous generic labels.

## Resolution Order

Suggested first resolution order:

1. explicit operator action
2. accepted suggestion hint
3. overlay default policy
4. system inference

## Audit Fields

- `tag_assignment_id`
- `resolved_source_type`
- `resolved_source_ref`
- `resolution_reason`

## First Safe Implementation

The first implementation only needs stable source-type precedence and source
refs on tag audit rows.
