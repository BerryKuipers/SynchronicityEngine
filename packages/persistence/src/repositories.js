import { db } from './db';
import { events, engineSnapshots, sessions, runs } from './schema';
import { eq, desc } from 'drizzle-orm';
export async function appendEvent(e) {
    await db.insert(events).values({
        id: e.id,
        sessionId: e.sessionId,
        tick: e.tick,
        type: e.type,
        payload: e.payload,
        createdAt: e.createdAt
    });
}
export async function saveEngineSnapshot(s) {
    await db.insert(engineSnapshots).values({
        id: s.id,
        sessionId: s.sessionId,
        tick: s.tick,
        snapshot: s.snapshot,
        createdAt: s.createdAt
    });
}
export async function createSession(id, label) {
    await db.insert(sessions).values({ id, createdAt: new Date(), label: label ?? null });
}
export async function startRun(runId, sessionId) {
    await db.insert(runs).values({ id: runId, sessionId, createdAt: new Date() });
}
export async function latestSnapshot(sessionId) {
    const rows = await db.select().from(engineSnapshots).where(eq(engineSnapshots.sessionId, sessionId)).orderBy(desc(engineSnapshots.createdAt));
    return rows.at(0) ?? null;
}
