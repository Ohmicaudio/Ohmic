# Ohmic Dashboard History Toggle Count Hide Zero Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define when the hidden-count token should disappear so the history toggle does
not show meaningless zero-state chrome.

## Core Principle

If nothing is hidden, the count should get out of the way.

The action text should remain clear without decorative zero-count noise.

## Recommended Rule

Hide the count token when:

- hidden command count is `0`
- expansion has revealed all currently hidden history
- the count would convey no additional meaning

## Reappearance Rule

Show the count token again when:

- hidden command count becomes greater than `0`
- collapsed history once again hides older commands

## Guardrails

- do not display `0` as decorative chrome
- do not suppress the count when hidden history still exists
- do not let zero-state hiding make the action wording ambiguous
- do not let count appearance/disappearance jitter during harmless rerenders

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-count-token-width-rule`
- `define-dashboard-history-toggle-count-placement-rule`
