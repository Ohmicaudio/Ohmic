# Ohmic Worker Stack Verification Slot Eviction Rules

Date: 2026-03-16
Project: ohmic

## Purpose

Define when the verification slot should be dropped from the worker stack.

## Eviction Triggers

- verification already ran and no rerun is needed
- the verification target is no longer the touched surface
- stack pressure requires reserve-slot reduction
- a safer fallback is needed instead

## Rule

Verification stays longer than maintenance only while it protects touched-surface
truth.
