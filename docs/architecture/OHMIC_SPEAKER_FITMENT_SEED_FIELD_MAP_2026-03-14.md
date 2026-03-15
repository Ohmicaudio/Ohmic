# Ohmic Speaker Fitment Seed Field Map

Status: working field map
Date: 2026-03-14

## Purpose

Map the current speaker-db export into a first normalized fitment seed shape.

This is intentionally narrow:

- one row per vehicle/year-range/location fitment slot
- speaker-focused only
- no trim/package explosion yet

## Target Seed Shape

The first-pass fitment seed should center on this row identity:

- `manufacturer_name`
- `vehicle_model_name`
- `vehicle_year_start`
- `vehicle_year_end`
- `speaker_location_label`
- `speaker_size_label`

Supporting metadata should travel with the row:

- `source_name`
- `source_confidence`
- optional install detail fields when present

## Field Map

| Source field | Normalized target field | Confidence expectation | Missing-data rule |
| --- | --- | --- | --- |
| `make` | `manufacturer_name` | high | reject row only if completely missing |
| `model` | `vehicle_model_name` | high | reject row only if completely missing |
| `year_start` | `vehicle_year_start` | high | reject row if missing |
| `year_end` | `vehicle_year_end` | high | if missing, fall back to `vehicle_year_start` only when source clearly implies a single year |
| `location` | `speaker_location_label` | high when normalized, medium otherwise | keep raw normalized label if present; do not invent a new location |
| `size` | `speaker_size_label` | medium-high | keep normalized size string; if missing, row is not useful for first-pass fitment |
| `shape` | `speaker_shape` | low in current export | keep nullable; do not backfill from guesswork |
| `mounting_depth_mm` | `mounting_depth_mm` | low in current export | keep nullable; no inference |
| `notes` | `fitment_notes` | low in current export | keep nullable or empty; no synthetic notes |
| `source` | `source_name` | high | keep as provenance string |
| `confidence` | `source_confidence` | medium | keep current numeric value, but treat it as source-lane confidence rather than final truth |

## Derived Fields

These fields are safe to derive during seed shaping:

| Derived field | Construction rule |
| --- | --- |
| `vehicle_identity_key` | stable join of manufacturer, model, year_start, year_end |
| `fitment_slot_key` | stable join of vehicle identity plus speaker location |
| `fitment_seed_status` | start as `candidate` for this lane |

## Confidence Rules

Use three practical buckets for this first pass:

- `high`
  required row identity fields are present and normalized (`make`, `model`, `year_start`, `year_end`, `location`, `size`)
- `medium`
  row identity is present, but source confidence or source normalization quality is weaker
- `low`
  optional fields only, sparse provenance, or values that are present but not yet trustworthy enough to guide recommendations

Important current caveat:

- the visible export is effectively single-source
- current numeric confidence should be preserved, but not over-trusted as if it represented broad multi-source agreement

## First-Pass Missing-Data Policy

Reject from the initial fitment seed if any of these are missing:

- `make`
- `model`
- `year_start`
- `year_end` unless clearly single-year
- `location`
- `size`

Keep nullable for now:

- `shape`
- `mounting_depth_mm`
- `notes`

Do not derive or guess:

- trim/package detail
- speaker impedance
- OEM amplifier presence
- adapter/harness part numbers
- exact mounting depth from size alone

## First-Pass Mapping Call

The current export is good enough to build a speaker-fitment seed centered on:

- vehicle identity
- speaker location
- speaker size
- provenance/confidence metadata

It is not yet rich enough to act as a full install-spec database.
