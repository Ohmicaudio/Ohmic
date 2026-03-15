Status: done
Priority: medium
Date: 2026-03-15
Project: ohmic
Owner: d
Claim ID: 20260315T134823Z-a35ce552

# Execute First Harvest Storage Migration Packet

## Goal

Execute the first bounded non-repo storage migration packet defined for the
`harvest\` subtree.

## Use

- `docs/systems/OHMIC_NON_REPO_STORAGE_FIRST_MIGRATION_PACKET_2026-03-15.md`

## Scope

- move `B:\ohmic\harvest\ohmic-audio-labs\captures\` to
  `B:\junk\captures\dayton\`
- move `B:\ohmic\harvest\ohmic-audio-labs\labs\lvgl-gauge-lab\` to
  `B:\ohmic-local\working\labs\lvgl-gauge-lab\`
- move `B:\ohmic\harvest\ohmic-audio-labs-firmware\esp32-amplab-sim\` to
  `B:\ohmic-local\working\firmware-harvest\esp32-amplab-sim\`

## Out Of Scope

- `B:\ohmic\ohmic-audio-universe\`
- `B:\ohmic\ohmic-audio-universe-db-reference\`
- anything under `B:\ohmic\repos\`
- anything under `B:\ohmic\agent-system\`

## Acceptance

- the three source zones are moved to their exact destinations
- source paths no longer exist at the old locations
- no repo-owned or shared-system paths change

## Outcome

Completed on 2026-03-15.

Result:

- moved `B:\ohmic\harvest\ohmic-audio-labs\captures\` to
  `B:\junk\captures\dayton\`
- moved `B:\ohmic\harvest\ohmic-audio-labs\labs\lvgl-gauge-lab\` to
  `B:\ohmic-local\working\labs\lvgl-gauge-lab\`
- moved `B:\ohmic\harvest\ohmic-audio-labs-firmware\esp32-amplab-sim\` to
  `B:\ohmic-local\working\firmware-harvest\esp32-amplab-sim\`
- verified the three old source paths no longer exist
- left the pre-existing `B:\ohmic\harvest\ohmic-audio-labs\labs\README.md`
  in place because it was outside the packet scope
