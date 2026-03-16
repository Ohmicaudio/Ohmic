# Ohmic Orchestrator Stack Repair Vs Execution Balance

Date: 2026-03-16
Project: ohmic

## Purpose

Define how orchestrator-heavy stacks balance repair work against execution.

## Balance Rule

- if queue pressure is high, orchestrator-heavy stacks may bias toward repair
- if queue pressure is stable, they should keep visible execution capacity
- they should not fossilize into permanent repair-only stacks

## Non-Goal

Orchestrators are not pure janitors. They still need execution presence.
