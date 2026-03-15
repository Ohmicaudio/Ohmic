Status: ready
Priority: low
Date: 2026-03-15
Project: ohmic-audio-labs

# Decide OSM Tailwind Config Ownership

## Goal

Decide whether the OSM app should own a local Tailwind config or remove the
unused Tailwind path that is currently producing a non-blocking build warning.

## Source

- `docs/roadmap/OHMIC_OSM_TAILWIND_CONTENT_WARNING_FOLLOWUP_2026-03-15.md`

## Focus

- Tailwind config ownership in `products/ohmic-osm`
- whether Tailwind is truly needed in the OSM app path
- narrow config fix path

## Acceptance

- one clear ownership decision exists for the OSM Tailwind warning
- the later fix is easier to implement without reopening unrelated OSM work

## Completion Notes

- Decision note created at
  `docs/roadmap/OHMIC_OSM_TAILWIND_CONFIG_OWNERSHIP_DECISION_2026-03-15.md`
- Decision: do not give OSM its own Tailwind config by default
- Current OSM app uses plain local CSS rather than Tailwind directives or utility classes
- The warning is therefore treated as inherited root Tailwind/PostCSS processing,
  not as missing OSM Tailwind ownership
