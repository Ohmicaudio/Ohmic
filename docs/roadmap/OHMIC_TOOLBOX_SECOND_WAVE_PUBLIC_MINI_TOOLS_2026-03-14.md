Status: recommendation
Date: 2026-03-14

# Ohmic Toolbox Second-Wave Public Mini-Tools

## Decision

After the first-wave toolbox import, the recommended second public wave is:

1. `Ohm's Law`
2. `Cone Area`
3. `Acoustic Gain`

## Why These Three

### 1. Ohm's Law

Why it belongs next:

- broad search value
- immediately understandable
- easy to reuse in education, quick tools, and install contexts
- already extracted into shared math in the current codebase

Best role:

- public utility
- learning companion
- quick electrical sanity check

Important boundary:

- `Ohm's Law` is the generic electrical solver
- it is not the speaker impedance or final load calculator
- speaker wiring and amp-load explanation stay under `Wiring Lab` and future speaker-match tools

### 2. Cone Area

Why it belongs next:

- strong fit for SPL, enclosure, and comparison content
- useful as both a calculator and a support figure inside design workflows
- already extracted into shared math in the current codebase

Best role:

- public utility
- BassBuilder feeder
- comparison-page helper

### 3. Acoustic Gain

Why it belongs next:

- easy to explain and market
- high utility for people comparing upgrades
- good educational/search fit without needing hardware

Best role:

- public utility
- upgrade-comparison helper
- educational calculator

## Not In Second Public Wave

### Wiring Lab Expansion

Do not treat this as part of the generic electrical second wave.

Reason:

- `Wiring Lab` is already first-wave and should evolve as its own deeper lane
- future work there should focus on speaker load, wiring options, amp-match guidance, diagrams, and plain-language explanation
- that is a different problem from generic `Ohm's Law`

### Time Alignment

Keep out of the second public wave for now.

Reason:

- strong tool, but better positioned as a tuning/helper lane than a general public mini-tool
- likely more valuable later inside tuning surfaces, handheld helpers, or hardware-linked flows

### Lithium Lab

Keep out for now.

Reason:

- useful, but closer to Pro and hardware planning than broad public entry

### System Health

Keep out for now.

Reason:

- likely more useful once tied to stronger power-planning and hardware readiness workflows

### Amp Strapping

Keep out for now.

Reason:

- narrower audience
- more useful after the basic electrical and design utilities are established

## Recommended Follow-On Order

1. finish shared-math extraction for `Ohm's Law`
2. finish shared-math extraction for `Cone Area`
3. extract `Acoustic Gain`
4. then decide whether to expose the second-wave utilities through the same toolbox surface or as separate public mini-tool pages

## Rule

Do not widen into all remaining calculators at once.

Treat second-wave as:

- one educational electrical utility
- one design/SPL utility
- one comparison/upgrade utility

That gives breadth without turning the toolbox lane back into a dump.
