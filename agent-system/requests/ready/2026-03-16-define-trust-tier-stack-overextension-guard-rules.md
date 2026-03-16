Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

# Define Trust Tier Stack Overextension Guard Rules

## Goal

Define the guard rules that should fire when a worker stack grows beyond what
its trust tier should safely carry.

## Focus

- soft vs hard depth breach
- low-trust worker tightening
- reopen-rate pressure
- fallback quality degradation
- operator override

## Acceptance

- one overextension-guard packet is explicit
- trust-tier depth policy gets an enforceable safety boundary
