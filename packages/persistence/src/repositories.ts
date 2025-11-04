import { db } from './db.js'
import { events, engineSnapshots, sessions, runs, physicalBodies } from './schema.js'
import { eq, desc, sql } from 'drizzle-orm'
import { PgUpdateSetSource } from 'drizzle-orm/pg-core';
import { PhysicalBodyDTO } from '@synchronicity/shared';

// Define the type for the new physical body record, omitting the auto-generated fields
type NewPhysicalBody = Omit<PhysicalBodyDTO, 'id' | 'createdAt' | 'updatedAt' | 'ageYearsCached'>;


const toDTO = (row: typeof physicalBodies.$inferSelect): PhysicalBodyDTO => ({
  ...row,
  birthDate: row.birthDate?.toISOString() ?? '',
  incarnationId: row.incarnationId!,
  createdAt: row.createdAt?.toISOString() ?? '',
  updatedAt: row.updatedAt?.toISOString() ?? '',
  ageYearsCached: row.ageYearsCached ?? 0,
  health: row.health ?? '0',
  energy: row.energy ?? '0',
  fatigue: row.fatigue ?? '0',
  hunger: row.hunger ?? '0',
  mood: row.mood ?? '0',
  injuries: row.injuries ?? {},
  traits: row.traits ?? {},
  geneticSeed: row.geneticSeed ?? '',
});

export const PhysicalBodyRepo = {
  async create(body: NewPhysicalBody): Promise<PhysicalBodyDTO> {
    const result = await db.insert(physicalBodies).values({ ...body, id: crypto.randomUUID(), birthDate: new Date(body.birthDate) }).returning();
    return toDTO(result[0]);
  },

  async read(id: string): Promise<PhysicalBodyDTO | null> {
    const result = await db.select().from(physicalBodies).where(eq(physicalBodies.id, id));
    if (!result.length) return null;
    return toDTO(result[0]);
  },

  async findByIncarnationId(incarnationId: string): Promise<PhysicalBodyDTO | null> {
    const result = await db.select().from(physicalBodies).where(eq(physicalBodies.incarnationId, incarnationId));
    if (!result.length) return null;
    return toDTO(result[0]);
  },

  async update(id: string, partialBody: Partial<PhysicalBodyDTO>): Promise<PhysicalBodyDTO> {
    const { birthDate, createdAt, ...rest } = partialBody;
    const result = await db.update(physicalBodies).set({ ...rest, updatedAt: new Date(), birthDate: birthDate ? new Date(birthDate) : undefined }).where(eq(physicalBodies.id, id)).returning();
    return toDTO(result[0]);
  },

  async updateByIncarnationId(incarnationId: string, partialBody: Partial<PhysicalBodyDTO>): Promise<PhysicalBodyDTO | null> {
    const { birthDate, createdAt, ...rest } = partialBody;
    const result = await db.update(physicalBodies)
      .set({ ...rest, updatedAt: new Date(), birthDate: birthDate ? new Date(birthDate) : undefined })
      .where(eq(physicalBodies.incarnationId, incarnationId))
      .returning();
    if (!result.length) return null;
    return toDTO(result[0]);
  },

  async delete(id: string): Promise<void> {
    await db.delete(physicalBodies).where(eq(physicalBodies.id, id));
  },

  async updateVitals(incarnationId: string, delta: { health?: number; energy?: number; fatigue?: number; hunger?: number; mood?: number }): Promise<PhysicalBodyDTO> {
    const fieldsToUpdate: PgUpdateSetSource<typeof physicalBodies> = { updatedAt: new Date() };
    if (delta.health !== undefined) fieldsToUpdate.health = sql`health + ${delta.health.toString()}`;
    if (delta.energy !== undefined) fieldsToUpdate.energy = sql`energy + ${delta.energy.toString()}`;
    if (delta.fatigue !== undefined) fieldsToUpdate.fatigue = sql`fatigue + ${delta.fatigue.toString()}`;
    if (delta.hunger !== undefined) fieldsToUpdate.hunger = sql`hunger + ${delta.hunger.toString()}`;
    if (delta.mood !== undefined) fieldsToUpdate.mood = sql`mood + ${delta.mood.toString()}`;

    const result = await db.update(physicalBodies).set(fieldsToUpdate).where(eq(physicalBodies.incarnationId, incarnationId)).returning();
    return toDTO(result[0]);
  }
};

export async function appendEvent(e: { id: string; sessionId: string; tick: number; type: string; payload: unknown; createdAt: Date }) {
await db.insert(events).values({
id: e.id,
sessionId: e.sessionId,
tick: e.tick,
type: e.type,
payload: e.payload,
createdAt: e.createdAt
})
}

export async function saveEngineSnapshot(s: { id: string; sessionId: string; tick: number; snapshot: unknown; createdAt: Date }) {
await db.insert(engineSnapshots).values({
id: s.id,
sessionId: s.sessionId,
tick: s.tick,
snapshot: s.snapshot,
createdAt: s.createdAt
})
}

export async function createSession(id: string, label?: string) {
await db.insert(sessions).values({ id, createdAt: new Date(), label: label ?? null })
}

export async function startRun(runId: string, sessionId: string) {
await db.insert(runs).values({ id: runId, sessionId, createdAt: new Date() })
}

export async function latestSnapshot(sessionId: string) {
const rows = await db.select().from(engineSnapshots).where(eq(engineSnapshots.sessionId, sessionId)).orderBy(desc(engineSnapshots.createdAt))
return rows.at(0) ?? null
}