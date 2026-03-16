# Ohmic Orchestrator Execution Fallback Deferral Rule

Date: 2026-03-16
Project: ohmic

## Rule

Orchestrator-heavy stacks may defer lower-value execution fallback work while
queue pressure is high, but they should restore visible execution capacity once
repair pressure drops.
