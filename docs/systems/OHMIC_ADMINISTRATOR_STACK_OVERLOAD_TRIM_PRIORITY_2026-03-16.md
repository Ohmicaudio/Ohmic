# Ohmic Administrator Stack Overload Trim Priority

Date: 2026-03-16
Project: ohmic

## Purpose

Define what an administrator-heavy stack trims first under overload.

## Trim Order

1. distant policy branch
2. duplicate fallback
3. low-value projection fallback
4. low-value generic documentation fallback

## Protected Items

Do not trim first:

- filing-critical items
- the only safe adjacent fallback
- queue-truth items that keep routing explainable
