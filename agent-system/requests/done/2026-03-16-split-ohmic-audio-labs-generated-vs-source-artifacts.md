Status: done
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs
Owner: d
Claim ID: 20260316T034711Z-7c77c1d3

# Split Ohmic Audio Labs Generated Vs Source Artifacts

## Goal

Separate generated or runtime artifacts from true source artifacts in the dirty
tree so future commits and classification passes stop mixing the two.

## Focus

- generated backend storage artifacts
- built frontend and backend output
- package-install output
- tracked support data that still belongs to source

## Acceptance

- generated/runtime artifacts are distinguished from true source artifacts
- the next source cleanup waves can focus on real code and docs

## Result

- split the dirty tree in
  `docs/roadmap/OHMIC_AUDIO_LABS_GENERATED_VS_SOURCE_ARTIFACT_SPLIT_2026-03-16.md`
- separated build/install/runtime/index exhaust from actual product, service,
  contract, and test source surfaces
- identified the few mixed zones that still need dedicated follow-on
  classification instead of being swept into generic cleanup
