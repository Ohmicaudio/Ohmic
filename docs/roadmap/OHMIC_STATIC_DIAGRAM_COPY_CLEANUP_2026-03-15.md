Status: implementation_note
Date: 2026-03-15
Project: ohmic-audio-static-content

# Ohmic Static Diagram Copy Cleanup

## Scope

Apply one bounded public-copy pass across engineering-diagram metadata and one
inline SVG caption so older rough placeholder wording reads more like public
reference material.

## Applied Changes

- `public/assets/engineering-diagrams/image_catalog.json`
  - `AmpLab instrument page (signal chain)` now reads
    `Ohmic Audio Labs signal chain reference`
  - `AmpLab UI placeholders` now reads `Measurement UI templates`
  - `dummy data` now reads `template data`
- `public/assets/engineering-diagrams/metadata/dsp_signal_chain.svg.txt`
  - signal-chain placement now points at `Ohmic Audio Labs signal chain
    reference`
- `public/assets/engineering-diagrams/metadata/measurement_template_fr_phase.svg.txt`
  - measurement template placement and notes now use `Measurement UI templates`
    and `template data`
- `public/assets/engineering-diagrams/images/graphs/measurement_template_fr_phase.svg`
  - inline footer copy now says
    `Template: replace template data with measured curves from live tools.`

## Why

The older wording mixed rough placeholder language with product-specific
references in places that are better treated as shared public reference assets.

This pass keeps the assets usable while making them read less like internal mock
material.

## Verification

- diff sanity check on the four touched asset files

## Boundary

This is a copy-alignment pass only.

It does not regenerate diagrams, retheme the illustration set, or rename the
broader engineering-diagram catalog.
