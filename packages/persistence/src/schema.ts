import { pgTable, varchar, numeric, timestamp, jsonb, integer } from 'drizzle-orm/pg-core'

export const sessions = pgTable('sessions', {
id: varchar('id', { length: 36 }).primaryKey(),
createdAt: timestamp('created_at'),
label: varchar('label', { length: 255 }),
})

export const runs = pgTable('runs', {
id: varchar('id', { length: 36 }).primaryKey(),
sessionId: varchar('session_id', { length: 36 }),
createdAt: timestamp('created_at'),
})

export const layers = pgTable('layers', {
id: varchar('id', { length: 36 }).primaryKey(),
runId: varchar('run_id', { length: 36 }),
levelId: varchar('level_id', { length: 32 }),
name: varchar('name', { length: 64 }),
})

export const layerStateSnapshots = pgTable('layer_state_snapshots', {
id: varchar('id', { length: 36 }).primaryKey(),
layerId: varchar('layer_id', { length: 36 }),
tick: integer('tick'),
vibrationCurrent: numeric('vibration_current'),
vibrationMin: numeric('vibration_min'),
vibrationMax: numeric('vibration_max'),
alignment: numeric('alignment'),
sublevels: jsonb('sublevels'),
createdAt: timestamp('created_at'),
})

export const beliefs = pgTable('beliefs', {
id: varchar('id', { length: 36 }).primaryKey(),
sessionId: varchar('session_id', { length: 36 }),
key: varchar('key', { length: 128 }),
strength: numeric('strength'),
rigidity: numeric('rigidity'),
charge: numeric('charge'),
origin: varchar('origin', { length: 64 }),
})

export const beliefHistory = pgTable('belief_history', {
id: varchar('id', { length: 36 }).primaryKey(),
beliefId: varchar('belief_id', { length: 36 }),
tick: integer('tick'),
deltaStrength: numeric('delta_strength'),
deltaRigidity: numeric('delta_rigidity'),
deltaCharge: numeric('delta_charge'),
reason: varchar('reason', { length: 256 }),
})

export const timelineNodes = pgTable('timeline_nodes', {
id: varchar('id', { length: 36 }).primaryKey(),
sessionId: varchar('session_id', { length: 36 }),
tick: integer('tick'),
energy: numeric('energy'),
coherence: numeric('coherence'),
divergence: numeric('divergence'),
entropy: numeric('entropy'),
meta: jsonb('meta'),
})

export const timelineEdges = pgTable('timeline_edges', {
id: varchar('id', { length: 36 }).primaryKey(),
fromNodeId: varchar('from_node_id', { length: 36 }),
toNodeId: varchar('to_node_id', { length: 36 }),
weight: numeric('weight'),
cause: varchar('cause', { length: 128 }),
meta: jsonb('meta'),
})

export const events = pgTable('events', {
id: varchar('id', { length: 36 }).primaryKey(),
sessionId: varchar('session_id', { length: 36 }),
tick: integer('tick'),
type: varchar('type', { length: 64 }),
payload: jsonb('payload'),
createdAt: timestamp('created_at'),
})

export const engineSnapshots = pgTable('engine_snapshots', {
id: varchar('id', { length: 36 }).primaryKey(),
sessionId: varchar('session_id', { length: 36 }),
tick: integer('tick'),
snapshot: jsonb('snapshot'),
createdAt: timestamp('created_at'),
})
