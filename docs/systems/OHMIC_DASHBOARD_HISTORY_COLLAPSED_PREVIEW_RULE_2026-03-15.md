# Ohmic Dashboard History Collapsed Preview Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define whether the collapsed history control should preview any hidden-command
content beyond the count, and if so how much.

## Core Principle

Collapsed preview should orient, not narrate.

The control may hint that useful older commands exist, but it should stay small
enough that the collapsed state still feels compact.

## Recommended Default

Default collapsed control should include:

- the expansion action
- hidden-count context

Optional preview:

- a very short hint of the most recent hidden command

## Preview Depth Rule

If preview text is shown:

- preview only one hidden command
- truncate aggressively
- prefer meaning over exact full text

Do not preview multiple hidden commands in the collapsed state.

## When To Omit Preview

Prefer count-only collapsed control when:

- the layout is tight
- command text tends to be long
- the preview would crowd the current visible command area

## Mobile Rule

On smaller surfaces:

- count-only collapsed control is usually preferable

Preview should be the exception, not the default, on cramped layouts.

## Guardrails

- do not make collapsed preview longer than the current command row
- do not preview so much hidden text that expansion feels unnecessary
- do not omit the count if count materially helps orientation
- do not let preview text compete with the current command state

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-history-preview-depth-rule`
- `define-dashboard-history-hidden-count-copy-rule`
- `define-dashboard-command-history-expansion-rule`
