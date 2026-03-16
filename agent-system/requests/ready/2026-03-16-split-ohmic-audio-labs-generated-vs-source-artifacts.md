Status: ready
Priority: high
Date: 2026-03-16
Project: ohmic-audio-labs

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
