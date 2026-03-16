# Ohmic Administrator Adjacent Policy Cluster Rules

Date: 2026-03-16
Project: ohmic

## Purpose

Define how tightly administrator-heavy stacks should cluster related policy and
routing packets.

## Rule

Administrator-heavy stacks should stay inside one adjacent policy cluster when
possible:

- one primary policy branch
- one adjacent branch if needed for continuity
- spill back distant branches before claiming more

## Non-Goal

An administrator stack should not become a broad policy scrapbook.
