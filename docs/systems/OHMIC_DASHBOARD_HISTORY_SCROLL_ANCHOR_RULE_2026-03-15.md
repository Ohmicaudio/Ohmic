# Ohmic Dashboard History Scroll Anchor Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define where the scroll anchor should sit when expanded history becomes its own
scroll region so the newest visible command context stays easy to recover.

## Core Principle

The anchor should privilege current relevance over oldest chronology.

Expanded history is still a support surface; the most recent meaningful command
context should remain easiest to find.

## Recommended Anchor

Prefer anchoring the bounded history region near the newest visible command
context, not the oldest hidden entry.

That means:

- newest hidden or newly revealed command context should be easiest to recover
- current visible command anchor should remain visually close

## Scroll Return Rule

If the user scrolls away inside expanded history:

- provide a simple path back toward the newest relevant edge
- do not strand the user at the oldest point with no orientation

## Relationship To Expansion

When history first expands into scroll mode:

- avoid sudden jumps that hide the current command
- keep the initial scroll position predictable

## Guardrails

- do not anchor expanded history in a way that hides current context
- do not default to oldest-first if it makes recovery harder
- do not reset the scroll anchor unpredictably while the user is reading
- do not make the anchor behavior differ wildly between small and large layouts

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-scroll-restore-position-rule`
- `define-dashboard-history-expanded-scroll-boundary-rule`
