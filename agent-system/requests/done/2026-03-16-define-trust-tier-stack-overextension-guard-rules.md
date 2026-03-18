Status: done
Priority: low
Date: 2026-03-16
Project: ohmic
Owner: d
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
Claim ID: 20260316T101338Z-c9964bc3

## Result

Defined the trust-tier overextension guard rules so worker stacks have explicit soft and hard safety boundaries.
