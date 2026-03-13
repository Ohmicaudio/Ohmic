#!/usr/bin/env python3
from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
from typing import Any

import yaml


TOOL_ROOT = Path(__file__).resolve().parent
DEFAULT_MANIFEST = TOOL_ROOT / "corpus.yaml"
DEFAULT_COLLECTION = "ohmic_context"


def load_manifest(path: Path) -> dict[str, Any]:
    data = yaml.safe_load(path.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise ValueError(f"Manifest is not an object: {path}")
    return data


def normalize_patterns(raw: list[Any] | None) -> list[str]:
    patterns: list[str] = []
    for item in raw or []:
        if isinstance(item, str) and item.strip():
            patterns.append(item.strip())
    return patterns


def matches_any(rel_path: str, patterns: list[str]) -> bool:
    if not patterns:
        return False
    rel = Path(rel_path)
    for pattern in patterns:
        if rel.match(pattern):
            return True
    return False


def iter_repo_files(repo_entry: dict[str, Any]) -> list[tuple[Path, str]]:
    root = Path(str(repo_entry["root"])).resolve()
    includes = normalize_patterns(repo_entry.get("include"))
    excludes = normalize_patterns(repo_entry.get("exclude"))
    if not root.exists():
        raise FileNotFoundError(f"Repo root does not exist: {root}")

    files: dict[str, Path] = {}
    for pattern in includes:
        for path in root.glob(pattern):
            if not path.is_file():
                continue
            rel_path = path.relative_to(root).as_posix()
            if matches_any(rel_path, excludes):
                continue
            files[rel_path] = path

    return sorted(((path, rel_path) for rel_path, path in files.items()), key=lambda item: item[1])


def read_text_file(path: Path) -> str | None:
    try:
        return path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        return None


def make_doc_id(repo_name: str, rel_path: str) -> str:
    digest = hashlib.sha1(f"{repo_name}:{rel_path}".encode("utf-8")).hexdigest()
    return digest


def collect_documents(manifest: dict[str, Any]) -> tuple[str, list[str], list[dict[str, Any]], list[str]]:
    collection_name = str(manifest.get("collection") or DEFAULT_COLLECTION)
    documents: list[str] = []
    metadatas: list[dict[str, Any]] = []
    ids: list[str] = []

    for repo_entry in manifest.get("repos", []):
        if not isinstance(repo_entry, dict):
            continue
        repo_name = str(repo_entry.get("name") or "unknown")
        repo_root = Path(str(repo_entry["root"])).resolve()
        repo_kind = str(repo_entry.get("kind") or "mixed")

        for path, rel_path in iter_repo_files(repo_entry):
            content = read_text_file(path)
            if content is None:
                continue
            documents.append(content)
            metadatas.append(
                {
                    "repo": repo_name,
                    "repo_kind": repo_kind,
                    "source": rel_path,
                    "abs_path": str(path),
                    "root": str(repo_root),
                    "type": path.suffix.lstrip(".") or "text",
                }
            )
            ids.append(make_doc_id(repo_name, rel_path))

    return collection_name, documents, metadatas, ids


def main() -> int:
    parser = argparse.ArgumentParser(description="Index the Ohmic multi-repo corpus into Chroma")
    parser.add_argument("--manifest", type=Path, default=DEFAULT_MANIFEST, help="Path to corpus manifest")
    parser.add_argument("--host", default="localhost", help="Chroma host")
    parser.add_argument("--port", type=int, default=8000, help="Chroma port")
    parser.add_argument("--dry-run", action="store_true", help="Print the corpus plan without writing to Chroma")
    args = parser.parse_args()

    manifest = load_manifest(args.manifest)
    collection_name, documents, metadatas, ids = collect_documents(manifest)

    if args.dry_run:
        print(json.dumps({"collection": collection_name, "documents": len(documents), "repos": manifest.get("repos", [])}, indent=2))
        return 0

    import chromadb

    print(f"Connecting to ChromaDB at {args.host}:{args.port}...")
    client = chromadb.HttpClient(host=args.host, port=args.port)
    collection = client.get_or_create_collection(name=collection_name)

    print(f"Upserting {len(documents)} documents into '{collection_name}'...")
    if documents:
        collection.upsert(documents=documents, metadatas=metadatas, ids=ids)
    print("Indexing complete.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
