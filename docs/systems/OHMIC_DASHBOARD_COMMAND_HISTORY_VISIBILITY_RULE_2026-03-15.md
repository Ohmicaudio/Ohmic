# Ohmic Dashboard Command History Visibility Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how much recent command history the dashboard should expose without
turning the command surface into a scrolling log that distracts from the
current pending or answered command.

## Core Principle

The dashboard is a live control surface, not a transcript viewer.

Show enough recent history to preserve confidence and orientation, but keep the
current command and newest answer visually dominant.

## Default Visibility Rule

By default, show only:

- the current pending command if one exists
- otherwise the most recent completed command
- and at most one immediately previous command summary

That gives the user:

- current context
- one step of recent memory
- no noisy stack of stale commands

## Pending Command Priority

If a command is still pending:

- it must stay pinned at the top of the command area
- it must not collapse behind older completed commands
- older entries should de-emphasize themselves while the pending item is active

## Completed Command Rule

When a pending command becomes answered:

- the answered command remains visible as the newest command/result pair
- the previously newest completed command may remain as the one historical row
- anything older should collapse into hidden history

## Recommended Visible Count

Recommended default:

- `1` current command row
- `1` previous command row
- older commands hidden behind expansion

Do not show a running list of every recent command by default.

## Row Content Rule

Each visible history row should remain lightweight.

Recommended fields:

- short command text summary
- state badge such as `pending` or `answered`
- short timestamp or relative freshness

Do not show:

- raw inbox event bodies
- long JSON payloads
- full result bodies inside the history row itself

## Collapse Rule

Older commands beyond the visible limit should:

- collapse into a small history affordance
- stay available on demand
- not consume primary dashboard space by default

Recommended collapsed label examples:

- `Show older commands`
- `View recent command history`

## Relationship To Recent Output

Command history and recent output are related but not identical.

- command history answers: what did I ask?
- recent output answers: what happened in the system?

Do not force the command history block to mirror every output event.

## Mobile / Tight Layout Rule

On smaller surfaces:

- show only the current command row by default
- move older command access behind expansion sooner

The smaller the surface, the less default history should remain open.

## Empty State Rule

If no commands have been submitted yet:

- do not show an empty history frame full of placeholder chrome
- show either nothing
- or a very small `No recent commands` helper line

## Minimal Example

```text
pending command visible
older answered command shown beneath it
everything older collapsed

pending command answered
answered command remains first
previous answered command remains second
older items stay hidden
```

## Guardrails

- do not make the command area look like a chat transcript
- do not let old completed commands outrank the active pending command
- do not expose raw JSON bodies in the main history rows
- do not require expansion just to see the current command state

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-command-history-expansion-rule`
- `define-dashboard-command-box-behavior`
- `define-dashboard-recent-output-pane-behavior`
