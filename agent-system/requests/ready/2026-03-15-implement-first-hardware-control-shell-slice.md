Status: ready
Priority: high
Date: 2026-03-15
Project: ohmic-audio-labs

# Implement First Hardware Control Shell Slice

## Goal

Take the first bounded hardware shell slice from the split packet into a real
commit.

## Source Packet

- `docs/roadmap/OHMIC_HARDWARE_CONTROL_FIRST_SAFE_SLICE_2026-03-15.md`

## Exact Focus

- `components/Hardware/HardwareDeckPanel.tsx`
- `components/Hardware/HardwareModalLayer.tsx`
- `components/Hardware/HardwareTopBar.tsx`
- `components/Hardware/UniversalOverlayWorkspace.tsx`
- `components/Hardware/useHardwareShellChrome.ts`
- `components/Hardware/useHardwareWorkspacePresentation.ts`
- `components/Hardware/useHardwarePersistence.ts`
- `components/Hardware/README.md`

## Acceptance

- stays within the packet boundary
- excludes `services/hardware/*` tracked churn
- excludes Android and backend churn
- lands as one coherent hardware shell commit
