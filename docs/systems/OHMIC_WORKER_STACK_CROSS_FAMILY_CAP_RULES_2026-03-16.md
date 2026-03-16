# Ohmic Worker Stack Cross Family Cap Rules

Date: 2026-03-16
Project: ohmic

## Purpose

Define how many distinct families one worker stack may carry at once.

## Cap Rule

Default cap:

- `1` primary family
- `1` adjacent support family if needed

That means most worker stacks should not carry more than `2` families at the
same time.

## Exceptions

Allowed temporary exceptions:

- one verification slice tied to the primary family
- one maintenance slice that keeps queue truth or runtime truth usable

Even then, the worker should return to a tighter stack quickly.

## Escalation

If the stack would need more than `2` active families to stay productive, the
system should split the work into clearer queue packets instead of normalizing
that drift.
