Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

# Define Administrator Approval Request Payload Shape

## Goal

Define the payload generated when an administrator action resolves to
approval-required instead of directly valid.

## Focus

- approval request object
- reason fields
- linked intake and action ids
- operator-facing summary
- resolution linkage

## Acceptance

- one approval-request payload packet is explicit
- approval-gated actions have a stable handoff shape
