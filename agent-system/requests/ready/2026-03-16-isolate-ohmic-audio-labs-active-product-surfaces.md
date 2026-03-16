Status: ready
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs

# Isolate Ohmic Audio Labs Active Product Surfaces

## Goal

Identify the current active product surfaces in `ohmic-audio-labs` and separate
them from nonproduct and generated churn so real implementation lanes can
continue cleanly.

## Focus

- `products/*`
- `services/*`
- `components/*`
- `test/*`
- supporting `schemas/*`, `utils/*`, `scripts/*`

## Acceptance

- active product surfaces are explicitly named
- nonproduct and generated neighbors are called out
- the next safe implementation packets can be drawn from the active surfaces
