# OhmicAudio High-Risk Worked Example Verification

Date: 2026-03-15
Status: completed

## Purpose

Check the highest-risk public worked examples and correct trust-impacting math
or wording defects without widening into a full editorial sweep.

## Corrected Pages

### 1. Speaker Impedance - Series and Parallel

Path:

- `B:\ohmic\repos\ohmic-audio-static-content\public\reference\math-measurement\speaker-impedance-series-and-parallel\index.html`

Fix:

- removed contradictory intermediate claims about getting a 2-ohm final load
  from two DVC 4-ohm subwoofers
- replaced the worked example with a consistent explanation showing the common
  symmetric outcomes: 1 ohm or 4 ohms

### 2. Battery Runtime Calculation

Path:

- `B:\ohmic\repos\ohmic-audio-static-content\public\reference\math-measurement\battery-runtime-calculation\index.html`

Fix:

- removed the visible self-contradicting Peukert detour
- corrected the worked example from `0.86 hours = 52 minutes` to about
  `0.823 hours = 49 minutes`
- tightened the bottom-line interpretation so the page no longer overstates the
  runtime

### 3. Ported Box - Helmholtz Resonance

Path:

- `B:\ohmic\repos\ohmic-audio-static-content\public\reference\math-measurement\ported-box-helmholtz-resonance\index.html`

Fix:

- removed heavy mojibake from the title, formulas, units, and worked example
- kept the worked-example port-length result at `8.5 inches`
- replaced the port-velocity mini-example with a more realistic 12-inch driver
  area assumption so the numbers match the rest of the scenario better

### 4. Voltage Drop in DC Circuits

Path:

- `B:\ohmic\repos\ohmic-audio-static-content\public\reference\math-measurement\voltage-drop-in-dc-circuits\index.html`

Fix:

- removed mojibake from the formulas, units, and conclusions
- kept the example math unchanged because the voltage-drop arithmetic checked
  out

## Verified Unchanged

### Ohms Law And Power

- `B:\ohmic\repos\ohmic-audio-static-content\public\reference\math-measurement\ohms-law-and-power\index.html`
- verified `500 / 0.85 = 588 W`, `588 / 12 = 49 A`, and the 25% design margin
  to `61 A`

### Sealed Box System Parameters

- `B:\ohmic\repos\ohmic-audio-static-content\public\reference\math-measurement\sealed-box-system-parameters\index.html`
- verified the worked-example values for `Vb ~= 246 L`, `Qtc ~= 1.03`, and
  `Fc ~= 55.4 Hz`

## Remaining Boundary

This pass did not attempt to normalize every math page or every metadata stub.

It only repaired the worked examples that were most likely to undermine public
technical trust immediately.
