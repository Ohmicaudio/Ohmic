# Ohmic Dashboard Blocked Output Pin Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define exactly how blocked or needs-input output should stay pinned in the
recent-output surface even while lower-priority output continues to arrive.

## Core Principle

Active trouble should remain visible until it is resolved or clearly replaced by
more important trouble.

Routine success or heartbeat chatter must not bury blocked state.

## What Qualifies For Pinning

Pin output events that represent:

- `blocked`
- `needs_input`
- a strongly user-actionable unresolved warning when no harder blocked state
  exists

Routine progress, completion, or status noise should not claim the pinned slot.

## Pin Placement Rule

Pinned output should stay at the top of the recent-output pane.

Below it, the pane may continue to show:

- newest completion
- recent progress
- grouped routine events

But the pinned blocked item stays visually first.

## Replacement Rule

A pinned item may be replaced only when:

- the blocked condition is resolved
- a newer blocked item supersedes it
- a `needs_input` state escalates into a stronger blocked state

Do not replace a blocked item just because a completion or routine refresh
arrived later.

## Resolution Rule

When the pinned blocked event resolves:

- remove pinning
- keep the resolution/completion visible normally
- allow the pane to fall back to standard output ordering

If the blocked event resolves silently in the backend, the dashboard should
still unpin it on the next truthful refresh.

## Multi-Blocked Rule

If multiple blocked events exist:

- pin the highest-consequence or newest unresolved blocked event
- keep older blocked items available in normal output history or grouped state

Do not pin every blocked item at once.

## Duration Rule

Pinning lasts for the life of the unresolved condition, not for a fixed short
timer.

This is different from temporary completion emphasis.

## Relationship To Collapse

While a blocked item is pinned:

- routine and repeated low-priority events should collapse more aggressively
- the pinned item should not have to compete with repetitive noise

## Visual Emphasis Rule

Pinned blocked output should use:

- highest emphasis in the output pane
- clear unresolved wording
- persistent placement

It should not rely only on color or tiny badges to remain visible.

## Guardrails

- do not let completion messages push unresolved blocked output off the top
- do not pin everything or the pane stops ranking properly
- do not leave an already-resolved blocked item pinned forever
- do not silently demote needs-input if it is still the top actionable state

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-routine-status-decay-rule`
- `define-dashboard-repeated-event-grouping-rule`
- `define-dashboard-recent-output-pane-behavior`
