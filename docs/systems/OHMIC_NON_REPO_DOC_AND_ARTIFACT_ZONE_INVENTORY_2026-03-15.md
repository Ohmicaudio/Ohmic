# Ohmic Non-Repo Doc And Artifact Zone Inventory

Purpose: identify the zones under `B:\ohmic` that are neither product-repo
truth nor shared-system truth so the next cleanup packet can move them without
touching active implementation surfaces.

## Scope Exclusions

This inventory explicitly leaves out:

- `B:\ohmic\repos\*` product repo truth
- `B:\ohmic\agent-system\*` shared queue, memory, claim, and handoff truth
- `B:\ohmic\docs\*`, `manifests\*`, `templates\*`, `tools\*`, and `generated\*`
  when they are serving the live umbrella system

The goal here is not broad repo cleanup. It is just the mixed local-only
artifact zones still sitting under the umbrella root.

## Existing Ignore Boundary

The top-level `.gitignore` already marks these as non-canonical local zones:

- `B:\ohmic\harvest\`
- `B:\ohmic\ohmic-audio-universe\`
- `B:\ohmic\ohmic-audio-universe-db-reference\`

That makes them the obvious first inventory targets.

## Inventory

| Zone | Approx Size | Files | Why It Is Not Canonical Truth | Suggested Destination |
| --- | ---: | ---: | --- | --- |
| `B:\ohmic\harvest\` | 91.34 MB | 3,517 | raw captures, one-off lab project, and small firmware harvest copied into the umbrella root | split between `B:\junk\*` and `B:\ohmic-local\working\*` |
| `B:\ohmic\ohmic-audio-universe\` | 2,142.81 MB | 73,200 | nested Git repo snapshot with its own `node_modules`, docs, captures, build logs, and report copies, but not mapped as an active repo home under `B:\ohmic\repos\*` | `B:\ohmic-local\archive\repo-snapshots\ohmic-audio-universe\` |
| `B:\ohmic\ohmic-audio-universe-db-reference\` | 0.01 MB | 4 | tiny detached reference pack not wired into live repo or shared-system truth | `B:\ohmic-local\archive\reference-packs\ohmic-audio-universe-db-reference\` |

## Zone Details

### 1. `B:\ohmic\harvest\`

Sub-zones:

- `B:\ohmic\harvest\ohmic-audio-labs\captures\`
  - contains two `.pcapng` files, one `.tsv`, one `.txt`, and four `.log`
    files
  - examples: `dayton_capture.pcapng`, `dayton_hid_data.tsv`,
    `preview-helper.err.log`
  - these are raw capture artifacts, not project truth
- `B:\ohmic\harvest\ohmic-audio-labs\labs\lvgl-gauge-lab\`
  - standalone lab app with `package.json`, `package-lock.json`,
    `migrated_prompt_history\`, and a populated `node_modules\`
  - useful as working material, but not a canonical repo or shared-system lane
- `B:\ohmic\harvest\ohmic-audio-labs-firmware\esp32-amplab-sim\`
  - four-file firmware simulation stub
  - small and plausibly useful, but still harvest material rather than repo
    truth

Recommended destinations:

- raw captures and logs -> `B:\junk\captures\dayton\`
- local lab project -> `B:\ohmic-local\working\labs\lvgl-gauge-lab\`
- small firmware stub -> `B:\ohmic-local\working\firmware-harvest\esp32-amplab-sim\`

### 2. `B:\ohmic\ohmic-audio-universe\`

This is a full nested Git repo snapshot living outside the active repo map.

It contains:

- its own `.git\`
- its own `node_modules\`
- product-style trees like `src\`, `packages\`, `firmware\`, `software\`,
  `docs\`, `schemas\`, and `tools\`
- root-level build and report artifacts such as:
  - `build_fw_upload.txt`
  - `build_v6.txt`
  - `external-integration-pack.zip`
  - `ohmic-audio-labs-threat-model.md`
  - `security_best_practices_report.md`

This material may still be worth keeping, but it is not living in the declared
repo homes under `B:\ohmic\repos\*`, so it should not continue to occupy the
umbrella root.

Recommended destination:

- archive the tree as one repo snapshot at
  `B:\ohmic-local\archive\repo-snapshots\ohmic-audio-universe\`

Optional convenience split after the snapshot move:

- copy the root `build_*.txt`, `.zip`, and report files into
  `B:\ohmic-local\reports\ohmic-audio-universe\` if quick human access is still
  needed

### 3. `B:\ohmic\ohmic-audio-universe-db-reference\`

This is a tiny detached reference pack containing:

- `software\backend\docs\specs\BACKEND_SERVING_STACK.md`
- `tools\semantic-index\docker-compose.yml`
- `tools\semantic-index\indexer.py`
- `tools\semantic-index\README.md`

It is small enough that it does not create immediate storage pressure, but it
still belongs in a local archive/reference area instead of the umbrella root.

Recommended destination:

- `B:\ohmic-local\archive\reference-packs\ohmic-audio-universe-db-reference\`

## Grouped Move Candidates By Destination

### `B:\junk\`

Move raw evidence and capture drops here:

- `harvest\ohmic-audio-labs\captures\*.pcapng`
- `harvest\ohmic-audio-labs\captures\*.tsv`
- `harvest\ohmic-audio-labs\captures\*.log`
- `harvest\ohmic-audio-labs\captures\*.txt`

### `B:\ohmic-local\working\`

Move active but non-canonical working material here:

- `harvest\ohmic-audio-labs\labs\lvgl-gauge-lab\`
- `harvest\ohmic-audio-labs-firmware\esp32-amplab-sim\`

### `B:\ohmic-local\archive\`

Move preserved but non-live reference material here:

- `ohmic-audio-universe\`
- `ohmic-audio-universe-db-reference\`
- any abandoned harvest experiments that are worth keeping but no longer need a
  working home

### `B:\ohmic-local\reports\`

Move delivery copies and quick-open report bundles here when they should remain
easy to open but not live in Git-centered zones:

- root `build_*.txt` files from `ohmic-audio-universe\`
- `external-integration-pack.zip`
- report copies such as `ohmic-audio-labs-threat-model.md` and
  `security_best_practices_report.md` if retained separately from the repo
  snapshot

## First Safe Move Order

1. Move the raw `harvest\ohmic-audio-labs\captures\` evidence bundle to
   `B:\junk\captures\dayton\`.
2. Move `harvest\ohmic-audio-labs\labs\lvgl-gauge-lab\` into
   `B:\ohmic-local\working\labs\`.
3. Move `harvest\ohmic-audio-labs-firmware\esp32-amplab-sim\` into
   `B:\ohmic-local\working\firmware-harvest\`.
4. Move `ohmic-audio-universe-db-reference\` into
   `B:\ohmic-local\archive\reference-packs\`.
5. Move `ohmic-audio-universe\` as a single archive snapshot instead of trying
   to sort its 2+ GB contents in place.

That sequence removes the obvious clutter first while keeping active repo truth
and shared-system truth out of the blast radius.
