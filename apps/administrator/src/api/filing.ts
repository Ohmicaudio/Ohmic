import type { FilingPickerReadModel } from '@/types/intake'

const API_BASE = '/api'

export async function fetchFilingOptions(intakeId: string): Promise<FilingPickerReadModel> {
  const url = new URL(`${API_BASE}/filing/options`, window.location.origin)
  url.searchParams.set('intakeId', intakeId)

  const res = await fetch(url.pathname + url.search)
  if (!res.ok) {
    throw new Error(`Filing options fetch failed: ${res.status}`)
  }

  return res.json()
}
