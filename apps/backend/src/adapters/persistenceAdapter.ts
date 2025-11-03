import { appendEvent, saveEngineSnapshot, latestSnapshot } from '@synchronicity/persistence'
import { EngineEvent } from '@engine/interfaces/Ports'
import { EngineSnapshotV1 } from '@shared/types'

export async function persistEvent(sessionId: string, tick: number, e: EngineEvent) {
await appendEvent({
id: crypto.randomUUID(),
sessionId,
tick,
type: e.type,
payload: e.payload,
createdAt: Date.now()
})
}

export async function persistSnapshot(sessionId: string, tick: number, snapshot: EngineSnapshotV1) {
await saveEngineSnapshot({
id: crypto.randomUUID(),
sessionId,
tick,
snapshot,
createdAt: Date.now()
})
}

export async function getLatestSnapshot(sessionId: string) {
return latestSnapshot(sessionId)
}