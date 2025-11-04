export async function aiFill(payload: unknown) {
  const res = await fetch('/api/v1/ai/fill', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!res.ok) throw new Error(`ai/fill ${res.status}`)
  return res.json()
}
