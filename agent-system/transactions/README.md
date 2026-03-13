# Transactions

This folder is the canonical transaction layer for cross-agent reasoning records.

Transactions are not a replacement for `requests/`, `jobs/`, or memory. They
are the deeper event layer beneath them.

## Purpose

Use transactions to record meaningful work-thread state such as:

- proposals
- questions
- answers
- plans
- responses
- decisions
- handoff-level reasoning

The important rule is:

- labels do not define truth by themselves
- linkage does

A proposal may answer a question.
A response may close a plan.
An answer may become a decision.

## Relationship To Other Surfaces

- `transactions/`
  - canonical event and reasoning layer
- `requests/`
  - actionable queue view
- `jobs/`
  - active execution and edit-scope lock view
- `memory/`
  - promoted durable truth
- DB/index
  - retrieval over all of the above

## Folder Roles

- `active/`
  - open or still-relevant transactions
- `resolved/`
  - transactions whose main thread is resolved but still worth indexing
- `archive/`
  - older historical records kept for retrieval

## Minimum Metadata

- `id`
- `thread_id`
- `kind`
- `status`
- `project`
- `created`
- `author`
- `relates_to`
- `resolves`
- `promoted_to`

## Kinds

Use one of:

- `proposal`
- `question`
- `answer`
- `plan`
- `response`
- `decision`
- `request`
- `handoff`

## Core Rule

If a record advances the same underlying work stream, link it with:

- `thread_id`
- `relates_to`
- `resolves`

That is how the system learns that different labels can still refer to the same
transaction chain.

## Naming

Use:

- `YYYY-MM-DD-short-transaction-name.md`

Start from:

- `templates/transaction-template.md`
