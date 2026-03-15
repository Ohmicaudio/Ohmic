# Ohmic Dashboard History Toggle Label Transition Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define exactly how the history toggle label should change between collapsed and
expanded states so the control remains obvious and calm.

## Core Principle

The label should communicate action and state without becoming verbose.

Users should instantly see whether the control will open older history or close
it again.

## Recommended Transition

Collapsed state:

- `Show older commands`

Expanded state:

- `Hide older commands`

If a hidden count is present:

- keep the count secondary to the action wording

## Count Interplay Rule

Count may appear:

- after the action text
- or in a lower-emphasis adjacent token

Examples:

- `Show older commands (3)`
- `Hide older commands`

Do not make the count the main label.

## Tone Rule

Use calm verbs:

- `Show`
- `Hide`
- `View`

Avoid labels that sound like navigation or destructive action.

## Guardrails

- do not make the expanded label ambiguous
- do not let the count crowd out the action text
- do not switch between too many wording variants
- do not turn the label into a full sentence

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-toggle-count-placement-rule`
- `define-dashboard-history-expansion-toggle-rule`
