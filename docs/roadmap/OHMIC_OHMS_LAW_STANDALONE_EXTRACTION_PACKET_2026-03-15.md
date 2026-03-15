Status: extraction packet
Date: 2026-03-15

# Ohmic Ohm's Law Standalone Extraction Packet

## Purpose

Define the first standalone public extraction packet for `Ohm's Law`.

This is not the implementation step.

It is the route/copy/CTA packet that should guide implementation later.

## Proposed Route Shape

Recommended route:

- `/apps/ohms-law`

Why:

- it fits the current interactive-tools lane
- it keeps the page clearly in the tools family
- it avoids pretending this is the whole app or the whole knowledge base

Secondary support route later if needed:

- `/tools/ohms-law`

Current recommendation:

- do not split routes at first
- choose one canonical public path

## Canonical Role

This page should act as:

- a standalone public utility
- a search-entry educational page
- a feeder into the broader toolbox/app surface

This page should not act as:

- the main product homepage
- a speaker load calculator
- a replacement for `Wiring Lab`

## Copy Role

Primary promise:

- solve basic voltage/current/resistance/power math fast

Secondary promise:

- help users understand what the result means in plain language

Tone:

- practical
- instructional
- zero-hype

## Page Structure

### Block 1: Hero

Should say:

- what the tool does
- who it helps
- what four values it solves

Should not say:

- anything about speaker impedance wiring
- anything that implies amp-safety certainty

### Block 2: Calculator

Should include:

- two-known-value selection
- computed results
- simple educational labels

### Block 3: Explanation

Should explain:

- what the values mean
- common use cases
- where this stops being the right tool

### Block 4: Next-step CTA

Should route users toward:

- `Ohmic Toolbox`
- `Wiring Lab` when the real need is speaker load/wiring
- broader interactive tools

## CTA Strategy

Primary CTA:

- `Open the full Ohmic Toolbox`

Secondary CTA:

- `Need speaker load and wiring help? Use Wiring Lab`

Tertiary CTA:

- `Explore more interactive tools`

## Guardrails

The standalone page must clearly say:

- this is a generic electrical solver
- speaker load, sub wiring, and amp-match logic live in `Wiring Lab`

Do not allow:

- speaker coil examples to dominate the page
- amp safety warnings to imply full system certification
- the page to become a half-built `Wiring Lab`

## SEO Direction

Recommended title direction:

- `Ohm's Law Calculator | Ohmic Audio`

Recommended meta-description direction:

- solve voltage, current, resistance, and power quickly with a practical
  Ohm's Law calculator from Ohmic Audio

Recommended internal-link role:

- linked from the interactive tools hub
- linked from relevant educational electrical pages
- linked from the full toolbox surface

## Implementation Preconditions

Before implementing this page:

1. keep the in-toolbox version stable
2. keep shared math canonical
3. keep the CTA path back into the toolbox clear
4. keep the `Wiring Lab` boundary explicit

## Summary

The first standalone public tool extraction should be:

- `/apps/ohms-law`
- positioned as a practical electrical utility
- clearly fed back into the broader toolbox
- explicitly separated from `Wiring Lab`
