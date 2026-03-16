# Ohmic Worker Stack Family Balance Rules

Date: 2026-03-16
Project: ohmic

## Purpose

Define when a worker stack is balanced versus when it has turned into a mixed
grab-bag.

## Balanced Stack

A balanced worker stack should:

- cluster around one primary family
- use follow-ons from the same family when possible
- keep support work obviously adjacent to that family

## Unbalanced Stack

A stack should be treated as unbalanced when:

- the fallback belongs to a third unrelated family
- maintenance work is crowding out the primary family
- the worker cannot explain the local order in one sentence

## Rebalance Trigger

When unbalanced, the worker should trim or return work to the queue before
claiming more.
