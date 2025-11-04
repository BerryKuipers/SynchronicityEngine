import { useEffect, useState } from 'react'
import type { EngineSnapshot } from '../domain/viewModels.js'
import { toEngineVM } from '../domain/adapters.js'
import { fetchSnapshot } from '../api/client.js'

export function MainPage() {
  const [raw, setRaw] = useState<EngineSnapshot | null>(null)
  const vm = raw ? toEngineVM(raw) : null

  useEffect(() => {
    ;(async () => {
      const s: EngineSnapshot = await fetchSnapshot('local-demo-session')
      setRaw(s)
    })()
  }, [])

  return (
    <div>
      {vm && (
        <>
          <h2>Session {vm.sessionId}</h2>
          <section>
            <h3>Timeline</h3>
            <ul>
              {vm.timeline.map(it => (
                <li key={it.id}>{it.t} · {it.label}</li>
              ))}
            </ul>
          </section>
          <section>
            <h3>Resonance</h3>
            <div>{vm.resonance.score}</div>
            <pre>{JSON.stringify(vm.resonance.vector)}</pre>
          </section>
        </>
      )}
    </div>
  )
}
