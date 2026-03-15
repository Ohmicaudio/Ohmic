Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260315T171408Z-c4e58103

# Implement First Smart Wiring Lab Surface

## Goal

Implement the first smart `Wiring Lab` surface inside `ohmic-toolbox` using
the existing result model and safe amp-match rules packets.

## Source

- `docs/roadmap/OHMIC_WIRING_LAB_IMPLEMENTATION_PACKET_2026-03-15.md`
- `docs/roadmap/OHMIC_WIRING_LAB_SAFE_AMP_MATCH_RULES_2026-03-15.md`
- `docs/roadmap/OHMIC_WIRING_LAB_UI_STATE_MODEL_2026-03-15.md`

## Focus

- toolbox `Wiring Lab` panel
- deterministic fit classification
- explanation and next-step output blocks

## Acceptance

- `ohmic-toolbox` exposes the first smart `Wiring Lab` state and result surface
- result classes and explanation blocks are deterministic
- toolbox-local checks pass

## Outcome

Completed on 2026-03-15.

Result:

- implemented the first smart Wiring Lab preset and amp-fit flow in `ohmic-toolbox`
- moved deterministic fit classification, explanation generation, and suggestion output into shared toolbox math
- verified the slice with toolbox-local tests, shared math regression, and toolbox build

## Artifact

- `B:\ohmic\repos\ohmic-audio-labs\apps\ohmic-toolbox\src\App.tsx`
- `B:\ohmic\repos\ohmic-audio-labs\apps\ohmic-toolbox\src\store.ts`
- `B:\ohmic\repos\ohmic-audio-labs\utils\toolboxMath.ts`
