import os
import json
import chromadb
from chromadb.config import Settings
import glob

# Ensure script is run from the right location or resolve path correctly
repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))

def load_tags():
    tags_path = os.path.join(repo_root, 'tags.json')
    if os.path.exists(tags_path):
        with open(tags_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def get_files_to_index():
    # We will index all markdown files in knowledge/ and docs/
    docs_pattern = os.path.join(repo_root, 'docs', '**', '*.md')
    knowledge_pattern = os.path.join(repo_root, 'knowledge', '**', '*.md')
    
    files = glob.glob(docs_pattern, recursive=True) + glob.glob(knowledge_pattern, recursive=True)
    return files

def index_files():
    print("Connecting to ChromaDB at localhost:8000...")
    # Requires chromadb server running
    try:
        client = chromadb.HttpClient(host='localhost', port=8000)
    except Exception as e:
        print(f"Failed to connect to Chroma DB: {e}")
        return

    collection_name = "ohmic_universe_docs"
    
    # Get or create collection
    collection = client.get_or_create_collection(name=collection_name)
    
    files = get_files_to_index()
    print(f"Found {len(files)} files to index.")
    
    documents = []
    metadatas = []
    ids = []
    
    for idx, file_path in enumerate(files):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Simple chunking by file for now (can be improved)
            rel_path = os.path.relpath(file_path, repo_root)
            
            documents.append(content)
            metadatas.append({
                "source": rel_path,
                "type": "markdown",
                # Ideally, we would evaluate tags against the file here
                "tags": "knowledge" if "knowledge" in rel_path else "documentation" 
            })
            ids.append(f"doc_{idx}")
        except Exception as e:
            print(f"Failed to read {file_path}: {e}")
            
    if documents:
        print(f"Upserting {len(documents)} documents into '{collection_name}' collection...")
        collection.upsert(
            documents=documents,
            metadatas=metadatas,
            ids=ids
        )
        print("Indexing complete.")
    else:
        print("No documents found to index.")

if __name__ == "__main__":
    index_files()
