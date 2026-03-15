# Ohmic Dashboard History Expansion Toggle Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how the expansion control for hidden older commands should behave when
opened and closed so it stays predictable and compact.

## Core Principle

The history toggle should feel like a simple reveal, not a mode change.

Users should always know whether older history is expanded and how to collapse
it again.

## Default State

Default state:

- collapsed

The compact dashboard should open in its condensed command-history form unless a
specific persistence rule intentionally restores expansion.

## Toggle Behavior

When the user activates the toggle:

- if collapsed, expand the hidden history
- if expanded, collapse it back to the default compact state

Avoid one-way “show more” behavior that makes collapse less discoverable.

## Open / Close Label Rule

Labeling should clearly reflect current state.

Examples:

- collapsed: `Show older commands`
- expanded: `Hide older commands`

If hidden count is shown, keep the count concise and subordinate to the action.

## Newest Command Anchor Rule

Expanding history must not push the newest visible command out of obvious view.

The newest command remains the anchor; older history expands around or beneath
that anchor.

## Tight Layout Rule

On smaller surfaces:

- the toggle must remain compact
- expanding should not explode into a transcript-like takeover
- collapse should stay one tap away

## Guardrails

- do not make expansion irreversible in normal use
- do not turn the toggle into a navigation event
- do not let the toggle label stop matching the current state
- do not hide the newest command under expanded history

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-toggle-label-transition-rule`
- `define-dashboard-history-expansion-state-persistence-rule`
- `define-dashboard-command-history-expansion-rule`
