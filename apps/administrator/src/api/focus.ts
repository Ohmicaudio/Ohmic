const API_BASE = '/api'

export async function publishIntakeFocus(intakeId: string | null): Promise<void> {
  const res = await fetch(`${API_BASE}/focus/intake`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      intake_id: intakeId,
    }),
  })

  if (!res.ok) {
    throw new Error(`Intake focus publish failed: ${res.status}`)
  }
}
