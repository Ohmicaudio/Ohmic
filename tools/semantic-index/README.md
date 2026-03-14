# Semantic Index Tooling

This is the local Chroma-based context acceleration layer staged into the umbrella repo.

It now indexes the multi-repo Ohmic layout through a manifest:

- [`corpus.yaml`](/mnt/b/ohmic/tools/semantic-index/corpus.yaml)

Current high-value seeded sources include:

- `B:\ohmic\agent-system\**\*.md`
- `B:\ohmic\repos\ohmic-audio-labs\AGENTS.md`
- `B:\ohmic\repos\cyd-remote\AGENTS.md`
- umbrella docs under `B:\ohmic\docs\`
- active repo docs and schemas defined in the corpus manifest

Use:

```bash
cd /mnt/b/ohmic/tools/semantic-index
docker compose up -d
python3 indexer.py --dry-run
python3 indexer.py
```

For a fast shared-agent bootstrap seed instead of the full corpus:

```bash
cd /mnt/b/ohmic/tools/semantic-index
python3 indexer.py --manifest agent-bootstrap-corpus.yaml --dry-run
python3 indexer.py --manifest agent-bootstrap-corpus.yaml
```

For staged full-corpus indexing on a busy workspace, prefer the stage runner:

```powershell
& B:\ohmic\tools\semantic-index\stage-index.ps1 -Stage agent-bootstrap
& B:\ohmic\tools\semantic-index\stage-index.ps1 -Stage core-docs
& B:\ohmic\tools\semantic-index\stage-index.ps1 -Stage runtime
& B:\ohmic\tools\semantic-index\stage-index.ps1 -Stage firmware
& B:\ohmic\tools\semantic-index\stage-index.ps1 -Stage static
```

Or run all non-bootstrap stages in sequence:

```powershell
& B:\ohmic\tools\semantic-index\stage-index.ps1 -Stage all
```

Recommended order:

1. `agent-bootstrap`
2. `core-docs`
3. `runtime`
4. `firmware`
5. `static`

Use `-DryRun` with any stage to print the planned document set instead of writing to Chroma:

```powershell
& B:\ohmic\tools\semantic-index\stage-index.ps1 -Stage runtime -DryRun
```

Notes:

- recursive stage discovery now prunes excluded folders such as nested `node_modules`, `.pio`, `dist`, and archive trees before matching files
- on the current workspace, `core-docs` dry-runs complete in under a second and `runtime` dry-runs complete in about a second instead of stalling on nested dependency trees
- `cyd-remote` is intentionally indexed from a curated live-doc surface plus code and schemas, not from the full vendor/reference dump under `docs/`
- a full staged `all` run is now practical for foreground use on this machine

Then read:

- [`/mnt/b/ohmic/docs/systems/DOCKER_SEMANTIC_INDEX_AND_CONTEXT_GUIDE_2026-03-12.md`](/mnt/b/ohmic/docs/systems/DOCKER_SEMANTIC_INDEX_AND_CONTEXT_GUIDE_2026-03-12.md)

This tooling is for retrieval and awareness only. Git repos remain source of truth.

Legacy/source-only paths should not be used as active work roots.
