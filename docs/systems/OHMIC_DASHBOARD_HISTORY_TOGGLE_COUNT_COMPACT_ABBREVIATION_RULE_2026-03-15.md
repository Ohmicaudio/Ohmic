# Ohmic Dashboard History Toggle Count Compact Abbreviation Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define whether the hidden-count token should ever abbreviate on cramped
surfaces, and if so how to do it without losing clarity.

## Source Alignment

This rule should align with:

- `docs/systems/OHMIC_DASHBOARD_HISTORY_COUNT_TOKEN_WIDTH_RULE_2026-03-15.md`
- `docs/systems/OHMIC_DASHBOARD_HISTORY_TOGGLE_COUNT_SEPARATOR_RULE_2026-03-15.md`

## Core Principle

Abbreviation is acceptable only if the token still reads as a count of hidden
history, not as mysterious badge chrome.

## Recommended Abbreviation Rule

Allow compact abbreviation only after the normal count token no longer fits
comfortably.

Preferred compact forms:

- `(12)`
- `· 12`

Avoid inventing opaque abbreviations like:

- `h12`
- `cnt12`
- `#12`

## Threshold Rule

Use abbreviation only when:

- the token width is crowding the action label
- the layout is compact enough to justify simplification
- the count is still important enough to show

## Relationship To Truncation

Abbreviation comes before truncation.

Meaning:

- simplify the framing first
- only truncate the count presentation if the compact form still overruns the
  control

## Guardrails

- do not abbreviate so aggressively that the token stops reading like a count
- do not add symbolic shorthand that needs explanation
- do not use abbreviation when the normal token already fits well

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-count-token-truncation-rule`
