Status: ready
Priority: medium
Date: 2026-03-16
Project: ohmic

# Define Hot Vs Warm Queue Tier Model

## Goal

Define the actual state model that separates hot ready tasks from warm queued
reserves without losing queue truth.

## Focus

- tier definitions
- promotion rules
- demotion rules
- reporting boundary
- interaction with blocked and done states

## Acceptance

- one queue-tier packet is explicit
- hot and warm queue behavior is no longer implicit
