Status: ready
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs

# Define Minimum Trusted App Runtime Checks

## Goal

Define the minimum trusted checks for the current `ohmic-audio-labs` runtime so
completion work has a stable verification floor.

## Why

The main app is large and dirty enough that “it probably still works” is not a
good standard.

## Deliverable

A compact checks note covering:

- route smoke checks
- core tool/app surface checks
- any high-risk runtime checks that should happen before calling a slice done

## Constraints

- define checks only
- do not try to automate everything in this step
