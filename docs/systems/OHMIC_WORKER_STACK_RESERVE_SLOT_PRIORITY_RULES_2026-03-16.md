# Ohmic Worker Stack Reserve Slot Priority Rules

Date: 2026-03-16
Project: ohmic

## Purpose

Define which reserve slot should win when stack pressure forces a choice.

## Priority Order

1. fallback slot
2. verification slot
3. maintenance slot

## Rule

If only one reserve slot can survive:

- keep the fallback first
- keep verification next if it protects touched-surface truth
- drop maintenance first when pressure rises

This keeps the stack useful under pressure instead of merely tidy.
