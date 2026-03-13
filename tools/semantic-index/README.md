# Semantic Index Tooling

This is the local Chroma-based context acceleration layer staged into the umbrella repo.

It now indexes the multi-repo Ohmic layout through a manifest:

- [`corpus.yaml`](/mnt/b/ohmic/tools/semantic-index/corpus.yaml)

Use:

```bash
cd /mnt/b/ohmic/tools/semantic-index
docker compose up -d
python3 indexer.py --dry-run
python3 indexer.py
```

Then read:

- [`/mnt/b/ohmic/docs/systems/DOCKER_SEMANTIC_INDEX_AND_CONTEXT_GUIDE_2026-03-12.md`](/mnt/b/ohmic/docs/systems/DOCKER_SEMANTIC_INDEX_AND_CONTEXT_GUIDE_2026-03-12.md)

This tooling is for retrieval and awareness only. Git repos remain source of truth.
