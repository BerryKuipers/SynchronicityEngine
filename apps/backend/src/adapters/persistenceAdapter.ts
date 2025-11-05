import { appendEvent, saveEngineSnapshot, latestSnapshot } from '@synchronicity/persistence'
import { EngineEvent } from '@synchronicity/engine'
import { EngineSnapshotV1 } from '@synchronicity/shared'

export async function persistEvent(sessionId: string, tick: number, e: EngineEvent) {
await appendEvent({
id: crypto.randomUUID(),
sessionId,
tick,
type: e.type,
payload: e.payload,
createdAt: new Date()
})
}

export async function persistSnapshot(sessionId: string, tick: number, snapshot: EngineSnapshotV1) {
await saveEngineSnapshot({
id: crypto.randomUUID(),
sessionId,
tick,
snapshot,
createdAt: new Date()
})
}

export async function getLatestSnapshot(sessionId: string) {
return latestSnapshot(sessionId)
}