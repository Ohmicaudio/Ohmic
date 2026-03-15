Status: working rules
Date: 2026-03-15

# Ohmic Wiring Lab Safe Amp-Match Rules

## Purpose

Define the minimum trusted rule set for turning `Wiring Lab` from a raw final
load calculator into a useful amp-match helper.

This is intentionally smaller than a full expert system.

## Core Product Rule

`Wiring Lab` should answer three questions, not one:

1. what final load does this wiring create
2. how well does that load fit the intended amplifier target
3. why is that result good, awkward, or unsafe

## Inputs The Rules Depend On

Minimum smart-lane inputs:

- `sub_count`
- `voice_coil_type`
- `coil_impedance_ohms`
- `wiring_method`
- `amp_target_min_load_ohms`
- optional `amp_preferred_load_ohms`
- optional `amp_mode`
  - `mono`
  - `bridged`
  - `stereo`

## Output Classes

Every evaluated combination should produce:

- `final_load_ohms`
- `fit_class`
- `fit_reason`
- `amp_match_note`
- optional `alternative_note`

## Fit Classes

Use exactly these first-pass classes:

### 1. Good Match

Meaning:

- at or above the amplifier minimum safe load
- close to the preferred target load when one exists
- common enough that the result is easy to use and explain

Typical examples:

- `1 ohm` on a mono amp designed for `1 ohm`
- `2 ohm` final on an amp happiest at `2 ohm`
- `4 ohm` bridged target when the amplifier expects `4 ohm` bridged minimum

### 2. Usable But Awkward

Meaning:

- technically safe
- but not close to the most useful target
- or results in an oddball load with weaker power utilization
- or is unlikely to be what most users actually wanted

Typical examples:

- `3 ohm` final load with no clear amplifier target advantage
- `8 ohm` final where the amp will run safely but leave obvious output on the
  table
- safe but unusual combinations that deserve explanation

### 3. Unsafe Or Poor Fit

Meaning:

- below the amplifier minimum safe load
- or clearly mismatched to the intended amp mode
- or so awkward that the tool should steer the user toward a different driver
  or wiring choice

Typical examples:

- `0.5 ohm` result when the target amp is only safe to `1 ohm`
- `2 ohm` bridged load where the bridged minimum is `4 ohm`
- combinations that are technically calculable but functionally a bad idea

## Minimum Safe Rules

### Rule 1: Never call below-minimum safe

If:

- `final_load_ohms < amp_target_min_load_ohms`

Then:

- `fit_class = unsafe_or_poor_fit`

And the explanation must say:

- the calculated load is below the amplifier's minimum safe target
- this can cause instability, shutdown, overheating, or damage

### Rule 2: Preferred load beats merely safe load

If:

- the load is safe
- but meaningfully different from `amp_preferred_load_ohms`

Then:

- downgrade from `good_match` to `usable_but_awkward` unless there is a clear
  reason to keep it `good_match`

### Rule 3: Bridged mode is stricter

If:

- `amp_mode = bridged`

Then:

- the comparison target must use the bridged minimum load, not the per-channel
  minimum load

The copy must explicitly say `bridged load` when the rule is being applied.

### Rule 4: Oddball safe loads need a plain-language warning

If the result is safe but lands on an uncommon practical target such as:

- `3 ohm`
- `6 ohm`

Then:

- `fit_class = usable_but_awkward`

Unless a future amp-specific rule proves that target is actually desirable.

### Rule 5: High-load underuse is not unsafe, but it is still guidance-worthy

If:

- the load is much higher than the likely useful target

Then:

- do not call it unsafe
- do call out that the combination may leave amplifier output on the table

That is a `usable_but_awkward` case, not a panic case.

## Explanation Templates

Each result should include three explanation layers.

### A. What happened

Example:

- `Two DVC 4-ohm subs wired in parallel create a 1-ohm final load.`

### B. How it fits the amp target

Example:

- `That matches a mono amplifier rated for 1-ohm operation and is a normal high-output target load.`

Or:

- `That load is electrically safe, but it is higher than the amplifier's preferred target and will likely reduce available output.`

Or:

- `That load falls below the amplifier's safe minimum and should not be used on this setup.`

### C. What to do next

Example:

- `If you want a cleaner 2-ohm target, choose a different coil option or change the sub count.`

## Alternative Recommendation Rules

When a combination is not `good_match`, the tool should prefer one of these
next-step suggestions:

- change wiring method
- change voice coil option
- change sub count
- choose an amp with a different target load

Do not dump a huge decision tree at first.

One short alternative note is enough for the first trusted version.

## What The Tool Should Not Pretend To Know Yet

Do not claim:

- exact thermal safety
- exact power delivery per real amplifier model
- exact loudness outcome
- enclosure-dependent behavior
- anything that needs amp-specific datasheet modeling unless that data exists

This first ruleset is about trusted matching guidance, not magic certainty.

## Recommended First Practical Targets

Treat these as the first practical anchor loads:

- `1 ohm mono`
- `2 ohm mono`
- `4 ohm mono`
- `4 ohm bridged`
- `2 ohm stereo per channel`
- `4 ohm stereo per channel`

That covers the majority of sane early use cases without pretending to cover
everything.

## Implementation Guidance

The first smart `Wiring Lab` version should work like this:

1. calculate final load
2. compare against minimum and preferred targets
3. assign one of the three fit classes
4. render a short explanation
5. optionally suggest one next better direction

## Summary

The first trustworthy smarter `Wiring Lab` does not need to know everything.

It needs to do four things reliably:

- calculate the load
- classify the fit
- explain the result
- steer the user away from obviously bad choices
