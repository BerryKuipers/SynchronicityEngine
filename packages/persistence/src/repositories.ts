import { getDb } from './db'
import { events, engineSnapshots, layerStateSnapshots, sessions, runs } from './schema'
import { eq } from 'drizzle-orm'

export async function appendEvent(e: { id: string; sessionId: string; tick: number; type: string; payload: unknown; createdAt: number }) {
const db = await getDb()
await db.insert(events).values({
id: e.id,
sessionId: e.sessionId,
tick: e.tick,
type: e.type,
payload: JSON.stringify(e.payload),
createdAt: e.createdAt
})
}

export async function saveEngineSnapshot(s: { id: string; sessionId: string; tick: number; snapshot: unknown; createdAt: number }) {
const db = await getDb()
await db.insert(engineSnapshots).values({
id: s.id,
sessionId: s.sessionId,
tick: s.tick,
snapshot: JSON.stringify(s.snapshot),
createdAt: s.createdAt
})
}

export async function createSession(id: string, label?: string) {
const db = await getDb()
await db.insert(sessions).values({ id, createdAt: Date.now(), label: label ?? null as any })
}

export async function startRun(runId: string, sessionId: string) {
const db = await getDb()
await db.insert(runs).values({ id: runId, sessionId, createdAt: Date.now() })
}

export async function latestSnapshot(sessionId: string) {
const db = await getDb()
const rows = await db.select().from(engineSnapshots).where(eq(engineSnapshots.sessionId, sessionId))
return rows.at(-1) ?? null
}