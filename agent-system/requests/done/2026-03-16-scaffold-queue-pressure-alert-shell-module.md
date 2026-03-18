Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
Claim ID: 20260316T095256Z-1a650d8b

# Scaffold Queue Pressure Alert Shell Module

## Goal

Scaffold the first shell module that surfaces queue-pressure alerts inside the
shared administrator/runtime interface.

## Focus

- pressured-family display
- global pressure banner
- refill urgency display
- recent refill summary
- empty-safe fallback

## Acceptance

- one queue-pressure alert shell packet is explicit
- queue pressure has a first visible shell module target

## Result

Implemented the first queue-pressure alert shell module in tools/sync/queue-health/pressure-alert-shell.ps1.
