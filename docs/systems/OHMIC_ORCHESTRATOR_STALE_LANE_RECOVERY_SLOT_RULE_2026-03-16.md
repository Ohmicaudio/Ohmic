# Ohmic Orchestrator Stale Lane Recovery Slot Rule

Date: 2026-03-16
Project: ohmic

## Rule

Orchestrator-heavy stacks may hold one stale-lane recovery slot when it clearly
helps restore a pressured or drifting queue lane, but it should spill back once
the lane is stable.
