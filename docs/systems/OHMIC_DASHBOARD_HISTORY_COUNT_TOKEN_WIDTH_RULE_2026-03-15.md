# Ohmic Dashboard History Count Token Width Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how much horizontal space the hidden-count token may consume before the
history toggle should simplify or truncate its presentation.

## Core Principle

The count token must remain a helper, not a layout bully.

If the count starts crowding the action text or degrading readability, the
dashboard should simplify the token before the control becomes awkward.

## Recommended Rule

Allow the count token to occupy only a small fraction of the toggle’s total
horizontal footprint.

If the count grows beyond that comfortable compact width:

- prefer simplification
- then abbreviation or truncation fallback

## Relationship To Action Text

Action text remains primary.

Count width should never force the toggle label to become unreadable or wrap in
a way that hurts scanability.

## Guardrails

- do not let the count token dominate the control
- do not size the token as if it were the primary content
- do not rely on exact pixel micromanagement in this contract
- do not ignore compact-layout constraints just because desktop has room

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-count-token-overflow-fallback-rule`
- `define-dashboard-history-toggle-count-compact-abbreviation-rule`
- `define-dashboard-history-count-token-truncation-rule`
