Status: implementation_note
Date: 2026-03-15
Project: ohmic

# Ohmic External UI Placeholder Documentation Boundary

## Rule

If placeholder notes are still operationally useful, keep them in external
documentation rather than in public or operator-facing UI copy.

## Keep In External Documentation

- roadmap notes
- task packets
- asset metadata notes
- QA and handoff docs
- generation briefs and staging docs

## Keep Out Of UI Surfaces

- public landing copy
- public page captions where the wording reads like internal scaffolding
- shell status labels
- deck copy
- control labels and empty-state language

## Preferred Replacement Pattern

- `placeholder` becomes `template`, `reference`, `planned`, or a plain-language
  description of what the user is seeing
- rough internal notes about missing real data, mock content, or pending visual
  replacement should move to external docs instead of surfacing in UI

## Why

The project still needs honest staging notes, but those notes reduce trust when
they leak into live surfaces.

External documentation preserves implementation truth without making the
product feel unfinished.

## Immediate Application

- continue cleaning public static-caption and metadata wording when it leaks
  rough placeholder language
- resume app-shell copy cleanup with the same rule once the current claim on the
  hardware-shell surface clears
