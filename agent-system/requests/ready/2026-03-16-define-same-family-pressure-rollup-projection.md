Status: ready
Priority: low
Date: 2026-03-16
Project: ohmic

# Define Same Family Pressure Rollup Projection

## Goal

Define the projection shape that rolls same-family queue pressure into a compact
runtime/dashboard-friendly record.

## Focus

- family id
- same-family ready count
- warm reserve count
- active-worker ratio
- status band

## Acceptance

- one same-family rollup packet is explicit
- family pressure can be projected without raw queue scanning in the UI
