Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T055707Z-a8ef9918

# Scaffold Administrator Inactive Intake Shell Module

## Goal

Define or scaffold the first shell module that renders archived and routed
intake browsing.

## Focus

- inactive rows
- filter presets
- reopen affordance
- summary labels
- empty state

## Acceptance

- one inactive-intake shell packet is explicit
- the admin shell has a concrete module seam for inactive browsing

## Result

Done. The inactive-intake shell module now lives in
`tools/sync/administrator/inactive-intake-shell.ps1` and renders inactive rows
through stable presets, reopen affordances, summary labels, and an explicit
empty state.
