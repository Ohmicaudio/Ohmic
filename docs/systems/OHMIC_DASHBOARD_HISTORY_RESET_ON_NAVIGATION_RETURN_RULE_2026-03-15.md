# Ohmic Dashboard History Reset On Navigation Return Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define whether command-history expansion should reset when the user leaves the
dashboard and later returns through normal navigation.

## Core Principle

Normal navigation return should prefer the compact default unless a very short
return path makes preserved expansion obviously helpful.

The dashboard should usually reopen as a compact surface, not assume the user
wants the previous expanded-history context restored.

## Recommended Rule

On normal navigation away and return:

- reset expanded history to collapsed

Short-lived local refresh or tiny in-place transitions do not count as
navigation return.

## Rationale

Navigation return is a stronger context boundary than a simple refresh.

Resetting helps:

- restore compact defaults
- foreground the newest command context
- avoid surprising carryover of expanded older history

## Exceptions

Exceptions should be rare and deliberate.

If a very local return path is functionally the same surface and preserving
expansion clearly helps, that can be handled by explicit product behavior later,
not by broad default persistence.

## Guardrails

- do not preserve expanded history across normal navigation by default
- do not reset on tiny in-place rerenders that are not real navigation
- do not make return behavior depend on hidden implementation trivia
- do not let reset obscure the current command anchor

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-reset-after-major-layout-change-rule`
- `define-dashboard-history-reset-after-deep-link-entry-rule`
- `define-dashboard-history-state-reset-boundary-rule`
