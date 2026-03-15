# Ohmic Non-Repo Storage First Migration Packet

Purpose: define the first safe move packet for clearing local-only clutter out
of `B:\ohmic` without touching active repo truth or shared-system truth.

## Source Truth

- `docs/systems/OHMIC_REPO_STORAGE_BOUNDARY_2026-03-15.md`
- `docs/systems/OHMIC_NON_REPO_DOC_AND_ARTIFACT_ZONE_INVENTORY_2026-03-15.md`

## Packet Choice

The first safe packet should target `B:\ohmic\harvest\` only.

Why this packet first:

- it is already fenced as ignored local-only material
- it is small enough to move safely in one pass
- it contains obvious raw captures and working experiments
- it avoids mixing simple cleanup with the much larger
  `ohmic-audio-universe\` archive question

Do not include `ohmic-audio-universe\` or
`ohmic-audio-universe-db-reference\` in this first move packet.

## Exact Source Zones

Move only these three source zones:

1. `B:\ohmic\harvest\ohmic-audio-labs\captures\`
2. `B:\ohmic\harvest\ohmic-audio-labs\labs\lvgl-gauge-lab\`
3. `B:\ohmic\harvest\ohmic-audio-labs-firmware\esp32-amplab-sim\`

## Exact Destination Zones

Move each source into its new home without reshaping the internal contents:

| Source | Destination | Why |
| --- | --- | --- |
| `B:\ohmic\harvest\ohmic-audio-labs\captures\` | `B:\junk\captures\dayton\` | raw capture evidence belongs in junk/source storage |
| `B:\ohmic\harvest\ohmic-audio-labs\labs\lvgl-gauge-lab\` | `B:\ohmic-local\working\labs\lvgl-gauge-lab\` | local-only experiment should live in working storage, not the umbrella root |
| `B:\ohmic\harvest\ohmic-audio-labs-firmware\esp32-amplab-sim\` | `B:\ohmic-local\working\firmware-harvest\esp32-amplab-sim\` | small firmware harvest is working reference material, not repo truth |

## Packet Guardrails

- do not move anything under `B:\ohmic\repos\`
- do not move anything under `B:\ohmic\agent-system\`
- do not move anything under `B:\ohmic\docs\`, `manifests\`, `templates\`,
  `tools\`, or `generated\`
- do not move `B:\ohmic\ohmic-audio-universe\`
- do not move `B:\ohmic\ohmic-audio-universe-db-reference\`
- do not rename files inside the moved folders during this packet
- do not delete the parent `harvest\` tree until the moves are verified

## Move Method

Perform direct folder moves, not copy-and-prune rewrites.

Order:

1. create destination parent folders if missing
2. move `captures\`
3. move `lvgl-gauge-lab\`
4. move `esp32-amplab-sim\`
5. verify each destination contains the expected material
6. verify the source folders no longer exist at the old paths
7. only then remove any now-empty intermediate folders under `harvest\`

## Verification

After the packet:

- `B:\junk\captures\dayton\` exists and contains the Dayton capture artifacts
- `B:\ohmic-local\working\labs\lvgl-gauge-lab\` exists and still contains its
  app files and `node_modules\`
- `B:\ohmic-local\working\firmware-harvest\esp32-amplab-sim\` exists and still
  contains the four-file firmware stub
- the three old source paths under `B:\ohmic\harvest\` are gone
- no repo-owned or shared-system paths changed

## Follow-On Packets

After this packet is complete:

1. archive `ohmic-audio-universe-db-reference\`
2. archive `ohmic-audio-universe\` as a single snapshot
3. optionally split archived build logs and report copies into
   `B:\ohmic-local\reports\`

That keeps the first storage move packet short, reversible in intent, and well
below the risk of a broad umbrella-root cleanup.
