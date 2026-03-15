# Ohmic Dashboard History Scroll Restore Position Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how expanded history should restore or preserve its internal scroll
position so users do not lose their place unnecessarily.

## Core Principle

Preserve position when continuity helps.
Return to anchor when context changed materially.

## Recommended Rule

Preserve internal scroll position across:

- harmless rerenders
- light refreshes
- minor local state changes

Return toward the newest relevant anchor when:

- the history set changed materially
- stale recovery rebuilt the command ordering
- the user collapsed and later re-expanded after a larger context shift

## Guardrails

- do not reset scroll position on every tiny update
- do not preserve position when it now points into misleading outdated context
- do not make scroll restoration feel random
- do not lose the newest command anchor when the restored position is no longer sensible

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-scroll-return-anchor-rule`
- `define-dashboard-history-scroll-anchor-rule`
