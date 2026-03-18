import { readFile } from 'fs/promises'
import path from 'path'
import { getAdministratorWorkspaceRoot } from './workspaceRoot.js'

export interface QueueDocumentContext {
  file_path: string
  title: string
  excerpt: string
  source_heading: string | null
}

function normalizePath(value: string): string {
  return path.resolve(value).replace(/\//g, '\\').toLowerCase()
}

function buildExcerpt(raw: string): string {
  const lines = raw
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter((line) => line.trim().length > 0)

  const excerpt = lines.slice(0, 18).join('\n').trim()
  return excerpt.length > 1800 ? `${excerpt.slice(0, 1799)}…` : excerpt
}

export async function readQueueDocumentContext(filePath: string): Promise<QueueDocumentContext> {
  if (!filePath?.trim()) {
    throw new Error('Missing file path')
  }

  const workspaceRoot = getAdministratorWorkspaceRoot()
  const resolvedPath = path.resolve(filePath)
  const normalizedRoot = normalizePath(workspaceRoot)
  const normalizedPath = normalizePath(resolvedPath)

  if (
    normalizedPath !== normalizedRoot &&
    !normalizedPath.startsWith(`${normalizedRoot}\\`)
  ) {
    throw new Error('Queue context path is outside the workspace root')
  }

  const raw = await readFile(resolvedPath, 'utf-8')
  const heading =
    raw
      .split(/\r?\n/)
      .map((line) => line.trim())
      .find((line) => line.startsWith('# ')) ?? null

  return {
    file_path: resolvedPath,
    title: heading ? heading.replace(/^#\s+/, '').trim() : path.basename(resolvedPath),
    excerpt: buildExcerpt(raw),
    source_heading: heading,
  }
}
