# Ohmic Hybrid Worker Documentation Fallback Boundary

Date: 2026-03-16
Project: ohmic

## Purpose

Define when documentation is a safe hybrid-worker fallback and when it becomes
stack pollution.

## Safe Documentation Fallback

Allowed:

- queue-truth docs tied to the current lane
- family-coupled docs that unblock the current packet

## Pollution

Not allowed:

- vague generic docs unrelated to the active lane
- filler documentation used only to avoid escalation

## Rule

Hybrid workers may carry documentation fallback only when it is obviously tied
to the primary family or queue-truth boundary.
