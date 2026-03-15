# Ohmic Dashboard Output Priority Visibility Rule

Date: 2026-03-15
Status: working contract

## Purpose

Define how blocked, needs-input, completion, and routine status events should
be visually prioritized in the dashboard output surfaces.

This rule applies to:

- the recent output pane
- any small supporting output strip near the main response card

It does not replace the full outbox log.

## Core Principle

Recent output should optimize for:

1. urgency
2. actionability
3. recency

Not every recent event deserves equal visibility.

The dashboard should keep high-value items visible longer and let low-value
chatter fade faster.

## Priority Ladder

Use this priority order from highest to lowest:

1. `blocked`
2. `needs_input`
3. `completion`
4. `result`
5. `status`
6. routine audit or housekeeping output

## Priority Meanings

### 1. `blocked`

Highest visibility.

Why:

- work cannot progress normally
- the user may need to notice or intervene

Visibility rule:

- keep pinned at the top of recent output until a newer `blocked` or
  `needs_input` event supersedes it
- never let routine status bury it

### 2. `needs_input`

Very high visibility.

Why:

- the loop is waiting on a decision or instruction

Visibility rule:

- keep near the top until answered or superseded
- allow it to sit just below `blocked`

### 3. `completion`

High visibility, but shorter-lived than blockers.

Why:

- the user should see that something finished
- but completion should not crowd out urgent attention states

Visibility rule:

- keep visible longer than routine status
- allow newer `blocked` or `needs_input` events to outrank it immediately

### 4. `result`

Medium visibility.

Why:

- results may matter, but they are often less important than an actual
  completion or blocker signal

Visibility rule:

- show when space allows
- compress sooner than `completion`

### 5. `status`

Low-to-medium visibility.

Why:

- status is useful for motion
- but most status updates are not critical once a stronger event appears

Visibility rule:

- keep only the newest few meaningful status lines
- demote older status quickly

### 6. Routine audit or housekeeping output

Lowest visibility.

Examples:

- audit notes with no user-facing impact
- queue hygiene notices
- lightweight refresh bookkeeping

Visibility rule:

- collapse or suppress by default in the recent output pane
- surface only if nothing more important exists

## Tie-Break Rule

When two visible events have the same priority:

1. show newer first
2. prefer shorter, clearer messages

Do not preserve older equal-priority messages just because they arrived first.

## Visibility Duration Rule

Recommended relative dwell behavior:

- `blocked` and `needs_input`
  - sticky until resolved or superseded
- `completion`
  - visible through the next few routine updates
- `result`
  - visible briefly unless it contains strong actionable meaning
- `status`
  - roll off quickly as newer items arrive
- routine housekeeping
  - hide first

This is a relative rule, not a hard timer spec.

## Recent Output Pane Rule

In the recent output pane:

- always favor priority over raw recency when space is limited
- keep the pane readable
- avoid showing more than a small rolling window

Practical behavior:

- one active urgent item may displace several low-priority status items

## Main Response Card Relationship

The main response card still owns the single current summary.

The recent output pane should show the recent trail behind that summary.

So:

- current action card = what matters right now
- output priority rule = what supporting trail still deserves space

## Suggested Importance Labels

Optional importance flags:

- `urgent`
- `actionable`
- `notable`
- `routine`

Recommended mapping:

- `blocked` -> `urgent`
- `needs_input` -> `actionable`
- `completion` -> `notable`
- `result` -> `notable`
- `status` -> `routine`
- housekeeping -> `routine`

## Minimal Example

Given these recent events:

1. `status`: "reading queue"
2. `completion`: "closed dashboard stale-state packet"
3. `status`: "refreshing summary"
4. `blocked`: "waiting on external credential"

Recommended visible order:

1. blocked
2. completion
3. newest status

The older routine status should fall out first.

## Guardrails

- do not let low-value status spam bury blockers
- do not keep every completion pinned indefinitely
- do not treat routine audit output as equal to user-facing attention states
- do not confuse output priority with queue priority

## Follow-On Dependencies

This rule should feed:

- `define-dashboard-output-event-collapse-rule`
- `define-dashboard-command-history-expansion-rule`
- `define-dashboard-pending-badge-severity-rule`
