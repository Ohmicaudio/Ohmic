# Ohmic Orchestrator Refill Fallback Rotation Rules

Date: 2026-03-16
Project: ohmic

## Purpose

Define how orchestrator-heavy stacks should rotate refill and rescue fallbacks.

## Rotation Rule

- rotate refill fallbacks often enough to keep them fresh
- evict low-value refill candidates before they fossilize
- return to stable execution once pressure eases

## Goal

Keep queue-repair fallbacks useful without starving forward progress.
