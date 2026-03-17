import type {
  FilingPickerReadModel,
  RecordFilingRequest,
  RecordFilingResponse,
} from '@/types/intake'

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

export async function recordFiling(
  request: RecordFilingRequest
): Promise<RecordFilingResponse> {
  const res = await fetch(`${API_BASE}/filing/record`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

  if (!res.ok) {
    throw new Error(`Filing record failed: ${res.status}`)
  }

  return res.json()
}
