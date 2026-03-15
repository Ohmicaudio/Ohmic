# Ohmic Toolbox Calculator Inventory

Status: active inventory
Date: 2026-03-14

## Purpose

Capture the `A:\designlab\apps\ohmic-toolbox` calculator set and map each tool to a likely future home in the Ohmic ecosystem.

## Current Toolbox Set

The current toolbox app contains ten compact utility panels.

### 1. Lithium Lab

Inputs:

- cell preset
- series count
- parallel count

Outputs:

- nominal voltage
- charged voltage
- total Ah
- weight

Likely future homes:

- `Ohmic Pro` utility panel
- hardware power-planning helpers
- AmpLab / power-master planning support

### 2. Wiring Lab

Inputs:

- sub count
- voice coil type
- coil impedance
- wiring mode

Outputs:

- resulting impedance
- visual wiring diagram

Likely future homes:

- BassBuilder
- subwoofer design pages
- quick lead-gen mini-tool

Future evolution:

- speaker impedance and final load calculator
- coil and sub-count option explorer
- amp-target load matcher
- safe/unsafe wiring explanation
- better plain-language diagrams and why-this-works guidance

### 3. Ohm's Law

Inputs:

- volts
- ohms
- amps
- watts

Outputs:

- derived electrical values

Likely future homes:

- reference utility
- educational content companion
- mobile quick tool

Boundary note:

- this should remain the generic electrical solver
- it should not absorb speaker-load and sub wiring logic
- speaker impedance, coil configuration, final load, and amp-match explanation belong under `Wiring Lab`

### 4. Time Alignment

Inputs:

- left / right / sub distances

Outputs:

- delay values

Likely future homes:

- tuning utility
- handheld helper
- AmpLab setup flow

### 5. Box Volume

Inputs:

- enclosure dimensions
- material thickness
- port dimensions
- sub displacement

Outputs:

- net volume
- tuning frequency

Likely future homes:

- BassBuilder
- enclosure quick-start tools
- content-side utility embed

### 6. Wire Gauge

Inputs:

- amperage
- run length
- material
- number of runs

Outputs:

- recommended gauge
- estimated voltage drop

Likely future homes:

- reference tool
- install planning panel
- OSM wiring validation helpers later

### 7. Acoustic Gain

Inputs:

- old power
- new power
- old distance
- new distance

Outputs:

- estimated dB gain / loss

Likely future homes:

- beginner education utility
- comparison tool
- sales funnel mini-tool

### 8. Cone Area

Inputs:

- driver diameter
- quantity

Outputs:

- total cone area

Likely future homes:

- SPL and enclosure planning
- BassBuilder
- comparison pages

### 9. Amp Strapping

Inputs:

- amp wattage
- strap mode

Outputs:

- estimated total power

Likely future homes:

- electrical planning toolset
- install planning helpers
- future AmpLab ecosystem calculators

### 10. System Health

Inputs:

- alternator amperage
- battery Ah
- total system watts

Outputs:

- rough stable / critical status

Likely future homes:

- power planning
- AmpLab preflight helpers
- hardware readiness calculators

## Recommended Product Mapping

### Near-Term Public Mini-Tools

These are the strongest candidates for small public-facing utilities:

- Wiring Lab
- Box Volume
- Wire Gauge
- Ohm's Law
- Cone Area

### Near-Term In-App Utility Panels

These are better as logged-in or product-adjacent utilities:

- Lithium Lab
- Time Alignment
- System Health
- Amp Strapping

### Best BassBuilder Feeders

- Wiring Lab
- Box Volume
- Cone Area

### Best OSM Feeders Later

- Wire Gauge
- System Health
- Time Alignment

These should not be forced into `OSM` now, but the logic can later inform planner-side validation, helpers, and side panels.

## Salvage Recommendation

Do not move the entire toolbox as one frozen artifact.

Use a staged salvage approach:

1. preserve the original toolbox as a reference implementation
2. extract calculator logic into reusable modules
3. choose a small first public wave
4. later decide whether a standalone `Ohmic Toolbox` surface still makes sense

## First Recommended Wave

Best first wave:

- Wiring Lab
- Box Volume
- Wire Gauge

Why:

- broad appeal
- strong educational and SEO value
- easy to repurpose as placeholders inside future product surfaces

## Notes

- the current toolbox is useful even if imperfect
- it is good enough to serve as placeholder logic and UI direction
- correctness and modularization should come before any major visual polish pass
